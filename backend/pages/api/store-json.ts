import type { NextApiRequest, NextApiResponse } from 'next'
import { wallet } from '../../src/wallet'
import { Utils, Script} from '@bsv/sdk'
import { join } from 'path'
import { writeFileSync } from 'fs'
import { EnergyData, EnergyDataStored } from '@/src/types'

const DATA_FILE = join(process.cwd(), 'solar-data.json')
const real_work = false // Si es false, evita llamadas a blockchain y genera txid fake para pruebas

let global_state : EnergyData[] = []

export function saveEnergyData(state: EnergyDataStored): void {
  global_state.push(state)
  try {
    writeFileSync(DATA_FILE, JSON.stringify(global_state, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error saving energy data:', error)
  }
}

/**
 * @swagger
 * /api/store-json:
 *   post:
 *     summary: Store energy data on BSV blockchain
 *     tags: [Energy Data]
 *     description: Almacena datos de energía solar en la blockchain BSV usando transacciones OP_RETURN
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               device_id:
 *                 type: string
 *                 description: ID del dispositivo ESP32
 *                 example: "cayapa-001"
 *               energy:
 *                 type: number
 *                 description: Energía generada en kWh
 *                 example: 5.23
 *               timestamp:
 *                 type: integer
 *                 description: Timestamp Unix en segundos
 *                 example: 1234567
 *     responses:
 *       200:
 *         description: Datos almacenados exitosamente en blockchain
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 txid:
 *                   type: string
 *                   description: ID de transacción en blockchain
 *                 tx_link:
 *                   type: string
 *                   description: Link a WhatsOnChain para ver la transacción
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */

/**
 * Crea un script OP_RETURN con los datos proporcionados
 * OP_RETURN permite almacenar datos en la blockchain de forma inmutable
 */
function createOpReturnScript(data: number[]): string {
  // OP_RETURN = 0x6a
  const opReturn = [0x6a]

  // Determinar el opcode de push según el tamaño de los datos
  let pushOpcode: number
  let lengthBytes: number[] = []

  if (data.length < 76) {
    // OP_PUSHDATA1 no es necesario, usar el opcode directo (el tamaño mismo es el opcode)
    pushOpcode = data.length
  } else if (data.length < 256) {
    // OP_PUSHDATA1 (0x4c) seguido de 1 byte para el tamaño
    pushOpcode = 0x4c
    lengthBytes = [data.length]
  } else if (data.length < 65536) {
    // OP_PUSHDATA2 (0x4d) seguido de 2 bytes (little-endian) para el tamaño
    pushOpcode = 0x4d
    lengthBytes = [
      data.length & 0xff,
      (data.length >> 8) & 0xff
    ]
  } else {
    // OP_PUSHDATA4 (0x4e) seguido de 4 bytes (little-endian) para el tamaño
    pushOpcode = 0x4e
    lengthBytes = [
      data.length & 0xff,
      (data.length >> 8) & 0xff,
      (data.length >> 16) & 0xff,
      (data.length >> 24) & 0xff
    ]
  }

  // Construir el script completo: OP_RETURN + push opcode + length (si aplica) + data
  const scriptBytes = [...opReturn, pushOpcode, ...lengthBytes, ...data]

  // Convertir a hex string
  return Utils.toHex(scriptBytes)
}


/**
 * @swagger
 * /api/store-json:
 *   post:
 *     summary: Store energy data on BSV blockchain
 *     tags: [Energy Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [device_id, energy, timestamp]
 *             properties:
 *               device_id:
 *                 type: string
 *                 example: "sensor-001"
 *               energy:
 *                 type: number
 *                 example: 25.453
 *               timestamp:
 *                 type: integer
 *                 example: 1764460076
 *     responses:
 *       200:
 *         description: Successfully stored on blockchain
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 txid:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                 dataSize:
 *                   type: integer
 *                 explorerUrl:
 *                   type: string
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Obtener el JSON del body
    const jsonData = req.body as EnergyData

    // Validar que sea un objeto
    if (!jsonData || typeof jsonData !== 'object') {
      return res.status(400).json({
        error: 'Invalid JSON data. Expected a JSON object with device_id, energy, and timestamp fields.'
      })
    }

    // Validar campos requeridos
    if (!jsonData.device_id || typeof jsonData.device_id !== 'string' || jsonData.device_id.trim() === '') {
      return res.status(400).json({
        error: 'Missing or invalid device_id. Must be a non-empty string.'
      })
    }

    if (typeof jsonData.energy !== 'number' || isNaN(jsonData.energy)) {
      return res.status(400).json({
        error: 'Missing or invalid energy. Must be a number (kWh).'
      })
    }

    if (jsonData.timestamp === undefined || jsonData.timestamp === null) {
      return res.status(400).json({
        error: 'Missing timestamp. Must be a number (Unix timestamp) or ISO string.'
      })
    }

    // Normalizar timestamp: si es string, intentar convertirlo
    let normalizedTimestamp: number
    if (typeof jsonData.timestamp === 'string') {
      const date = new Date(jsonData.timestamp)
      if (isNaN(date.getTime())) {
        return res.status(400).json({
          error: 'Invalid timestamp format. Must be a valid Unix timestamp (number) or ISO date string.'
        })
      }
      normalizedTimestamp = Math.floor(date.getTime() / 1000) // Convertir a Unix timestamp
    } else {
      normalizedTimestamp = Math.floor(jsonData.timestamp)
    }

    // Crear objeto normalizado con los datos validados
    const normalizedData: EnergyData = {
      device_id: jsonData.device_id.trim(),
      energy: Number(jsonData.energy.toFixed(3)), // Redondear a 3 decimales para kWh
      timestamp: normalizedTimestamp,
    }

    // Convertir el JSON a string y luego a bytes
    const jsonString = JSON.stringify(normalizedData)
    const jsonBytes = Utils.toArray(jsonString, 'utf8')

    let txid: string

    if (real_work) {
      // Crear un script OP_RETURN con los datos
      const opReturnScriptHex = createOpReturnScript(jsonBytes)

      // Crear la transacción usando wallet.createAction
      const result = await wallet.createAction({
        description: `Store energy data on BSV blockchain - Device: ${normalizedData.device_id}`,
        outputs: [
          {
            lockingScript: opReturnScriptHex,
            satoshis: 1, // OP_RETURN outputs no requieren satoshis
            outputDescription: `Energy data: ${normalizedData.device_id} - ${normalizedData.energy} kWh`
          }
        ],
        options: {
          randomizeOutputs: false,
          acceptDelayedBroadcast: false,
        }
      })

      if (!result.txid) {
        throw new Error('Transaction creation failed: No TXID returned')
      }

      txid = result.txid
    } else {
      // Modo de prueba: generar txid fake sin llamar a blockchain
      const random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      txid = `fake_${random}`
      console.log('Modo de prueba activado: txid fake generado sin llamar a blockchain')
    }

    console.log('Energy data stored on blockchain:', {
      txid: txid,
      device_id: normalizedData.device_id,
      energy: normalizedData.energy,
      timestamp: normalizedData.timestamp,
      dataSize: jsonBytes.length,
      explorerUrl: `https://whatsonchain.com/tx/${txid}`,
      real_work: real_work
    })

    saveEnergyData({...normalizedData, tx_link: `https://whatsonchain.com/tx/${txid}`})

    // Devolver el TXID de la transacción
    res.status(200).json({
      success: true,
      txid: txid,
      message: real_work 
        ? 'Energy data successfully stored on BSV blockchain'
        : 'Energy data processed in test mode (no blockchain call)',
      data: normalizedData,
      dataSize: jsonBytes.length,
      explorerUrl: `https://whatsonchain.com/tx/${txid}`
    })
  } catch (error: any) {
    console.error('Store JSON error:', error)
    res.status(500).json({
      error: error.message || 'Failed to store JSON on blockchain',
      details: error.toString()
    })
  }
}
