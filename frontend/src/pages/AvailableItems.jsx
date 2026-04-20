import React, { useEffect, useState } from 'react'
import { Search, Filter, Box, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const AvailableItems = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
        const response = await axios.get(`${apiUrl}/api/inventory`)
        setItems(response.data)
      } catch (error) {
        console.error("Error fetching items:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchItems()
  }, [])

  return (
    <div className="flex flex-col gap-10 py-4">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Municipal Inventory</h1>
          <p className="text-slate-500 mt-1">Resources currently available in the warehouse.</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="relative min-w-[280px]">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search items..." 
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-12 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Filter className="h-4 w-4" /> Filter
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-20 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-300">
            <Box className="h-10 w-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">The warehouse is currently empty</h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              Staff are currently updating the inventory lists. Please check back in a bit or contact the office.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item._id}
              className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all hover:border-primary/30"
            >
              <div className="h-52 w-full bg-slate-100 dark:bg-slate-800 relative">
                {item.picture ? (
                   <img src={item.picture} alt={item.itemName} className="h-full w-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-300" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-300 dark:text-slate-700">
                    <Box className="h-12 w-12" />
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="rounded-lg bg-white/90 dark:bg-slate-900/90 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white border shadow-sm">
                    {item.condition}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-primary transition-colors">{item.itemName}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-6 leading-relaxed">
                  {item.description || "No description provided for this municipal resource."}
                </p>
                
                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">In Stock</span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white">{item.quantity}</span>
                </div>

                <Link
                  to={`/items/${item._id}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 dark:bg-slate-800 py-4 text-sm font-bold text-white transition-all hover:bg-primary"
                >
                  View Details <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AvailableItems
