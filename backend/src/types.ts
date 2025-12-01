export interface EnergyData {
  device_id: string
  energy: number // kWh
  timestamp: number | string
}

export interface EnergyDataStored {
  device_id: string
  energy: number // kWh
  timestamp: number | string
  tx_link: string
}
