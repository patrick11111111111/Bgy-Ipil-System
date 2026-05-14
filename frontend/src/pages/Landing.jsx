import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Landing = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      // Assuming public endpoint or we just use the same inventory route
      // Wait, standard inventory route requires auth. Let me use public or just fetch what we can.
      // If we don't have a public endpoint, we should create one. For now, try fetching, if it fails, show placeholders.
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/inventory/public`);
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching public inventory:', error);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f5f7fa' }}>
      {/* Hero Section */}
      <Box sx={{ 
        bgcolor: '#1a237e', color: 'white', py: 8, textAlign: 'center',
        background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)'
      }}>
        <Container maxWidth="md">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Box sx={{ width: 100, height: 100, mx: 'auto', mb: 3, borderRadius: '50%', overflow: 'hidden', border: '4px solid #f9a825' }}>
              <img src="/logo.jpg" alt="Barangay Ipil Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
            </Box>
            <Typography variant="h2" fontWeight="bold" gutterBottom>
              Barangay Ipil Resident Portal
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Access municipal services, check available items, and manage your resident profile online.
            </Typography>
            <Button variant="contained" color="warning" size="large" onClick={() => navigate('/login')} sx={{ mr: 2, fontWeight: 'bold' }}>
              Login
            </Button>
            <Button variant="outlined" sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: '#f9a825', color: '#f9a825' } }} size="large" onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
          </motion.div>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 6 }}>
        
        {/* How it Works Section */}
        <Box id="how-it-works" sx={{ mb: 8 }}>
          <Typography variant="h4" color="primary" fontWeight="bold" align="center" gutterBottom>
            How It Works
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {['Register an Account', 'Browse Available Items', 'Submit a Borrow Request', 'Admin Verification'].map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%', textAlign: 'center', p: 2, borderTop: '4px solid #f9a825' }}>
                  <CardContent>
                    <Typography variant="h3" color="textSecondary" sx={{ opacity: 0.5, mb: 1 }}>{index + 1}</Typography>
                    <Typography variant="h6" color="primary" fontWeight="bold">{step}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Check what's available / Municipal Inventory */}
        <Box id="available-items" sx={{ mb: 8 }}>
          <Typography variant="h4" color="primary" fontWeight="bold" align="center" gutterBottom>
            Available Items
          </Typography>
          <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 4 }}>
            Check what's available to borrow from the municipal inventory.
          </Typography>
          
          <Grid container spacing={4}>
            {inventory.length > 0 ? (
              inventory.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item._id}>
                  <Card>
                    {item.image && (
                      <Box sx={{ height: 200, width: '100%', bgcolor: '#eee' }}>
                        <img src={item.image} alt={item.itemName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </Box>
                    )}
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" color="primary">{item.itemName}</Typography>
                      <Typography variant="body2" color="textSecondary">Quantity: {item.quantity}</Typography>
                      <Typography variant="body2" color={item.condition === 'Good' ? 'success.main' : 'error.main'}>
                        Condition: {item.condition}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'rgba(26, 35, 126, 0.05)' }}>
                  <Typography variant="body1" color="textSecondary">
                    Login to view the full inventory or check back later for updates.
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>

        {/* Inventory Dashboard Screenshot Placeholder */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
           <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
            Inventory Dashboard Overview
          </Typography>
          <Paper sx={{ p: 4, bgcolor: '#e0e0e0', border: '2px dashed #9e9e9e', borderRadius: 2, minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body1" color="textSecondary">
              [ Placeholder for Inventory Dashboard Screenshot - Input Image Here ]
            </Typography>
          </Paper>
        </Box>

        {/* How to Borrow */}
        <Box id="how-to-borrow" sx={{ mb: 8 }}>
          <Typography variant="h4" color="primary" fontWeight="bold" align="center" gutterBottom>
            How to Borrow
          </Typography>
          <Paper sx={{ p: 4, borderLeft: '6px solid #1a237e' }}>
            <Typography variant="body1" paragraph>
              1. <strong>Sign In</strong> to your Resident Portal account.
            </Typography>
            <Typography variant="body1" paragraph>
              2. Navigate to <strong>Available Items</strong> from the sidebar.
            </Typography>
            <Typography variant="body1" paragraph>
              3. Select the item you need and click <strong>Request to Borrow</strong>.
            </Typography>
            <Typography variant="body1">
              4. Wait for the Admin to verify and approve your request. You can check the status in <strong>My Requests</strong>.
            </Typography>
            <Box sx={{ mt: 3 }}>
               <Button variant="outlined" color="primary" onClick={() => window.scrollTo(0, 0)}>
                 Back to Home
               </Button>
            </Box>
          </Paper>
        </Box>

      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: '#1a237e', color: 'white', py: 3, textAlign: 'center', mt: 'auto' }}>
        <Typography variant="body2">
          © 2026 Barangay Ipil. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Landing;
