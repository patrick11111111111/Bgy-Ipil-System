import React from 'react'
import { motion } from 'framer-motion'
import { 
  UserCheck, 
  Search, 
  FileCheck, 
  HandHelping, 
  ArrowRight, 
  Calendar, 
  Clock, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'

const HowToBorrow = () => {
  const steps = [
    {
      title: "Register and Log In",
      desc: "Create a resident account to verify your identity and access the borrowing features.",
      icon: UserCheck,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "Browse and Select",
      desc: "Explore the available municipal inventory and choose what you need for your event or necessity.",
      icon: Search,
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    {
      title: "Verify with Document",
      desc: "Upload a valid identification (Barangay ID, Voter ID, etc.) for accountability and security.",
      icon: FileCheck,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      title: "Pick Up & Use",
      desc: "Once approved, collect the item from the municipal building and use it responsibly.",
      icon: HandHelping,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10"
    }
  ]

  return (
    <div className="max-w-5xl mx-auto py-8 text-foreground flex flex-col gap-16">
      <div className="text-center space-y-6">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-2 text-sm font-bold text-primary border border-primary/20 backdrop-blur-sm"
        >
          <Info className="h-4 w-4" /> Comprehensive Guide
        </motion.div>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
           How to Borrow <span className="text-primary italic">Resources.</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
           A simple process designed to help everyone in Barangay Ipil access what they need.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center text-center gap-4 group"
          >
            <div className={`flex h-20 w-20 items-center justify-center rounded-3xl ${step.bg} shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-6`}>
               <step.icon className={`h-10 w-10 ${step.color}`} />
            </div>
            <div className="space-y-2">
               <h3 className="text-xl font-bold">{step.title}</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
            {i < steps.length - 1 && (
               <div className="hidden lg:block absolute right-[-2.5rem] top-1/2 -translate-y-1/2 opacity-20">
                  <ArrowRight className="h-8 w-8" />
               </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
         <Card className="glass-card border-none rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <ShieldCheck className="h-24 w-24" />
            </div>
            <CardContent className="p-10 space-y-6">
               <h3 className="text-2xl font-bold">Important Policies</h3>
               <div className="space-y-4">
                  {[
                    { label: "Valid ID Requirement", desc: "No request can be processed without clear identification.", icon: FileCheck },
                    { label: "Maximum Duration", desc: "Items can be borrowed for a maximum of 3 continuous days.", icon: Calendar },
                    { label: "On-Time Return", desc: "Please return items on time to serve the next resident.", icon: Clock }
                  ].map((p, i) => (
                    <div key={i} className="flex gap-4">
                       <div className="mt-1 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <p.icon className="h-4 w-4 text-primary" />
                       </div>
                       <div>
                          <p className="font-bold">{p.label}</p>
                          <p className="text-sm text-muted-foreground">{p.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         <div className="flex flex-col justify-center gap-8 rounded-3xl bg-accent/20 p-10 border border-white/10">
            <div className="space-y-2">
               <h3 className="text-3xl font-bold text-primary">Ready to start?</h3>
               <p className="text-muted-foreground">Log in to your account and browse the municipal catalog to find what you need today.</p>
            </div>
            <div className="flex flex-wrap gap-4">
               <Button asChild size="lg" className="rounded-full px-10 h-14 font-bold shadow-xl shadow-primary/20">
                  <Link to="/items">Start Browsing</Link>
               </Button>
               <Button asChild variant="outline" size="lg" className="rounded-full px-10 h-14 font-bold bg-background">
                  <Link to="/signup">Register Now</Link>
               </Button>
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 p-4 rounded-2xl border border-amber-500/20">
               <AlertCircle className="h-5 w-5 shrink-0" />
               <p>Remember that all borrowings are subject to availability and municipal approval.</p>
            </div>
         </div>
      </div>
    </div>
  )
}

export default HowToBorrow
