import type { DashboardStats } from '../types'
import Breadcrumb from '@components/Breadcrumb'
import StatsCard from '@components/StatsCard'
import { ROUTES } from '@utils/constants'
import { useWindowSize } from '@hooks/useResponsive'
import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import { formatCurrency } from '@utils/index'

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
    value: formatCurrency(50000, 'EUR'),
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
  const { width } = useWindowSize()
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  // Calcular clases de columna dinámicamente
  const getColumnClass = () => {
    if (width >= 1200) return 'col-xl-3 col-lg-4 col-md-6 col-sm-6' // 4 columnas en XL
    if (width >= 992) return 'col-lg-4 col-md-6 col-sm-6' // 3 columnas en LG
    if (width >= 768) return 'col-md-6 col-sm-6' // 2 columnas en MD
    return 'col-12' // 1 columna en mobile
  }

  // Inicializar gráfica de producción de energía
  useEffect(() => {
    if (!chartRef.current) return

    // Destruir instancia anterior si existe
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy()
    }

    const ctx = chartRef.current.getContext('2d')
    if (!ctx) return

    // Datos de ejemplo - últimos 7 días
    const labels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
    const energyData = [850, 920, 780, 1050, 1150, 1250, 1100]

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Energía Generada (kWh)',
            data: energyData,
            borderColor: '#ffc107',
            backgroundColor: 'rgba(255, 193, 7, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 5,
            pointBackgroundColor: '#ffc107',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 7,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function (context) {
                return `${context.dataset.label}: ${context.parsed.y} kWh`
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + ' kWh'
              },
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    })

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }
    }
  }, [])

  return (
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-12 col-sm-6">
            <h1 className="m-0 h3 h1-sm">Dashboard</h1>
          </div>
          <div className="col-12 col-sm-6 d-none d-sm-block">
            <Breadcrumb
              items={[
                { label: 'Inicio', path: ROUTES.HOME },
                { label: 'Dashboard' },
              ]}
            />
          </div>
        </div>

        {/* Stats Row */}
        <div className="row mt-3 mt-md-4">
          {statsData.map(stat => (
            <div key={stat.id} className={`${getColumnClass()} mb-3 mb-md-4`}>
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
                <div className="position-relative mb-4" style={{ height: '300px' }}>
                  <canvas ref={chartRef}></canvas>
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
