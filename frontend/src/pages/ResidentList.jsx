import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash2 } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';

const ResidentList = () => {
  const [residents, setResidents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Edit Dialog State
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchResidents();
  }, []);

  const fetchResidents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/residents`);
      setResidents(response.data);
    } catch (error) {
      console.error('Error fetching residents:', error);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this resident?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/residents/${id}`);
        fetchResidents();
      } catch (error) {
        console.error('Error deleting resident:', error);
      }
    }
  };

  const handleEditClick = (resident) => {
    setEditData(resident);
    setOpenEdit(true);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/residents/${editData._id}`, editData);
      setOpenEdit(false);
      fetchResidents();
    } catch (error) {
      console.error('Error updating resident:', error);
    }
  };

  const filteredResidents = residents.filter(r => 
    `${r.firstName} ${r.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 text-foreground max-w-6xl mx-auto py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resident Directory</h1>
          <p className="text-muted-foreground">Manage registered residents of Barangay Ipil.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search residents..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-full border bg-background px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-64" 
            />
          </div>
        </div>
      </div>

      <div className="glass-card rounded-3xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-accent/50 text-xs uppercase font-bold text-muted-foreground">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Age</th>
                <th className="px-6 py-4">Gender</th>
                <th className="px-6 py-4">Occupation</th>
                <th className="px-6 py-4">Address</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y border-t border-white/10">
              {filteredResidents.length > 0 ? (
                filteredResidents.map((resident, i) => (
                  <motion.tr 
                    key={resident._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-accent/20 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium">${resident.firstName} ${resident.middleName ? resident.middleName + ' ' : ''}${resident.lastName}</td>
                    <td className="px-6 py-4 text-muted-foreground">${resident.age}</td>
                    <td className="px-6 py-4 text-muted-foreground">${resident.gender}</td>
                    <td className="px-6 py-4 text-muted-foreground">${resident.occupation || 'N/A'}</td>
                    <td className="px-6 py-4 text-muted-foreground truncate max-w-[200px]">${resident.address}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditClick(resident)} className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-500/10">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(resident._id)} className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground italic">No residents found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {openEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-xl rounded-3xl p-6 shadow-2xl bg-background"
          >
            <h2 className="text-xl font-bold mb-6">Edit Resident</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">First Name</label>
                <input className="w-full rounded-lg border bg-background px-3 py-2 text-sm" name="firstName" value={editData?.firstName || ''} onChange={handleEditChange} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Last Name</label>
                <input className="w-full rounded-lg border bg-background px-3 py-2 text-sm" name="lastName" value={editData?.lastName || ''} onChange={handleEditChange} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Age</label>
                <input type="number" className="w-full rounded-lg border bg-background px-3 py-2 text-sm" name="age" value={editData?.age || ''} onChange={handleEditChange} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Gender</label>
                <select className="w-full rounded-lg border bg-background px-3 py-2 text-sm" name="gender" value={editData?.gender || ''} onChange={handleEditChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Occupation</label>
                <input className="w-full rounded-lg border bg-background px-3 py-2 text-sm" name="occupation" value={editData?.occupation || ''} onChange={handleEditChange} />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Address</label>
                <input className="w-full rounded-lg border bg-background px-3 py-2 text-sm" name="address" value={editData?.address || ''} onChange={handleEditChange} />
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setOpenEdit(false)}>Cancel</Button>
              <Button onClick={handleEditSave}>Save Changes</Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ResidentList;
