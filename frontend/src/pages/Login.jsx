import React, { useState, useContext } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Alert } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(username, password);
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/resident');
      }
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', 
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        position: 'relative', overflow: 'hidden'
      }}
    >
      {/* Decorative Background Elements */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        style={{ position: 'absolute', top: '-10%', left: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(249,168,37,0.15) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%' }}
      />
      <motion.div
        animate={{ y: [0, 30, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
        style={{ position: 'absolute', bottom: '-15%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(26,35,126,0.1) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ zIndex: 1, width: '100%', display: 'flex', justifyContent: 'center', padding: '20px' }}
      >
        <Card sx={{ maxWidth: 420, width: '100%', borderTop: '6px solid #1a237e', p: 3, backdropFilter: 'blur(20px)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
            >
              <Box sx={{ 
                width: 90, height: 90, borderRadius: '50%', overflow: 'hidden', 
                border: '3px solid #f9a825', boxShadow: '0 8px 16px rgba(249,168,37,0.3)' 
              }}>
                 <img src="/logo.jpg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
              </Box>
            </motion.div>
          </Box>
          <Typography variant="h5" align="center" color="primary" gutterBottom fontWeight="bold">
            Bgy. Ipil Portal
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary" sx={{ mb: 3 }}>
            Secure login for residents and administrators.
          </Typography>
          
          <CardContent sx={{ p: 0 }}>
            {error && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>
              </motion.div>
            )}
            <form onSubmit={handleSubmit}>
              <TextField fullWidth label="Username" margin="normal" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} required />
              <TextField fullWidth label="Password" type="password" margin="normal" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 4, py: 1.5, fontSize: '1rem' }}>
                Sign In
              </Button>
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="textSecondary">
                  Don't have an account? <Link to="/signup" style={{ color: '#1a237e', fontWeight: 'bold', textDecoration: 'none' }}>Sign Up here</Link>
                </Typography>
              </Box>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Login;
