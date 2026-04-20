import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Box, FileText, CheckCircle2, Clock, AlertCircle, ArrowRight } from 'lucide-react'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'

const UserDashboard = () => {
  const { user } = useContext(AuthContext)
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/inventory`)
        // Filter to only user's requests if the backend doesn't do it automatically
        setRequests(response.data.filter(r => r.requestedBy?._id === user?._id || r.presentedBy === user?.username))
      } catch (err) {
        console.error("Error fetching requests:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchMyRequests()
  }, [user])

  const stats = [
    { label: 'Active Requests', value: requests.filter(r => r.status === 'Pending').length, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Approved', value: requests.filter(r => r.status === 'Approved').length, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Returned', value: '0', icon: Box, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Notifications', value: '3', icon: AlertCircle, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  ]

  return (
    <div className="flex flex-col gap-8 text-foreground">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.username}</h1>
        <p className="text-muted-foreground">Manage your municipal borrowing activity and view current status.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
             <div className="flex items-center justify-between mb-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2 glass-card border-none rounded-3xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Requests</CardTitle>
            <Link to="/resident/my-requests" className="text-sm font-bold text-primary hover:underline">View all</Link>
          </CardHeader>
          <CardContent className="p-0">
             {loading ? (
               <div className="flex h-32 items-center justify-center">
                 <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
               </div>
             ) : requests.length === 0 ? (
               <div className="p-8 text-center text-muted-foreground italic">No requests found.</div>
             ) : (
               <div className="divide-y border-t border-white/10">
                 {requests.slice(0, 4).map((r, i) => (
                   <div key={i} className="flex items-center justify-between p-4 hover:bg-accent/20 transition-colors">
                     <div className="flex items-center gap-4">
                       <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                         <Box className="h-5 w-5 text-muted-foreground" />
                       </div>
                       <div className="flex flex-col">
                         <span className="font-bold">{r.itemName}</span>
                         <span className="text-xs text-muted-foreground">Borrowed on {new Date(r.createdAt).toLocaleDateString()}</span>
                       </div>
                     </div>
                     <Badge variant={r.status === 'Pending' ? 'secondary' : r.status === 'Approved' ? 'default' : 'destructive'}>
                       {r.status}
                     </Badge>
                   </div>
                 ))}
               </div>
             )}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <div className="glass-card rounded-3xl p-8 bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-500/20">
             <h3 className="text-xl font-bold mb-2">How to Borrow?</h3>
             <p className="text-white/80 text-sm mb-6 leading-relaxed">Ensure you have a valid ID ready for document submission before requesting an item.</p>
             <Link to="/how-to-borrow" className="flex items-center gap-2 font-bold text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-all w-fit">
               Learn more <ArrowRight className="h-4 w-4" />
             </Link>
          </div>
          
          <Card className="glass-card border-none rounded-3xl">
             <CardHeader>
               <CardTitle className="text-lg">Need Assistance?</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Contact the municipal office for urgent requests or inventory inquiries.</p>
                <div className="flex flex-col gap-2">
                   <Button variant="outline" className="w-full justify-start gap-2 h-12 rounded-xl">
                      <FileText className="h-4 w-4" /> Policy PDF
                   </Button>
                </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
