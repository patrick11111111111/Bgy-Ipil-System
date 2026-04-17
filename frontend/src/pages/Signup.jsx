import React, { useState, useContext } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Grid, MenuItem, Alert } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [residentData, setResidentData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    age: '',
    gender: '',
    address: 'Echague, Isabela',
    occupation: '',
  });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleResidentChange = (e) => {
    setResidentData({ ...residentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        username,
        password,
        role: 'resident',
        residentData
      });
      await login(username, password);
      navigate('/resident');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', 
      background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', py: 4 
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '850px', padding: '20px' }}
      >
        <Card sx={{ width: '100%', borderTop: '6px solid #f9a825', borderRadius: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
                Join Barangay Ipil
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Create an account to access the Resident Portal
              </Typography>
            </Box>

            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
              </motion.div>
            )}

            <form onSubmit={handleSubmit}>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <Typography variant="h6" sx={{ mb: 2, color: '#1a237e', borderBottom: '2px solid #f5f5f5', pb: 1 }}>Account Credentials</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth required label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth required type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Grid>
                </Grid>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <Typography variant="h6" sx={{ mt: 4, mb: 2, color: '#1a237e', borderBottom: '2px solid #f5f5f5', pb: 1 }}>Personal Information</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <TextField fullWidth required label="First Name" name="firstName" value={residentData.firstName} onChange={handleResidentChange} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="Middle Name" name="middleName" value={residentData.middleName} onChange={handleResidentChange} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField fullWidth required label="Last Name" name="lastName" value={residentData.lastName} onChange={handleResidentChange} />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth required type="number" label="Age" name="age" value={residentData.age} onChange={handleResidentChange} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField select fullWidth required label="Gender" name="gender" value={residentData.gender} onChange={handleResidentChange}>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth required label="Occupation" name="occupation" value={residentData.occupation} onChange={handleResidentChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth required label="Address" name="address" value={residentData.address} onChange={handleResidentChange} />
                  </Grid>
                </Grid>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Button type="submit" variant="contained" color="warning" fullWidth sx={{ mt: 5, py: 1.5, fontSize: '1.1rem', fontWeight: 'bold' }}>
                  Create Account & Register
                </Button>
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Typography variant="body2" color="textSecondary">
                    Already have an account? <Link to="/login" style={{ color: '#1a237e', fontWeight: 'bold', textDecoration: 'none' }}>Login</Link>
                  </Typography>
                </Box>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Signup;
