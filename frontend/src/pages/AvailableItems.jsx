import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Box, Tag, ChevronRight, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const AvailableItems = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/inventory`)
        // Filter out items that are actual borrow requests if needed, 
        // but for now we assume this returns all items the admin added.
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
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Municipal Inventory</h1>
          <p className="text-muted-foreground">Resources available for community borrowing.</p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search items..." 
              className="rounded-full border bg-background px-10 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button className="flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium hover:bg-accent transition-colors">
            <Filter className="h-4 w-4" /> Filter
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : items.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed p-16 text-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <Box className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold">No Items Available Yet</h3>
            <p className="text-muted-foreground mt-2 max-w-sm">
              The municipal administration is currently updating the inventory. Please check back later or contact the admin office.
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group glass-card overflow-hidden rounded-2xl transition-all hover:shadow-2xl hover:shadow-primary/5"
            >
              <div className="h-48 w-full bg-accent relative overflow-hidden">
                {item.picture ? (
                   <img src={item.picture} alt={item.itemName} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20">
                    <Box className="h-12 w-12" />
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className="rounded-full bg-primary/90 px-3 py-1 text-xs font-bold text-primary-foreground backdrop-blur-md">
                    {item.condition}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors mb-2">{item.itemName}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {item.description || "No description provided for this municipal resource."}
                </p>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Available Quantity</span>
                  <span className="text-xl font-bold text-primary">{item.quantity}</span>
                </div>
                <Link
                  to={`/items/${item._id}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-bold transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  View Details <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AvailableItems
