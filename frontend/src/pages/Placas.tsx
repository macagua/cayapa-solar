import { useState } from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Card from '@components/Card'
import Breadcrumb from '@components/Breadcrumb'
import SolarMap from '@components/SolarMap'
import { PANEL_STATUS, ROUTES } from '@utils/constants'
import { useMediaQuery, useEnergyData } from '@hooks/index'

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

interface SolarPanel {
  id: string
  name: string
  production: number
  status: keyof typeof PANEL_STATUS
  location: string
  coordinates: [number, number]
}

const solarPanels: SolarPanel[] = [
  {
    id: 'sensor-001',
    name: 'Placa Solar 1',
    production: 12.5,
    status: 'ACTIVE',
    location: 'Madrid, España',
    coordinates: [40.4168, -3.7038],
  },
  {
    id: '12346',
    name: 'Placa Solar 2',
    production: 15.3,
    status: 'ACTIVE',
    location: 'Madrid, España',
    coordinates: [40.4200, -3.7100],
  },
  {
    id: '12347',
    name: 'Placa Solar 3',
    production: 10.8,
    status: 'MAINTENANCE',
    location: 'Madrid, España',
    coordinates: [40.4100, -3.6900],
  },
]

export default function Placas() {
  const [selectedPanel, setSelectedPanel] = useState<SolarPanel>(solarPanels[0])
  const { energyData, loading, error } = useEnergyData()
  const isMobile = useMediaQuery('(max-width: 767px)')

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
      ACTIVE: 'badge-success',
      INACTIVE: 'badge-danger',
      MAINTENANCE: 'badge-warning',
      ERROR: 'badge-danger',
      BENEFIT: 'badge-warning',
    }
    const labels = {
      ACTIVE: 'Activa',
      INACTIVE: 'Inactiva',
      MAINTENANCE: 'Mantenimiento',
      ERROR: 'Error',
      BENEFIT: '3 horas de aparcamiento gratuito en zona verde',
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
            <div className="col-12 col-sm-6">
              <h1 className="m-0 h4 h1-sm">Total Placas Solares</h1>
            </div>
            <div className="col-12 col-sm-6 d-none d-sm-block">
              <Breadcrumb
                items={[
                  { label: 'Inicio', path: ROUTES.HOME },
                  { label: 'Placas' },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container-fluid">
          {/* Parte superior con detalles de la placa seleccionada */}
          <div className="row mb-3">
            <div className="col-lg-12">
              <Card title="Detalles de la Placa Solar Seleccionada">
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
                  <div className="col-md-3">
                    <p>
                      <strong>Token ganados:</strong> 33 🎖️🎖️🎖️
                    </p>
                  </div>
                  <div className="col-md-9">
                    <p>
                      <strong>Beneficio:</strong> {getStatusBadge('BENEFIT')}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Tabla de registros de la placa seleccionada */}
          <div className="row mb-3">
            <div className="col-lg-12">
              <Card
                title={
                  <>
                    <i className="fas fa-table mr-2"></i>
                    Historial de Registros - {selectedPanel.name}
                  </>
                }
                headerActions={
                  <span className="badge badge-info">
                    {selectedPanelData.length} registros
                  </span>
                }
                className=""
                footer={
                  selectedPanelData.length > 0 ? (
                    <small className="text-muted">
                      <i className="fas fa-info-circle mr-1"></i>
                      Mostrando {selectedPanelData.length} registro(s) para {selectedPanel.name}
                    </small>
                  ) : undefined
                }
              >
                <div className="p-0">
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
                      {error.message}
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
                            {!isMobile && <th>Device ID</th>}
                            <th>Energía (kWh)</th>
                            {!isMobile && <th>Fecha y Hora</th>}
                            <th>Enlace TX</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedPanelData.map((record, index) => (
                            <tr key={`${record.device_id}-${record.timestamp}-${index}`}>
                              {!isMobile && (
                                <td>
                                  <code className="text-xs">{record.device_id}</code>
                                </td>
                              )}
                              <td>
                                <strong>{record.energy}</strong> kWh
                              </td>
                              {!isMobile && (
                                <td>
                                  <i className="far fa-clock mr-1"></i>
                                  {formatDate(record.timestamp)}
                                </td>
                              )}
                              <td>
                                {record.tx_link ? (
                                  <a
                                    href={record.tx_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-sm btn-outline-primary"
                                  >
                                    <i className="fas fa-external-link-alt mr-1"></i>
                                    {isMobile ? 'TX' : 'Ver TX'}
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
              </Card>
            </div>
          </div>

          {/* Parte inferior, dividida en dos */}
          <div className="row">
            {/* Lista de Placas Solares (izquierda) */}
            <div className={isMobile ? 'col-12 mb-3' : 'col-md-6'}>
              <Card
                title="Lista de Placas Solares"
                headerActions={
                  <span className="badge badge-primary">{solarPanels.length} placas</span>
                }
                footer={
                  <button className="btn btn-primary btn-sm">
                    <i className="fas fa-plus mr-1"></i> Agregar Placa
                  </button>
                }
              >
                <div className="p-0">
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
                          <small className={selectedPanel.id === panel.id ? 'text-white-50' : 'text-muted'}>
                            {panel.production} kWh
                          </small>
                        </div>
                        {getStatusBadge(panel.status)}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>

            {/* Mapa de la Comunidad de Madrid (derecha) */}
            <div className={isMobile ? 'col-12' : 'col-md-6'}>
              <Card
                title="Mapa de Ubicación"
                headerActions={
                  <span className="badge badge-info">
                    <i className="fas fa-map-marker-alt mr-1"></i>
                    Madrid, España
                  </span>
                }
              >
                <div className="p-0">
                  <SolarMap
                    center={[40.4168, -3.7038]}
                    zoom={11}
                    height={isMobile ? '300px' : '400px'}
                    markers={solarPanels.map(panel => ({
                      id: panel.id,
                      position: panel.coordinates,
                      title: panel.name,
                      description: `ID: ${panel.id} | Producción: ${panel.production} kWh | Estado: ${panel.status}`,
                      onClick: () => setSelectedPanel(panel),
                    }))}
                  />
                </div>
              </Card>

              {/* Estadísticas adicionales */}
              <Card title="Estadísticas" className="mt-3">
                  <div className="row">
                    <div className={isMobile ? 'col-12 mb-2' : 'col-6'}>
                      <div className="info-box bg-success">
                        <span className="info-box-icon">
                          <i className="fas fa-check"></i>
                        </span>
                        <div className="info-box-content">
                          <span className="info-box-text">Activas</span>
                          <span className="info-box-number">
                            {solarPanels.filter(p => p.status === 'ACTIVE').length}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={isMobile ? 'col-12 mb-2' : 'col-6'}>
                      <div className="info-box bg-warning">
                        <span className="info-box-icon">
                          <i className="fas fa-wrench"></i>
                        </span>
                        <div className="info-box-content">
                          <span className="info-box-text">Mantenimiento</span>
                          <span className="info-box-number">
                            {solarPanels.filter(p => p.status === 'MAINTENANCE').length}
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
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
