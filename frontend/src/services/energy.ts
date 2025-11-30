import type { EnergyDataStored } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

export const energyService = {
  /**
   * Obtiene todos los datos de energía almacenados en el backend
   */
  async getEnergyData(): Promise<EnergyDataStored[]> {
    const response = await fetch(`${API_BASE_URL}/read`)
    if (!response.ok) {
      throw new Error(`Error al cargar datos de energía: ${response.statusText}`)
    }
    return response.json()
  },

  /**
   * Almacena nuevos datos de energía en la blockchain
   */
  async storeEnergyData(data: {
    device_id: string
    energy: number
    timestamp: number
  }): Promise<{ txid: string; tx_link: string }> {
    const response = await fetch(`${API_BASE_URL}/store-json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Error al almacenar datos: ${response.statusText}`)
    }

    return response.json()
  },

  /**
   * Obtiene datos de energía filtrados por device_id
   */
  async getEnergyDataByDevice(deviceId: string): Promise<EnergyDataStored[]> {
    const allData = await this.getEnergyData()
    return allData.filter(record => record.device_id === deviceId)
  },
}
