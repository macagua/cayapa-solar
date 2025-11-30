import { useEffect } from 'react'
import { useAsync } from './useAsync'
import { energyService } from '@services/energy'
import type { EnergyDataStored } from '../types'

/**
 * Hook personalizado para cargar datos de energía del backend
 * Combina useAsync con energyService para una API más limpia
 */
export function useEnergyData() {
  const { data, loading, error, execute } = useAsync<EnergyDataStored[]>()

  useEffect(() => {
    execute(energyService.getEnergyData()).catch(err => {
      console.error('Error loading energy data:', err)
    })
  }, [execute])

  return {
    energyData: data || [],
    loading,
    error,
    refetch: () => execute(energyService.getEnergyData()),
  }
}

/**
 * Hook para cargar datos de energía de un dispositivo específico
 */
export function useDeviceEnergyData(deviceId: string) {
  const { data, loading, error, execute } = useAsync<EnergyDataStored[]>()

  useEffect(() => {
    if (deviceId) {
      execute(energyService.getEnergyDataByDevice(deviceId)).catch(err => {
        console.error(`Error loading energy data for device ${deviceId}:`, err)
      })
    }
  }, [deviceId, execute])

  return {
    energyData: data || [],
    loading,
    error,
    refetch: () => execute(energyService.getEnergyDataByDevice(deviceId)),
  }
}
