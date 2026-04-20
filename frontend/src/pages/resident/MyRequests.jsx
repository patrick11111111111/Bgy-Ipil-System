import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Box, Clock, CheckCircle2, XCircle, Search, Filter } from 'lucide-react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'

const MyRequests = () => {
  const { user } = useContext(AuthContext)
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/inventory`)
        setRequests(response.data.filter(r => r.requestedBy?._id === user?._id || r.presentedBy === user?.username))
      } catch (err) {
        console.error("Error fetching requests:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchMyRequests()
  }, [user])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved': return <CheckCircle2 className="h-5 w-5 text-emerald-500" />
      case 'Rejected': return <XCircle className="h-5 w-5 text-rose-500" />
      default: return <Clock className="h-5 w-5 text-amber-500" />
    }
  }

  return (
    <div className="flex flex-col gap-8 text-foreground">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Requests</h1>
          <p className="text-muted-foreground">Detailed history of your municipal borrowing applications.</p>
        </div>
        <div className="flex gap-2">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
             <input type="text" placeholder="Search my requests..." className="rounded-full border bg-background px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
           </div>
           <Button variant="outline" className="rounded-full gap-2"><Filter className="h-4 w-4" /> Filter</Button>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : requests.length === 0 ? (
          <div className="glass-card rounded-3xl p-16 text-center border-2 border-dashed">
            <h3 className="text-xl font-bold italic text-muted-foreground">No requests found yet.</h3>
          </div>
        ) : (
          requests.map((request, i) => (
            <motion.div
              key={request._id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card flex flex-col gap-6 rounded-3xl p-6 border transition-all hover:bg-accent/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-inner">
                    <Box className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{request.itemName}</h3>
                    <p className="text-sm text-muted-foreground">Requested on {new Date(request.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   {getStatusIcon(request.status)}
                   <Badge variant={
                     request.status === 'Pending' ? 'secondary' :
                     request.status === 'Approved' ? 'default' : 'destructive'
                   }>
                     {request.status}
                   </Badge>
                </div>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-6 border-t border-white/10">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Purpose</span>
                  <p className="text-sm font-medium">{request.presentedBy || 'General Use'}</p>
                </div>
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Condition</span>
                   <p className="text-sm font-medium">{request.condition}</p>
                </div>
                <div className="flex items-center justify-end md:col-start-2 lg:col-start-3">
                   <Button variant="ghost" className="text-xs font-bold gap-2 rounded-full">
                     Action History
                   </Button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

export default MyRequests
