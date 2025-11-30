import type { NextApiRequest, NextApiResponse } from 'next'
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'

const DATA_FILE = join(process.cwd(), 'solar-data.json')

import type { EnergyDataStored } from '../../src/types'

export function loadEnergyData(): EnergyDataStored[] {
  if (existsSync(DATA_FILE)) {
    try {
      const data = readFileSync(DATA_FILE, 'utf-8')
      const stored: EnergyDataStored[] = JSON.parse(data)
      return stored

    } catch (error) {
      console.error('Error loading crowdfunding data:', error)
    }
  }
  return []

}

/**
 * @swagger
 * /api/read:
 *   get:
 *     summary: Get all energy data records
 *     tags: [Energy Data]
 *     responses:
 *       200:
 *         description: Array of energy measurements with blockchain links
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   device_id:
 *                     type: string
 *                   energy:
 *                     type: number
 *                   timestamp:
 *                     type: integer
 *                   tx_link:
 *                     type: string
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  res.status(200).json(loadEnergyData() )
}
