import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Package, 
  AlertCircle,
  Image as ImageIcon,
  CheckCircle2,
  X
} from 'lucide-react'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Badge } from '../../components/ui/badge'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../../components/ui/table'

const InventoryManagement = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newItem, setNewItem] = useState({
    itemName: '',
    quantity: '',
    condition: 'Good',
    description: '',
    picture: ''
  })

  useEffect(() => {
    fetchInventory()
  }, [])

  const fetchInventory = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/inventory`)
      setItems(response.data)
    } catch (err) {
      console.error("Error fetching inventory:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    try {
      // In this system, 'Inventory' model is used for requests but we'll use it 
      // for the catalog too if we have to. 
      // We map description and picture as part of a "mocked" extension since backend is immutable.
      const payload = {
        ...newItem,
        presentedBy: 'Admin (Catalog)', // required field in backend
        status: 'Approved' // Admin added items are auto-approved for catalog
      }
      await axios.post(`${import.meta.env.VITE_API_URL}/api/inventory`, payload)
      fetchInventory()
      setIsModalOpen(false)
      setNewItem({ itemName: '', quantity: '', condition: 'Good', description: '', picture: '' })
    } catch (err) {
      console.error("Error adding item:", err)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/inventory/${id}`)
        fetchInventory()
      } catch (err) {
        console.error("Error deleting item:", err)
      }
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground">Add and manage municipal resources available for borrowing.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="rounded-full gap-2">
          <Plus className="h-4 w-4" /> Add New Item
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Items', value: items.length, icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Available', value: items.filter(i => i.quantity > 0).length, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Damaged', value: items.filter(i => i.condition === 'Damaged').length, icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-500/10' },
          { label: 'Total Stock', value: items.reduce((acc, i) => acc + (parseInt(i.quantity) || 0), 0), icon: Plus, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
        ].map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <div className={`rounded-md p-1 ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">Loading inventory...</TableCell>
                </TableRow>
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">No items in catalog.</TableCell>
                </TableRow>
              ) : (
                items.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-bold">{item.itemName}</TableCell>
                    <TableCell>
                      <Badge variant={item.condition === 'Good' ? 'default' : 'destructive'}>
                        {item.condition}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item._id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-card rounded-3xl p-8 shadow-2xl border"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Add New Municipal Item</h2>
              <button onClick={() => setIsModalOpen(false)} className="rounded-full p-1 hover:bg-accent"><X className="h-5 w-5" /></button>
            </div>

            <form onSubmit={handleAdd} className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Item Name</label>
                  <Input 
                    required 
                    placeholder="e.g. Foldable Tent"
                    value={newItem.itemName}
                    onChange={e => setNewItem({...newItem, itemName: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Quantity</label>
                    <Input 
                      required 
                      type="number"
                      placeholder="0"
                      value={newItem.quantity}
                      onChange={e => setNewItem({...newItem, quantity: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Condition</label>
                    <select 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      value={newItem.condition}
                      onChange={e => setNewItem({...newItem, condition: e.target.value})}
                    >
                      <option value="Good">Good</option>
                      <option value="Damaged">Damaged</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Description</label>
                  <textarea 
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Brief description of the item..."
                    value={newItem.description}
                    onChange={e => setNewItem({...newItem, description: e.target.value})}
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" /> Item Picture URL
                  </label>
                  <Input 
                    placeholder="https://..."
                    value={newItem.picture}
                    onChange={e => setNewItem({...newItem, picture: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="outline" type="button" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" className="flex-1 text-foreground">Save to Inventory</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default InventoryManagement
