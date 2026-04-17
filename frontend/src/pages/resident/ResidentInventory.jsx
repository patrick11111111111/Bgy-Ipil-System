import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3 } }
};

const ResidentInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [formData, setFormData] = useState({
    itemName: '',
    condition: 'Good',
    quantity: '',
    presentedBy: '', 
  });

  useEffect(() => {
    fetchMyInventory();
  }, []);

  const fetchMyInventory = async () => {
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
      fetchMyInventory();
    } catch (error) {
      console.error('Error adding inventory request:', error);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Typography variant="h4" color="primary" sx={{ mb: 4, fontWeight: 'bold' }}>My Inventory Requests</Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card sx={{ borderTop: '4px solid #f9a825' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary" fontWeight="bold">Request to Add Asset</Typography>
                <form onSubmit={handleSubmit}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    <TextField required fullWidth label="Item Name" name="itemName" value={formData.itemName} onChange={handleChange} />
                    <TextField required fullWidth type="number" label="Quantity" name="quantity" value={formData.quantity} onChange={handleChange} />
                    <TextField select required fullWidth label="Condition" name="condition" value={formData.condition} onChange={handleChange}>
                      <MenuItem value="Good">Good</MenuItem>
                      <MenuItem value="Damaged">Damaged</MenuItem>
                    </TextField>
                    <TextField required fullWidth label="Presented By" name="presentedBy" value={formData.presentedBy} onChange={handleChange} />
                    <Button type="submit" variant="contained" color="warning" fullWidth size="large">
                      Submit Request
                    </Button>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={8}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: '#1a237e' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Item Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Quantity</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Condition</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody component={motion.tbody} variants={containerVariants} initial="hidden" animate="show">
                {inventory.length > 0 ? (
                  inventory.map((item) => (
                    <TableRow key={item._id} component={motion.tr} variants={itemVariants} hover>
                      <TableCell>{item.itemName}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.condition}</TableCell>
                      <TableCell>
                        <Box component="span" sx={{ 
                          px: 2, py: 0.5, borderRadius: 1, fontSize: '0.85rem', fontWeight: 'bold',
                          backgroundColor: item.status === 'Approved' ? 'rgba(76, 175, 80, 0.1)' : (item.status === 'Rejected' ? 'rgba(183, 28, 28, 0.1)' : 'rgba(249, 168, 37, 0.1)'),
                          color: item.status === 'Approved' ? '#4caf50' : (item.status === 'Rejected' ? '#b71c1c' : '#f9a825')
                        }}>
                          {item.status}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 3 }}>No requests found.</TableCell>
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

export default ResidentInventory;
