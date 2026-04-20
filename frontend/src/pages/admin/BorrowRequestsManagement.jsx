import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  User, 
  FileSearch, 
  ChevronRight,
  Filter,
  Download
} from 'lucide-react'
import axios from 'axios'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'

const BorrowRequestsManagement = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      // In this backend, inventory is the model for requests
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/inventory`)
      // Filter out items that are not 'Pending' or handle them all
      setRequests(response.data)
    } catch (err) {
      console.error("Error fetching requests:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleAction = async (id, status) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/inventory/${id}`, { status })
      fetchRequests()
    } catch (err) {
      console.error(`Error updating request to ${status}:`, err)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Borrow Requests</h1>
          <p className="text-muted-foreground">Review and process resident applications for municipal resources.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="rounded-xl gap-2"><Filter className="h-4 w-4" /> Filter</Button>
           <Button variant="outline" className="rounded-xl gap-2"><Download className="h-4 w-4" /> Export CSV</Button>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
           <div className="flex h-64 items-center justify-center">
             <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
           </div>
        ) : requests.length === 0 ? (
          <div className="glass-card rounded-3xl p-16 text-center border-2 border-dashed">
            <h3 className="text-xl font-bold italic text-muted-foreground">No pending borrow requests.</h3>
          </div>
        ) : (
          requests.map((request, i) => (
            <motion.div
              key={request._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card flex flex-col gap-6 rounded-3xl p-6 border transition-all hover:border-primary/30 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-center gap-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-accent-foreground shrink-0 shadow-inner">
                  <FileSearch className="h-8 w-8" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">{request.itemName}</h3>
                    <Badge variant={
                      request.status === 'Pending' ? 'secondary' :
                      request.status === 'Approved' ? 'default' : 'destructive'
                    }>
                      {request.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground font-medium">
                    <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {request.presentedBy || 'Anonymous'}</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {new Date(request.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t pt-6 md:border-t-0 md:pt-0">
                {request.status === 'Pending' ? (
                  <>
                    <Button 
                      variant="outline" 
                      className="flex-1 md:flex-none h-12 rounded-xl text-rose-600 hover:bg-rose-500/10 hover:text-rose-600 border-rose-500/20"
                      onClick={() => handleAction(request._id, 'Rejected')}
                    >
                      <XCircle className="h-5 w-5 mr-2" /> Reject
                    </Button>
                    <Button 
                      className="flex-1 md:flex-none h-12 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-500/20"
                      onClick={() => handleAction(request._id, 'Approved')}
                    >
                      <CheckCircle2 className="h-5 w-5 mr-2" /> Approve
                    </Button>
                  </>
                ) : (
                  <Button variant="ghost" className="h-12 rounded-xl italic text-muted-foreground group">
                    Processed <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

export default BorrowRequestsManagement
