import type { NextApiRequest, NextApiResponse } from 'next'
import { wallet } from '../../src/wallet'
import { setCrowdfundingState } from '../../lib/crowdfunding'
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'

const DATA_FILE = join(process.cwd(), 'solar-data.json')

interface EnergyData {
  device_id: string
  energy: number // kWh
  timestamp: number | string
}

export function loadCrowdfundingData(): EnergyData[] {
  if (existsSync(DATA_FILE)) {
    try {
      const data = readFileSync(DATA_FILE, 'utf-8')
      const stored: EnergyData[] = JSON.parse(data)
      return stored

    } catch (error) {
      console.error('Error loading crowdfunding data:', error)
    }
  }
  return []

}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  res.status(200).json(loadCrowdfundingData() )
}
