import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Box, Shield, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex flex-col gap-16 pb-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-primary/10 p-8 md:p-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-2xl"
        >
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Municipal Borrowing Made <span className="text-primary">Simple.</span>
          </h1>
          <p className="mb-8 text-lg font-medium text-muted-foreground md:text-xl">
            Access municipal resources easily through Barangay Ipil's community borrowing portal. 
            Empowering residents with transparent and efficient resource management.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/items"
              className="flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:scale-105 hover:bg-primary/90"
            >
              Browse Items <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/how-to-borrow"
              className="flex items-center gap-2 rounded-full border border-primary/20 bg-background/50 px-8 py-3 font-semibold backdrop-blur-sm transition-all hover:bg-accent"
            >
              How it Works
            </Link>
          </div>
        </motion.div>

      </section>

      {/* Features Grid */}
      <section className="grid gap-8 md:grid-cols-3">
        {[
          {
            title: "Safe & Secure",
            desc: "Every borrow request is verified with valid identification for community safety and accountability.",
            icon: Shield,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
          },
          {
            title: "Dynamic Inventory",
            desc: "Real-time updates on available municipal equipment, event supplies, and more.",
            icon: Box,
            color: "text-amber-500",
            bg: "bg-amber-500/10"
          },
          {
            title: "Community Growth",
            desc: "Designed to foster trust and shared resource efficiency within our municipal building.",
            icon: Users,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10"
          }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card flex flex-col gap-4 rounded-2xl p-6"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg}`}>
              <feature.icon className={`h-6 w-6 ${feature.color}`} />
            </div>
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  )
}

export default Home
