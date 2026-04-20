import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card' // Wait, I need to create the UI components too

const AdminDashboard = () => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of municipal borrowing activity and system status.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Active Requests', value: '12', description: 'Pending approval', trend: '+2 this week' },
          { title: 'Total Items', value: '45', description: 'Across all categories', trend: 'Stable' },
          { title: 'Active Borrowers', value: '28', description: 'Registered residents', trend: '+5 this month' },
          { title: 'Completion Rate', value: '94%', description: 'Successful returns', trend: '+1.2%' },
        ].map((stat, i) => (
          <Card key={i} className="glass-card border-none shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              <div className="mt-4 text-xs font-bold text-emerald-500">{stat.trend}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="glass-card border-none">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { user: 'Juan Dela Cruz', action: 'Requested Foldable Tent', time: '2 hours ago', status: 'Pending' },
                { user: 'Maria Santos', action: 'Returned Plastic Chairs', time: '5 hours ago', status: 'Completed' },
                { user: 'Pedro Penduko', action: 'Requested Sound System', time: 'Yesterday', status: 'Approved' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold">{activity.user}</span>
                    <span className="text-xs text-muted-foreground">{activity.action}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground">{activity.time}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      activity.status === 'Pending' ? 'bg-amber-500/10 text-amber-600' :
                      activity.status === 'Approved' ? 'bg-blue-500/10 text-blue-600' :
                      'bg-emerald-500/10 text-emerald-600'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="rounded-3xl bg-primary p-8 text-primary-foreground flex flex-col justify-between shadow-2xl shadow-primary/20">
          <div>
            <h3 className="text-2xl font-bold mb-2">Municipal Notice</h3>
            <p className="text-primary-foreground/80">New guidelines for community resource usage will be effective starting next month. Please ensure all residents are updated.</p>
          </div>
          <button className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-bold text-primary transition-all hover:scale-105 active:scale-95">
            Share Announcement
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
