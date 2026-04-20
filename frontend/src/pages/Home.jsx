import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Box, Shield, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex flex-col gap-24 pb-20">
      {/* Search / Hero Section */}
      <section className="pt-12 text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-6xl leading-tight">
          Borrow equipment from the municipal building, <span className="text-primary font-black">online.</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 md:text-xl leading-relaxed">
          Need chairs, tents, or sound systems for your next event? Skip the paperwork and the trips to the municipal office. 
          See what's available right now and send a request in minutes.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link
            to="/items"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 font-bold text-white transition-colors hover:bg-primary/90 shadow-md"
          >
            Check available items
          </Link>
          <Link
            to="/how-to-borrow"
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700 px-8 py-4 font-bold text-slate-900 dark:text-slate-100 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            How it works
          </Link>
        </div>
      </section>

      {/* Real Proof Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">What it actually looks like</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            This isn't a complex mystery. You log in, find what you need, and see exactly how many are available for your chosen date.
          </p>
        </div>
        
        <div className="rounded-2xl border bg-slate-50 dark:bg-slate-900 p-4 shadow-xl overflow-hidden">
          <img 
            src="/inventory_dashboard_screenshot_1776668938422.png" 
            alt="Barangay Ipil Inventory Dashboard Screenshot" 
            className="w-full h-auto rounded-xl border shadow-inner"
          />
        </div>
      </section>

      {/* Simple Results section */}
      <section className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 pt-12 border-t dark:border-slate-800">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Real-time counts</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Our staff updates the inventory as items are returned, so you don't waste time requesting things that aren't there.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Fast approval</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Requests go straight to the municipal office. Most items are approved within 24 hours during business days.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Local accountability</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            We use your resident verification to keep everything fair and ensure municipal resources are handled with care.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home
