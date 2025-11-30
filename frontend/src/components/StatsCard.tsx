interface StatsCardProps {
  title: string
  value: string | number
  icon: string
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  trend?: {
    value: number
    isPositive: boolean
  }
  link?: string
  linkText?: string
}

export default function StatsCard({
  title,
  value,
  icon,
  color = 'info',
  trend,
  link = '#',
  linkText = 'Más info',
}: StatsCardProps) {
  return (
    <div className={`small-box bg-${color}`}>
      <div className="inner">
        <h3>{value}</h3>
        <p>{title}</p>
        {trend && (
          <p className="text-sm">
            <i className={`fas fa-arrow-${trend.isPositive ? 'up' : 'down'}`}></i>{' '}
            {trend.value}% {trend.isPositive ? 'aumento' : 'disminución'}
          </p>
        )}
      </div>
      <div className="icon">
        <i className={`fas ${icon}`}></i>
      </div>
      <a href={link} className="small-box-footer">
        {linkText} <i className="fas fa-arrow-circle-right"></i>
      </a>
    </div>
  )
}
