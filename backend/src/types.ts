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

export interface Investor {
  identityKey: string
  amount: number
  timestamp: number
  redeemed?: boolean
}

export interface CrowdfundingState {
  goal: number
  raised: number
  investors: Investor[]
  isComplete: boolean
  completionTxid?: string
}
