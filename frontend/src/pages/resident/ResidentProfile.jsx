import React, { useContext, useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Grid, MenuItem, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const ResidentProfile = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (user.residentId) {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/residents/${user.residentId}`);
          setFormData(res.data);
        }
      } catch (err) {
        setSnackbar({ open: true, message: 'Failed to load profile', severity: 'error' });
      }
    };
    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/residents/${user.residentId}`, formData);
      setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to update profile.', severity: 'error' });
    }
  };

  if (!formData) return <Typography>Loading profile...</Typography>;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" color="primary" sx={{ mb: 4 }}>My Profile</Typography>
      <Card sx={{ maxWidth: 800, borderTop: '4px solid #1a237e' }}>
        <CardContent>
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
                <TextField fullWidth required label="Address" name="address" value={formData.address} onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">Update Profile</Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ResidentProfile;
