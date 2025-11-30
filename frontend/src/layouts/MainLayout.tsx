import { ReactNode } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { useUIStore } from '@store/uiStore'
import { cn } from '@utils/helpers'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { sidebarCollapsed } = useUIStore()

  return (
    <div className={cn('wrapper', sidebarCollapsed && 'sidebar-collapse')}>
      <Header />
      <Sidebar />
      
      <div className="content-wrapper">
        <main className="content">
          <div className="container-fluid">
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
