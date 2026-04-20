import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Users, Package, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'

const Reports = () => {
  const stats = [
    { label: 'Total Borrowers', value: '248', change: '+12%', trend: 'up', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Items in Use', value: '86', change: '+5%', trend: 'up', icon: Package, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Return Rate', value: '98.2%', change: '+0.4%', trend: 'up', icon: BarChart3, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Damaged Items', value: '3', change: '-1', trend: 'down', icon: TrendingUp, color: 'text-rose-500', bg: 'bg-rose-500/10' },
  ]

  return (
    <div className="flex flex-col gap-8 text-foreground">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground">Detailed insights into community borrowing patterns and inventory health.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {stat.change} {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              </div>
            </div>
            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="glass-card border-none rounded-3xl overflow-hidden">
          <CardHeader>
            <CardTitle>Most Borrowed Items</CardTitle>
          </CardHeader>
          <CardContent className="p-8 flex flex-col gap-6">
            {[
              { name: 'Plastic Chairs', count: 1240, progress: 85 },
              { name: 'Foldable Tables', count: 450, progress: 65 },
              { name: 'Tents', count: 120, progress: 45 },
              { name: 'Sound System', count: 85, progress: 30 },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span>{item.name}</span>
                  <span className="text-muted-foreground">{item.count} borrows</span>
                </div>
                <div className="h-2 w-full rounded-full bg-accent overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="glass-card rounded-3xl p-8 bg-primary text-primary-foreground flex flex-col justify-center items-center text-center gap-6">
           <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-md">
             <TrendingUp className="h-8 w-8" />
           </div>
           <div>
             <h3 className="text-2xl font-bold">Monthly Summary</h3>
             <p className="text-primary-foreground/70 mt-2">Community activity has increased by 15% this month compared to last month.</p>
           </div>
           <button className="rounded-full bg-white px-8 py-3 font-bold text-primary transition-all hover:scale-105">
             Export Detailed Report (PDF)
           </button>
        </div>
      </div>
    </div>
  )
}

export default Reports
