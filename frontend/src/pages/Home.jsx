import React from 'react'
import { ArrowRight, CheckCircle2, Package, Clock, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section - Text that sounds like a person speaking */}
      <section className="pt-16 text-center max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-6xl lg:text-7xl leading-[1.1]">
          Borrow what you need from the muni, <span className="text-primary italic">without the headache.</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 md:text-xl max-w-2xl mx-auto leading-relaxed">
          Planning an event or just need some tools? We put the municipal inventory online so you can see what's actually available and book it in a few clicks. No more guessing, no more wasted trips.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link
            to="/items"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-10 py-4 font-bold text-white transition-all hover:bg-primary/90 shadow-sm active:scale-95"
          >
            Check what's available
          </Link>
          <Link
            to="/how-to-borrow"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700 px-10 py-4 font-bold text-slate-900 dark:text-slate-100 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            How it works
          </Link>
        </div>
      </section>

      {/* Concrete Proof Section */}
      <section className="space-y-12 py-12 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            It's as simple as it looks.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            This isn't a complex mystery. You log in, find what you need, and see exactly how many are available for your chosen date. Here's a look at the dashboard you'll actually use:
          </p>
        </div>
        
        <div className="rounded-2xl border bg-slate-50 dark:bg-slate-900 p-2 shadow-sm overflow-hidden">
          <div className="bg-white dark:bg-slate-950 rounded-xl border overflow-hidden shadow-inner">
            <img 
              src="/inventory_dashboard_screenshot_1776668938422.png" 
              alt="Inventory Dashboard Screenshot" 
              className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </section>

      {/* Concrete Results Section (Replacing generic features) */}
      <section className="grid gap-12 md:grid-cols-3">
        <div className="space-y-4">
          <div className="h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
            <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white underline decoration-blue-500/30 underline-offset-4">
            120+ Items ready
          </h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            From plastic chairs and large tents to full sound systems. If the muni owns it, you can probably borrow it here.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="h-12 w-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
            <Clock className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white underline decoration-emerald-500/30 underline-offset-4">
            24-hour response
          </h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Our staff checks requests every morning. You'll know if you're approved usually within one business day.
          </p>
        </div>

        <div className="space-y-4">
          <div className="h-12 w-12 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
            <Shield className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white underline decoration-amber-500/30 underline-offset-4">
            Resident-only access
          </h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We use your basic ID to keep things secure. This ensures municipal resources are shared fairly among actual residents.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate-900 dark:bg-slate-800 rounded-[2rem] p-12 text-center space-y-6 text-white overflow-hidden relative group">
        <h2 className="text-3xl font-bold md:text-4xl">Ready to grab what you need?</h2>
        <p className="text-slate-300 max-w-xl mx-auto">
          Create an account in two minutes, upload your ID, and start browsing the catalog. It's free for all verified members of the community.
        </p>
        <div className="pt-4">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-slate-900 transition-transform hover:scale-105 active:scale-95"
          >
            Start borrowing <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
