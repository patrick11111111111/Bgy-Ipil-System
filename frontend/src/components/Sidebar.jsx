import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  BarChart3, 
  Box, 
  ChevronRight, 
  FileText, 
  Home, 
  LayoutDashboard, 
  LogOut, 
  Package, 
  User, 
  Users 
} from 'lucide-react'
import { AuthContext } from '../context/AuthContext'
import { ThemeToggle } from './ThemeToggle'
import { cn } from '../lib/utils'

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useContext(AuthContext)

  const adminMenu = [
    { text: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { text: 'Borrow Requests', icon: FileText, path: '/admin/requests' },
    { text: 'Inventory Management', icon: Package, path: '/admin/inventory' },
    { text: 'Reports', icon: BarChart3, path: '/admin/reports' },
    { text: 'Resident List', icon: Users, path: '/admin/residents' },
  ]

  const residentMenu = [
    { text: 'Dashboard', icon: LayoutDashboard, path: '/resident' },
    { text: 'Available Items', icon: Box, path: '/items' },
    { text: 'Borrow Request', icon: FileText, path: '/resident/borrow' },
    { text: 'My Requests', icon: FileText, path: '/resident/my-requests' },
    { text: 'How to Borrow', icon: Home, path: '/how-to-borrow' },
  ]

  const menuItems = user?.role === 'admin' ? adminMenu : residentMenu

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-card/50 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-6 border-b">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
             <Box className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">Barangay Ipil</span>
        </div>
        <ThemeToggle />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== '/admin' && item.path !== '/resident' && location.pathname.startsWith(item.path))
            
            return (
              <Link
                key={item.text}
                to={item.path}
                className={cn(
                  "group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  {item.text}
                </div>
                {isActive && <ChevronRight className="h-4 w-4" />}
              </Link>
            )
          })}
        </div>
      </div>

      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <User className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold">{user?.username}</span>
            <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-4 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar
