import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Box, Menu, X, LogIn, UserPlus } from 'lucide-react'
import { Button } from './ui/button'
import { ThemeToggle } from './ThemeToggle'
import { cn } from '../lib/utils'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const publicLinks = [
    { name: 'Home', path: '/' },
    { name: 'Available Items', path: '/items' },
    { name: 'How to Borrow', path: '/how-to-borrow' },
  ]

  const residentLinks = [
    { name: 'Dashboard', path: '/resident' },
    { name: 'Available Items', path: '/items' },
    { name: 'My Requests', path: '/resident/my-requests' },
    { name: 'How to Borrow', path: '/how-to-borrow' },
  ]

  const adminLinks = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Borrow Requests', path: '/admin/requests' },
    { name: 'Inventory', path: '/admin/inventory' },
    { name: 'Reports', path: '/admin/reports' },
    { name: 'Residents', path: '/admin/residents' },
  ]

  const navLinks = !user ? publicLinks : user.role === 'admin' ? adminLinks : residentLinks

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsOpen(false)
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b",
        scrolled ? "bg-white dark:bg-slate-900 py-3 shadow-sm" : "bg-white dark:bg-slate-900 py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white p-1 border transition-transform group-hover:scale-105">
              <img src="/logo.jpg" alt="Logo" className="h-full w-full object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Barangay <span className="text-primary italic">Ipil</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-3 border-l pl-8">
              <ThemeToggle />
              {!user ? (
                <>
                  <Button asChild variant="ghost" className="rounded-full">
                    <Link to="/login" className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" /> Login
                    </Link>
                  </Button>
                  <Button asChild className="rounded-full shadow-sm">
                    <Link to="/signup" className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" /> Signup
                    </Link>
                  </Button>
                </>
              ) : (
                <Button onClick={handleLogout} variant="ghost" className="rounded-full text-rose-500 hover:text-rose-600 hover:bg-rose-500/10">
                  <LogIn className="h-4 w-4 rotate-180 mr-2" /> Logout
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b bg-white dark:bg-slate-900 overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-semibold transition-colors",
                    location.pathname === link.path ? "text-primary" : "text-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t">
                {!user ? (
                  <>
                    <Button asChild variant="outline" className="w-full rounded-2xl h-12">
                      <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                    </Button>
                    <Button asChild className="w-full rounded-2xl h-12">
                      <Link to="/signup" onClick={() => setIsOpen(false)}>Signup</Link>
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleLogout} variant="outline" className="w-full rounded-2xl h-12 text-rose-500 hover:bg-rose-500/10">
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
