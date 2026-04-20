import React from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './Navbar'

const PublicLayout = () => {
  return (
    <div className="relative min-h-screen bg-background">

      <Navbar />

      <main className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <Outlet />
        </div>
      </main>

      {/* Footer (Optional, but adds to premium feel) */}
      <footer className="relative z-10 border-t py-12 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-xl font-bold tracking-tight">Barangay <span className="text-primary italic">Ipil</span></span>
              <p className="text-sm text-muted-foreground">© 2024 Municipal Borrowing Portal. All rights reserved.</p>
            </div>
            <div className="flex gap-8 text-sm font-medium text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PublicLayout
