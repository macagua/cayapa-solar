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
      console.error('Error loading cayapa data:', error)
    }
  }
  return []

}

/**
 * @swagger
 * /api/sensor-status:
 *   get:
 *     summary: Retrieve user device information and benefits
 *     description: Returns device details including device ID, community tokens balance, and active grants/benefits for the authenticated user
 *     tags:
 *       - Devices
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: device_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Optional device ID to filter specific device information
 *     responses:
 *       200:
 *         description: Successfully retrieved device information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 device_id:
 *                   type: string
 *                   description: Unique identifier for the user's device/sensor
 *                   example: "sensor-001"
 *                 community_tokens:
 *                   type: number
 *                   description: Number of community tokens accumulated by the user
 *                   example: 33
 *                 grants:
 *                   type: string
 *                   description: Description of active grants or benefits awarded to the user
 *                   example: "granted 3 hours of free green zone parking"
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       404:
 *         description: Device not found
 *       500:
 *         description: Internal server error
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  res.status(200).json({"device_id": "sensor-001", "community_tokens": 33, "grants": "granted 3 hours of free green zone parking"})
}
