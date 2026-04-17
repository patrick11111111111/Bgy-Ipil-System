import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Grid, MenuItem, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';

const RegistrationPortal = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    age: '',
    gender: '',
    address: 'Echague, Isabela',
    occupation: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/residents`, formData);
      setSnackbar({ open: true, message: 'Resident registered successfully!', severity: 'success' });
      setFormData({
        firstName: '',
        middleName: '',
        lastName: '',
        age: '',
        gender: '',
        address: 'Echague, Isabela',
        occupation: '',
      });
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to register resident.', severity: 'error' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
        <Card sx={{ maxWidth: 800, width: '100%', borderTop: '6px solid #f9a825', position: 'relative', overflow: 'visible', mt: 6 }}>
          {/* Logo at top center of card */}
          <Box 
            sx={{ 
              position: 'absolute', top: -50, left: '50%', transform: 'translateX(-50%)',
              width: 80, height: 80, borderRadius: '50%', backgroundColor: '#ffffff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 16px rgba(0,0,0,0.15)', border: '3px solid #1a237e', zIndex: 1, overflow: 'hidden'
            }}
          >
            <img src="/logo.jpg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
          </Box>

          <CardContent sx={{ pt: 6, px: 4, pb: 4 }}>
            <Typography variant="h5" component="h2" align="center" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
              Resident Registration Portal
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 4 }}>
              Enter the details of the resident to register them in the Barangay Ipil database.
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth required label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth required label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth required type="number" label="Age" name="age" value={formData.age} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField select fullWidth required label="Gender" name="gender" value={formData.gender} onChange={handleChange}>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth required label="Occupation" name="occupation" value={formData.occupation} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth required label="Address" name="address" value={formData.address} onChange={handleChange} helperText="Context: Echague, Isabela" />
                </Grid>

                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Button type="submit" variant="contained" color="primary" fullWidth size="large" sx={{ py: 1.5 }}>
                    Register Resident
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>

        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </motion.div>
  );
};

export default RegistrationPortal;
