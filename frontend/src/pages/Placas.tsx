import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
// import { apiService } from '@services/api'

// Fix para los iconos de Leaflet en React
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

interface EnergyDataStored {
  device_id: string
  energy: number
  timestamp: number | string
  tx_link: string
}

interface SolarPanel {
  id: string
  name: string
  production: number
  status: 'active' | 'inactive' | 'maintenance'
  location: string
  coordinates: [number, number]
}

const solarPanels: SolarPanel[] = [
  {
    id: '12345',
    name: 'Placa Solar 1',
    production: 12.5,
    status: 'active',
    location: 'Madrid, España',
    coordinates: [40.4168, -3.7038],
  },
  {
    id: '12346',
    name: 'Placa Solar 2',
    production: 15.3,
    status: 'active',
    location: 'Madrid, España',
    coordinates: [40.4200, -3.7100],
  },
  {
    id: '12347',
    name: 'Placa Solar 3',
    production: 10.8,
    status: 'maintenance',
    location: 'Madrid, España',
    coordinates: [40.4100, -3.6900],
  },
]

export default function Placas() {
  const [selectedPanel, setSelectedPanel] = useState<SolarPanel>(solarPanels[0])
  const [energyData, setEnergyData] = useState<EnergyDataStored[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Cargar datos de energía desde el backend
  useEffect(() => {
    const fetchEnergyData = async () => {
      setLoading(true)
      setError(null)
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'
        console.log('Fetching energy data from:', `${apiBaseUrl}/read`)
        const response = await fetch(`${apiBaseUrl}/read`)
        if (!response.ok) {
          throw new Error('Error al cargar los datos')
        }
        const data: EnergyDataStored[] = await response.json()
        setEnergyData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
        console.error('Error fetching energy data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchEnergyData()
  }, [])

  // Filtrar datos por el panel seleccionado
  const selectedPanelData = energyData.filter(
    record => record.device_id === selectedPanel.id
  )

  const formatDate = (timestamp: number | string) => {
    const date = new Date(typeof timestamp === 'string' ? parseInt(timestamp) : timestamp)
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      active: 'badge-success',
      inactive: 'badge-danger',
      maintenance: 'badge-warning',
    }
    const labels = {
      active: 'Activa',
      inactive: 'Inactiva',
      maintenance: 'Mantenimiento',
    }
    return (
      <span className={`badge ${badges[status as keyof typeof badges]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  return (
    <>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Total Placas Solares</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/">Inicio</a>
                </li>
                <li className="breadcrumb-item active">Placas</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container-fluid">
          {/* Parte superior con detalles de la placa seleccionada */}
          <div className="row mb-3">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Detalles de la Placa Solar Seleccionada</h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                      <p>
                        <strong>Placa Solar ID:</strong> {selectedPanel.id}
                      </p>
                    </div>
                    <div className="col-md-3">
                      <p>
                        <strong>Producción de energía (kWh):</strong> {selectedPanel.production}
                      </p>
                    </div>
                    <div className="col-md-3">
                      <p>
                        <strong>Estado:</strong> {getStatusBadge(selectedPanel.status)}
                      </p>
                    </div>
                    <div className="col-md-3">
                      <p>
                        <strong>Ubicación:</strong> {selectedPanel.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de registros de la placa seleccionada */}
          <div className="row mb-3">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fas fa-table mr-2"></i>
                    Historial de Registros - {selectedPanel.name}
                  </h3>
                  <div className="card-tools">
                    <span className="badge badge-info">
                      {selectedPanelData.length} registros
                    </span>
                  </div>
                </div>
                <div className="card-body p-0">
                  {loading ? (
                    <div className="text-center p-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Cargando...</span>
                      </div>
                      <p className="mt-2">Cargando datos...</p>
                    </div>
                  ) : error ? (
                    <div className="alert alert-danger m-3">
                      <i className="fas fa-exclamation-triangle mr-2"></i>
                      {error}
                    </div>
                  ) : selectedPanelData.length === 0 ? (
                    <div className="text-center p-4 text-muted">
                      <i className="fas fa-info-circle fa-3x mb-3"></i>
                      <p>No hay registros disponibles para esta placa</p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-striped table-hover m-0">
                        <thead>
                          <tr>
                            <th>Device ID</th>
                            <th>Energía (kWh)</th>
                            <th>Fecha y Hora</th>
                            <th>TX Link</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedPanelData.map((record, index) => (
                            <tr key={`${record.device_id}-${record.timestamp}-${index}`}>
                              <td>
                                <code>{record.device_id}</code>
                              </td>
                              <td>
                                <strong>{record.energy}</strong> kWh
                              </td>
                              <td>
                                <i className="far fa-clock mr-1"></i>
                                {formatDate(record.timestamp)}
                              </td>
                              <td>
                                {record.tx_link ? (
                                  <a
                                    href={record.tx_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-sm btn-outline-primary"
                                  >
                                    <i className="fas fa-external-link-alt mr-1"></i>
                                    Ver TX
                                  </a>
                                ) : (
                                  <span className="text-muted">-</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                {selectedPanelData.length > 0 && (
                  <div className="card-footer">
                    <small className="text-muted">
                      <i className="fas fa-info-circle mr-1"></i>
                      Mostrando {selectedPanelData.length} registro(s) para {selectedPanel.name}
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Parte inferior, dividida en dos */}
          <div className="row">
            {/* Lista de Placas Solares (izquierda) */}
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Lista de Placas Solares</h3>
                  <div className="card-tools">
                    <span className="badge badge-primary">{solarPanels.length} placas</span>
                  </div>
                </div>
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush">
                    {solarPanels.map(panel => (
                      <li
                        key={panel.id}
                        className={`list-group-item d-flex justify-content-between align-items-center ${
                          selectedPanel.id === panel.id ? 'active' : ''
                        }`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedPanel(panel)}
                      >
                        <div>
                          <i className="fas fa-solar-panel mr-2"></i>
                          {panel.name}
                          <br />
                          <small className="text-muted">{panel.production} kWh</small>
                        </div>
                        {getStatusBadge(panel.status)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-footer">
                  <button className="btn btn-primary btn-sm">
                    <i className="fas fa-plus mr-1"></i> Agregar Placa
                  </button>
                </div>
              </div>
            </div>

            {/* Mapa de la Comunidad de Madrid (derecha) */}
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Mapa de Ubicación</h3>
                  <div className="card-tools">
                    <span className="badge badge-info">
                      <i className="fas fa-map-marker-alt mr-1"></i>
                      Madrid, España
                    </span>
                  </div>
                </div>
                <div className="card-body p-0">
                  <MapContainer
                    center={[40.4168, -3.7038]}
                    zoom={11}
                    style={{ height: '400px', width: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {solarPanels.map(panel => (
                      <Marker
                        key={panel.id}
                        position={panel.coordinates}
                        eventHandlers={{
                          click: () => setSelectedPanel(panel),
                        }}
                      >
                        <Popup>
                          <div>
                            <strong>{panel.name}</strong>
                            <br />
                            <small>ID: {panel.id}</small>
                            <br />
                            Producción: <strong>{panel.production} kWh</strong>
                            <br />
                            Estado: {getStatusBadge(panel.status)}
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </div>

              {/* Estadísticas adicionales */}
              <div className="card mt-3">
                <div className="card-header">
                  <h3 className="card-title">Estadísticas</h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-6">
                      <div className="info-box bg-success">
                        <span className="info-box-icon">
                          <i className="fas fa-check"></i>
                        </span>
                        <div className="info-box-content">
                          <span className="info-box-text">Activas</span>
                          <span className="info-box-number">
                            {solarPanels.filter(p => p.status === 'active').length}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="info-box bg-warning">
                        <span className="info-box-icon">
                          <i className="fas fa-wrench"></i>
                        </span>
                        <div className="info-box-content">
                          <span className="info-box-text">Mantenimiento</span>
                          <span className="info-box-number">
                            {solarPanels.filter(p => p.status === 'maintenance').length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-12">
                      <div className="info-box bg-info">
                        <span className="info-box-icon">
                          <i className="fas fa-bolt"></i>
                        </span>
                        <div className="info-box-content">
                          <span className="info-box-text">Producción Total</span>
                          <span className="info-box-number">
                            {solarPanels.reduce((acc, p) => acc + p.production, 0).toFixed(1)} kWh
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
