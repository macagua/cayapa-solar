import type { DashboardStats } from '../types'
import Breadcrumb from '@components/Breadcrumb'
import StatsCard from '@components/StatsCard'
import { ROUTES } from '@utils/constants'

const statsData: DashboardStats[] = [
  {
    id: 'total-panels',
    title: 'Total Placas',
    value: '5',
    icon: 'fa-solar-panel',
    color: 'info',
    trend: { value: 12, isPositive: true },
  },
  {
    id: 'active-investments',
    title: 'Inversiones Activas',
    value: '$50,000',
    icon: 'fa-coins',
    color: 'success',
    trend: { value: 8, isPositive: true },
  },
  {
    id: 'energy-generated',
    title: 'Energía Generada',
    value: '1,250 kWh',
    icon: 'fa-bolt',
    color: 'warning',
    trend: { value: 5, isPositive: true },
  },
  {
    id: 'total-users',
    title: 'Usuarios',
    value: '5',
    icon: 'fa-users',
    color: 'danger',
    trend: { value: 3, isPositive: false },
  },
]

export default function Dashboard() {
  return (
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0">Dashboard</h1>
          </div>
          <div className="col-sm-6">
            <Breadcrumb
              items={[
                { label: 'Inicio', path: ROUTES.HOME },
                { label: 'Dashboard' },
              ]}
            />
          </div>
        </div>

        {/* Stats Row */}
        <div className="row mt-4">
          {statsData.map(stat => (
            <div key={stat.id} className="col-lg-3 col-6">
              <StatsCard
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
                trend={stat.trend}
                link={stat.id === 'total-panels' ? '/placas' : '#'}
                linkText="Más info"
              />
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="row mt-4">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header border-0">
                <div className="d-flex justify-content-between">
                  <h3 className="card-title">Producción de Energía</h3>
                  <a href="#">Ver Reporte</a>
                </div>
              </div>
              <div className="card-body">
                <div className="position-relative mb-4">
                  <canvas id="energy-chart" height="200"></canvas>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card">
              <div className="card-header border-0">
                <h3 className="card-title">Actividad Reciente</h3>
              </div>
              <div className="card-body p-0">
                <ul className="products-list product-list-in-card pl-2 pr-2">
                  <li className="item">
                    <div className="product-info">
                      <a href="#" className="product-title">
                        Nueva inversión registrada
                        <span className="badge badge-success float-right">Nuevo</span>
                      </a>
                      <span className="product-description">
                        Usuario: Juan Pérez - $5,000
                      </span>
                    </div>
                  </li>
                  <li className="item">
                    <div className="product-info">
                      <a href="#" className="product-title">
                        Placa solar instalada
                        <span className="badge badge-info float-right">Instalación</span>
                      </a>
                      <span className="product-description">
                        Ubicación: Cayapa - 350W
                      </span>
                    </div>
                  </li>
                  <li className="item">
                    <div className="product-info">
                      <a href="#" className="product-title">
                        Mantenimiento programado
                        <span className="badge badge-warning float-right">Pendiente</span>
                      </a>
                      <span className="product-description">
                        Sector Norte - 15 paneles
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
