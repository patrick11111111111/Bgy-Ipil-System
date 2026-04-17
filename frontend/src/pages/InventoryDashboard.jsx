import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, IconButton } from '@mui/material';
import { Delete, CheckCircle, Cancel } from '@mui/icons-material';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const InventoryDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [formData, setFormData] = useState({
    itemName: '',
    condition: 'Good',
    quantity: '',
    presentedBy: '',
  });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/inventory`);
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/inventory`, formData);
      setFormData({ itemName: '', condition: 'Good', quantity: '', presentedBy: '' });
      fetchInventory();
    } catch (error) {
      console.error('Error adding inventory:', error);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/inventory/${id}`);
        fetchInventory();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/inventory/${id}/status`, { status });
      fetchInventory();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const approvedInventory = inventory.filter(i => i.status === 'Approved');
  const pendingInventory = inventory.filter(i => i.status === 'Pending');

  const totalItems = approvedInventory.reduce((acc, curr) => acc + curr.quantity, 0);
  const goodItems = approvedInventory.filter(i => i.condition === 'Good').reduce((acc, curr) => acc + curr.quantity, 0);
  const damagedItems = approvedInventory.filter(i => i.condition === 'Damaged').reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Typography variant="h4" color="primary" sx={{ mb: 4, fontWeight: 'bold' }}>Inventory Management</Typography>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card sx={{ borderLeft: '6px solid #1a237e', height: '100%', cursor: 'pointer' }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom fontWeight="bold">Total Approved Assets</Typography>
                <Typography variant="h3" color="primary" fontWeight="bold">{totalItems}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card sx={{ borderLeft: '6px solid #f9a825', height: '100%', cursor: 'pointer' }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom fontWeight="bold">Good Condition</Typography>
                <Typography variant="h3" sx={{ color: '#f9a825' }} fontWeight="bold">{goodItems}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card sx={{ borderLeft: '6px solid #b71c1c', height: '100%', cursor: 'pointer' }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom fontWeight="bold">Pending Requests</Typography>
                <Typography variant="h3" color="secondary" fontWeight="bold">{pendingInventory.length}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      <AnimatePresence>
        {pendingInventory.length > 0 && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} sx={{ mb: 4 }}>
            <Typography variant="h5" color="secondary" sx={{ mb: 2, fontWeight: 'bold' }}>Pending Requests</Typography>
            <TableContainer component={Paper} sx={{ borderTop: '4px solid #b71c1c', mb: 4 }}>
              <Table>
                <TableHead sx={{ backgroundColor: 'rgba(183, 28, 28, 0.05)' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Item Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Condition</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Requested By User</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody component={motion.tbody} variants={containerVariants} initial="hidden" animate="show">
                  {pendingInventory.map((item) => (
                    <TableRow key={item._id} component={motion.tr} variants={itemVariants} hover>
                      <TableCell>{item.itemName}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.condition}</TableCell>
                      <TableCell>{item.requestedBy ? item.requestedBy.username : 'Unknown'}</TableCell>
                      <TableCell align="right">
                        <IconButton color="success" onClick={() => handleStatusChange(item._id, 'Approved')}>
                          <CheckCircle />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleStatusChange(item._id, 'Rejected')}>
                          <Cancel />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </motion.div>
        )}
      </AnimatePresence>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderTop: '4px solid #1a237e' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary" fontWeight="bold">Add Asset Directly</Typography>
              <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                  <TextField required fullWidth label="Item Name" name="itemName" value={formData.itemName} onChange={handleChange} />
                  <TextField required fullWidth type="number" label="Quantity" name="quantity" value={formData.quantity} onChange={handleChange} />
                  <TextField select required fullWidth label="Condition" name="condition" value={formData.condition} onChange={handleChange}>
                    <MenuItem value="Good">Good</MenuItem>
                    <MenuItem value="Damaged">Damaged</MenuItem>
                  </TextField>
                  <TextField required fullWidth label="Presented By" name="presentedBy" value={formData.presentedBy} onChange={handleChange} />
                  <Button type="submit" variant="contained" color="primary" fullWidth size="large">
                    Add Item
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h5" color="primary" sx={{ mb: 2, fontWeight: 'bold' }}>Approved Inventory</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: 'rgba(26, 35, 126, 0.05)' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', color: '#1a237e' }}>Item Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#1a237e' }}>Quantity</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#1a237e' }}>Condition</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#1a237e' }}>Presented By</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#1a237e', textAlign: 'right' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody component={motion.tbody} variants={containerVariants} initial="hidden" animate="show">
                {approvedInventory.length > 0 ? (
                  approvedInventory.map((item) => (
                    <TableRow key={item._id} component={motion.tr} variants={itemVariants} hover>
                      <TableCell>{item.itemName}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <Box component="span" sx={{ 
                          px: 2, py: 0.5, borderRadius: 1, fontSize: '0.85rem', fontWeight: 'bold',
                          backgroundColor: item.condition === 'Good' ? 'rgba(249, 168, 37, 0.1)' : 'rgba(183, 28, 28, 0.1)',
                          color: item.condition === 'Good' ? '#f9a825' : '#b71c1c'
                        }}>
                          {item.condition}
                        </Box>
                      </TableCell>
                      <TableCell>{item.presentedBy || (item.requestedBy ? item.requestedBy.username : '')}</TableCell>
                      <TableCell sx={{ textAlign: 'right' }}>
                        <IconButton color="secondary" size="small" onClick={() => handleDelete(item._id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>No approved inventory items found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default InventoryDashboard;
