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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  res.status(200).json(loadEnergyData() )
}
