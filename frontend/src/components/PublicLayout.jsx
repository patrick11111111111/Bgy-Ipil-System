import React from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './Navbar'

const PublicLayout = () => {
  return (
    <div className="relative min-h-screen bg-background transition-colors duration-300">
      {/* Global decorative background shapes */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="absolute -top-[10%] -right-[10%] h-[45rem] w-[45rem] rounded-full bg-primary/10 blur-[120px]"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -90, 0],
            opacity: [0.03, 0.08, 0.03]
          }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="absolute -bottom-[10%] -left-[10%] h-[35rem] w-[35rem] rounded-full bg-blue-500/5 blur-[100px]"
        />
      </div>

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
