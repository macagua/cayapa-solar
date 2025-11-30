import type { NextApiRequest, NextApiResponse } from 'next'
import { wallet } from '../../src/wallet'
import { Utils, Script, PushDrop, WalletProtocol} from '@bsv/sdk'
import { join } from 'path'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { EnergyData, EnergyDataStored, SensorBadget } from '@/src/types'

const brc29ProtocolID: WalletProtocol = [2, '3241645161d8']
const DATA_FILE = join(process.cwd(), 'solar-data.json')
const SENSOR_BADGET_FILE = join(process.cwd(), 'sensor-badget-data.json') // TODO: Make the badget file, multisensor

let global_state : EnergyDataStored[] = []

export function saveEnergyData(state: EnergyDataStored): void {
  global_state.push(state)
  try {
    writeFileSync(DATA_FILE, JSON.stringify(global_state, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error saving energy data:', error)
  }
}

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


// Function to filter by device ID and calculate total energy
function calculateTotalEnergyByDevice(
  data: EnergyDataStored[],
  deviceId: string
): number {
  return data
    .filter((record) => record.device_id === deviceId)
    .reduce((total, record) => total + record.energy, 0);
}

// Function to get detailed summary for a device
function getDeviceEnergySummary(
  data: EnergyDataStored[],
  deviceId: string
): {
  device_id: string;
  total_energy: number;
  record_count: number;
  average_energy: number;
} {
  const filteredData = data.filter((record) => record.device_id === deviceId);
  const totalEnergy = filteredData.reduce((sum, record) => sum + record.energy, 0);
  const recordCount = filteredData.length;
  const averageEnergy = recordCount > 0 ? totalEnergy / recordCount : 0;

  return {
    device_id: deviceId,
    total_energy: parseFloat(totalEnergy.toFixed(3)),
    record_count: recordCount,
    average_energy: parseFloat(averageEnergy.toFixed(3))
  };
}

export function saveBadget(badget): void {
  try {
    writeFileSync(SENSOR_BADGET_FILE, JSON.stringify(badget, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error saving energy data:', error)
  }
}


export function loadSensorBadget(): SensorBadget {
  if (existsSync(SENSOR_BADGET_FILE)) {
    try {
      const data = readFileSync(SENSOR_BADGET_FILE, 'utf-8')
      const stored: SensorBadget = JSON.parse(data)
      return stored

    } catch (error) {
      console.error('Error loading crowdfunding data:', error)
    }
  }
  return {}

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

    console.log('Energy data stored on blockchain:', {
      txid: result.txid,
      device_id: normalizedData.device_id,
      energy: normalizedData.energy,
      timestamp: normalizedData.timestamp,
      dataSize: jsonBytes.length,
      explorerUrl: `https://whatsonchain.com/tx/${result.txid}`
    })

    let links : String[] = [`https://whatsonchain.com/tx/${result.txid}`]
    saveEnergyData({...normalizedData, tx_link: `https://whatsonchain.com/tx/${result.txid}`})

    let energy = calculateTotalEnergyByDevice(global_state, normalizedData.device_id)

    let tokens = Math.floor(energy / 100)

    const sensor_badget: SensorBadget = loadSensorBadget()

    console.info(`total energy ${energy}, tokens ${tokens}, badget ${sensor_badget.madrilitos}, corresponde? ${!sensor_badget.madrilitos || sensor_badget.madrilitos < tokens}`)

    if (!sensor_badget.madrilitos || sensor_badget.madrilitos < tokens) {
      try {
        const tokenDescription = `Madrilito token to sendor  ${normalizedData.device_id} `
        const pushdrop = new PushDrop(wallet)

        const { ciphertext } = await wallet.encrypt({
          plaintext: Utils.toArray(tokenDescription, 'utf8'),
          protocolID: [0, 'token list'],
          keyID: '1',
          counterparty: 'anyone'
        })
        const { publicKey: identityKey } = await wallet.getPublicKey({ identityKey: true })

        let derivationPrefix : String = "cayapa"
        let derivationSuffix = Utils.toBase64(Utils.toArray('investment' + Date.now(), 'utf8'))

        const { publicKey: paymentKey } = await wallet.getPublicKey({
          protocolID: brc29ProtocolID,
          keyID: derivationPrefix + ' ' + derivationSuffix,
          counterparty: 'anyone',
          forSelf: false,
        })

        const lockingScript = await pushdrop.lock(
          [ciphertext],
          [0, 'token list'],
          '1',                      // todo deriva de 1
          identityKey
        )

        const result = await wallet.createAction({
          description: `Create token: ${tokenDescription}`,
          outputs: [
            {
              lockingScript: lockingScript.toHex(),
              satoshis: 1,
              basket: 'crowdfunding',
              outputDescription: 'Crowdfunding token'
            }
          ],
          options: {
            randomizeOutputs: false
          }
        })

        console.info(`Congrats!! Madrilito has been granted to sensor ${normalizedData.device_id}`)

        links.push(`https://whatsonchain.com/tx/${result.txid}`)

      } catch (error: any) {
        console.error('Complete error:', error)
        res.status(500).json({ error: error.message || 'Failed to complete' })
      }

      saveBadget({ "device_id": normalizedData.device_id, "madrilitos": tokens})
    }

    // Devolver el TXID de la transacción
    res.status(200).json({
      success: true,
      txid: result.txid,
      message: 'Energy data successfully stored on BSV blockchain',
      data: normalizedData,
      dataSize: jsonBytes.length,
      explorerUrl: links
    })

  } catch (error: any) {
    console.error('Store JSON error:', error)
    res.status(500).json({
      error: error.message || 'Failed to store JSON on blockchain',
      details: error.toString()
    })
  }
}
