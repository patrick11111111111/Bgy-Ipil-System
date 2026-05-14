import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Paper, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const ResidentAvailableItems = () => {
  const [inventory, setInventory] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchPublicInventory();
  }, []);

  const fetchPublicInventory = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/inventory/public`);
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const handleBorrowRequest = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/borrow`,
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSnackbar({ open: true, message: 'Borrow request sent to Admin for verification!', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to send borrow request.', severity: 'error' });
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" color="primary" fontWeight="bold">
          Available Items
        </Typography>
        <Button variant="outlined" onClick={() => navigate('/resident')}>
          Back to Dashboard
        </Button>
      </Box>

      <Grid container spacing={4}>
        {inventory.length > 0 ? (
          inventory.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <motion.div whileHover={{ y: -5 }}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {item.image && (
                    <Box sx={{ height: 200, width: '100%', bgcolor: '#f5f5f5' }}>
                      <img src={item.image} alt={item.itemName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>{item.itemName}</Typography>
                    <Typography variant="body2" color="textSecondary" mb={1}>Quantity Available: {item.quantity}</Typography>
                    <Typography variant="body2" color={item.condition === 'Good' ? 'success.main' : 'error.main'} mb={2}>
                      Condition: {item.condition}
                    </Typography>
                    
                    <Button 
                      variant="contained" 
                      color="primary" 
                      fullWidth 
                      onClick={() => handleBorrowRequest(item._id)}
                    >
                      Continue to Verification
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'rgba(26, 35, 126, 0.05)' }}>
              <Typography variant="body1" color="textSecondary">
                No items are currently available for borrowing.
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ResidentAvailableItems;
