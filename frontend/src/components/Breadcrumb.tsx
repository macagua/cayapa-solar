interface BreadcrumbItem {
  label: string
  path?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <ol className="breadcrumb float-sm-right">
      {items.map((item, index) => (
        <li
          key={index}
          className={`breadcrumb-item ${index === items.length - 1 ? 'active' : ''}`}
        >
          {item.path ? <a href={item.path}>{item.label}</a> : item.label}
        </li>
      ))}
    </ol>
  )
}
