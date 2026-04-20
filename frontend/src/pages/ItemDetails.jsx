import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Box, ChevronLeft, Calendar, ShieldCheck, AlertCircle, Info, Clock, ArrowRight } from 'lucide-react'
import axios from 'axios'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'

const ItemDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/inventory`)
        const found = response.data.find(i => i._id === id)
        setItem(found)
      } catch (err) {
        console.error("Error fetching item details:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchItem()
  }, [id])

  if (loading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )

  if (!item) return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold">Item Not Found</h2>
      <Button onClick={() => navigate('/items')} className="mt-4">Return to Inventory</Button>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto py-8 text-foreground">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ChevronLeft className="h-4 w-4" /> Back to Inventory
      </button>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Left Aspect: Visual */}
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="relative group"
        >
          <div className="aspect-square overflow-hidden rounded-3xl bg-accent flex items-center justify-center border shadow-2xl transition-all group-hover:shadow-primary/5">
            {item.picture ? (
              <img src={item.picture} alt={item.itemName} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            ) : (
              <Box className="h-32 w-32 text-muted-foreground/20" />
            )}
          </div>
          <div className="absolute top-6 left-6">
            <Badge className="px-4 py-2 text-sm shadow-xl">{item.condition} Condition</Badge>
          </div>
        </motion.div>

        {/* Right Aspect: Details */}
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           className="flex flex-col gap-8"
        >
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">{item.itemName}</h1>
            <p className="text-xl font-medium text-primary">Municipal Resource</p>
          </div>

          <div className="space-y-4">
             <p className="text-muted-foreground leading-relaxed">
               {item.description || "This item is part of the Barangay Ipil municipal resource pool. It is available for community use following proper verification and approval by the municipal building administrators."}
             </p>
             
             <div className="flex items-center gap-6 py-4">
               <div className="flex flex-col gap-1">
                 <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Available</span>
                 <span className="text-3xl font-bold">{item.quantity} units</span>
               </div>
               <div className="h-10 w-px bg-border" />
               <div className="flex flex-col gap-1">
                 <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Max Duration</span>
                 <span className="text-3xl font-bold text-muted-foreground">3 Days</span>
               </div>
             </div>
          </div>

          <div className="space-y-4 bg-accent/30 rounded-3xl p-6 border border-white/10 backdrop-blur-sm">
            <h3 className="font-bold flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500" /> Ownership & Rules
            </h3>
            <ul className="space-y-3">
              {[
                "Borrower must submit a valid identification document.",
                "Items must be returned in the same condition as borrowed.",
                "Late returns may affect future borrowing privileges."
              ].map((rule, i) => (
                <li key={i} className="text-sm flex gap-3 text-muted-foreground">
                  <div className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <Button 
              size="lg" 
              className="h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]"
              onClick={() => navigate('/resident/borrow', { state: { selectedItem: item.itemName } })}
            >
              Request to Borrow <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-muted-foreground">
              <Info className="h-3 w-3" /> Requires Identity Verification
            </div>
          </div>
        </motion.div>
      </div>

      {/* Suggested Section */}
      <section className="mt-20 border-t pt-16">
         <h2 className="text-2xl font-bold mb-8">Borrowing Timeline</h2>
         <div className="grid gap-6 md:grid-cols-4">
            {[
              { step: 'Request', desc: 'Sumbit application with ID', icon: Calendar },
              { step: 'Review', desc: 'Admin verifies documentation', icon: Clock },
              { step: 'Pickup', desc: 'Collect item at municipal office', icon: Box },
              { step: 'Return', desc: 'Bring back item after usage', icon: CheckCircle2 }
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                 <div className="h-12 w-12 rounded-full border bg-background flex items-center justify-center text-primary mb-2 shadow-inner">
                    <s.icon className="h-6 w-6" />
                 </div>
                 <h4 className="font-bold text-sm">{s.step}</h4>
                 <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
            ))}
         </div>
      </section>
    </div>
  )
}

export default ItemDetails
