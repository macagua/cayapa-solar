import { ReactNode } from 'react'

interface CardProps {
  title?: string | ReactNode
  children: ReactNode
  className?: string
  headerActions?: ReactNode
  footer?: ReactNode
}

export default function Card({ title, children, className = '', headerActions, footer }: CardProps) {
  return (
    <div className={`card ${className}`}>
      {(title || headerActions) && (
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
          {headerActions && <div className="card-tools">{headerActions}</div>}
        </div>
      )}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}
