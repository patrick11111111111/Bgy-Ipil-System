import React from 'react'
import { 
  UserCheck, 
  Search, 
  FileCheck, 
  HandHelping, 
  ArrowRight, 
  Calendar, 
  Clock, 
  ShieldCheck,
  AlertCircle,
  Info
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'

const HowToBorrow = () => {
  const steps = [
    {
      title: "Set up your account",
      desc: "First, you'll need to register as a resident. This helps us keep the municipal equipment safe and accountable.",
      icon: UserCheck,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Find what you need",
      desc: "Look through our online catalog. You can see exactly what's in the warehouse right now.",
      icon: Search,
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-900/20"
    },
    {
      title: "Upload your ID",
      desc: "We need to verify you're a local resident. A quick photo of your Barangay ID or any valid ID works great.",
      icon: FileCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-900/20"
    },
    {
      title: "Pick it up",
      desc: "Once we approve your request, just swing by the municipal building. We'll have everything ready for you.",
      icon: HandHelping,
      color: "text-indigo-600",
      bg: "bg-indigo-50 dark:bg-indigo-900/20"
    }
  ]

  return (
    <div className="max-w-5xl mx-auto py-12 text-foreground flex flex-col gap-20">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-800 px-6 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
          <Info className="h-4 w-4" /> The simple version
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl text-slate-900 dark:text-white">
           How to borrow <span className="text-primary italic">stuff.</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
           We tried to make this as painless as possible for everyone in Barangay Ipil.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center gap-6"
          >
            <div className={`flex h-20 w-20 items-center justify-center rounded-2xl ${step.bg} border border-slate-100 dark:border-slate-800 transition-transform hover:scale-105`}>
               <step.icon className={`h-10 w-10 ${step.color}`} />
            </div>
            <div className="space-y-2">
               <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{step.title}</h3>
               <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2 mt-8">
         <Card className="border-2 border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
            <CardContent className="p-10 space-y-8">
               <h3 className="text-2xl font-bold text-slate-900 dark:text-white">A few rules to keep in mind</h3>
               <div className="space-y-6">
                  {[
                    { label: "Identification is a must", desc: "No ID, no borrowing. We need to know who has the equipment.", icon: FileCheck },
                    { label: "3-day maximum", desc: "Items can be borrowed for up to 3 days at a time so everyone gets a turn.", icon: Calendar },
                    { label: "Bring it back clean", desc: "Please return items in the same condition you found them.", icon: Clock }
                  ].map((p, i) => (
                    <div key={i} className="flex gap-4">
                       <div className="mt-1 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <p.icon className="h-4 w-4 text-primary" />
                       </div>
                        <div>
                           <p className="font-bold text-slate-900 dark:text-white">{p.label}</p>
                           <p className="text-slate-600 dark:text-slate-400">{p.desc}</p>
                        </div>
                    </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         <div className="flex flex-col justify-center gap-8 rounded-3xl bg-primary/[0.03] dark:bg-primary/[0.02] p-10 border-2 border-primary/10">
            <div className="space-y-3">
               <h3 className="text-3xl font-bold text-primary">Ready to get started?</h3>
               <p className="text-slate-600 dark:text-slate-400 text-lg">
                 Sign in to your account and browse the catalog to find what you need today. 
               </p>
            </div>
            <div className="flex flex-wrap gap-4">
               <Button asChild size="lg" className="rounded-xl px-10 h-14 font-bold shadow-sm">
                  <Link to="/items">Start Browsing</Link>
               </Button>
               <Button asChild variant="outline" size="lg" className="rounded-xl px-10 h-14 font-bold border-2">
                  <Link to="/signup">Create Account</Link>
               </Button>
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-amber-700 bg-amber-50 p-4 rounded-xl border border-amber-200">
               <AlertCircle className="h-5 w-5 shrink-0" />
               <p>Everything depends on what's currently in the warehouse and staff approval.</p>
            </div>
         </div>
      </div>
    </div>
  )
}

export default HowToBorrow
