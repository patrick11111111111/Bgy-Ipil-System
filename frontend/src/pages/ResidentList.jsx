import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, InputAdornment, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, MenuItem } from '@mui/material';
import { Search, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.2 } }
};

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
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" color="primary" fontWeight="bold">Resident Directory</Typography>
        <TextField
          variant="outlined"
          placeholder="Search residents..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ borderTop: '4px solid #f9a825', borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1a237e' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Age</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Gender</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Occupation</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Address</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold', textAlign: 'right' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody component={motion.tbody} variants={containerVariants} initial="hidden" animate="show">
            {filteredResidents.length > 0 ? (
              filteredResidents.map((resident) => (
                <TableRow key={resident._id} component={motion.tr} variants={itemVariants} hover>
                  <TableCell>{`${resident.firstName} ${resident.middleName ? resident.middleName + ' ' : ''}${resident.lastName}`}</TableCell>
                  <TableCell>{resident.age}</TableCell>
                  <TableCell>{resident.gender}</TableCell>
                  <TableCell>{resident.occupation}</TableCell>
                  <TableCell>{resident.address}</TableCell>
                  <TableCell sx={{ textAlign: 'right' }}>
                    <IconButton color="primary" onClick={() => handleEditClick(resident)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(resident._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>No residents found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3, p: 1 } }}>
        <DialogTitle sx={{ color: '#1a237e', fontWeight: 'bold' }}>Edit Resident</DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {editData && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="First Name" name="firstName" value={editData.firstName} onChange={handleEditChange} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Middle Name" name="middleName" value={editData.middleName} onChange={handleEditChange} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Last Name" name="lastName" value={editData.lastName} onChange={handleEditChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth type="number" label="Age" name="age" value={editData.age} onChange={handleEditChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField select fullWidth label="Gender" name="gender" value={editData.gender} onChange={handleEditChange}>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Occupation" name="occupation" value={editData.occupation} onChange={handleEditChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Address" name="address" value={editData.address} onChange={handleEditChange} />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenEdit(false)} color="inherit" sx={{ fontWeight: 'bold' }}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary" sx={{ fontWeight: 'bold' }}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default ResidentList;
