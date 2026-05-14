import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const ResidentMyRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const fetchMyRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/borrow/my-requests`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'success.main';
      case 'Rejected': return 'error.main';
      default: return 'warning.main';
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 1000, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" color="primary" fontWeight="bold">
          My Requests
        </Typography>
        <Button variant="outlined" onClick={() => navigate('/resident')}>
          Back to Dashboard
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ bgcolor: 'rgba(26, 35, 126, 0.05)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Item Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Request Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.length > 0 ? (
              requests.map((req) => (
                <TableRow key={req._id} component={motion.tr} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <TableCell>{req.itemId ? req.itemId.itemName : 'Unknown Item'}</TableCell>
                  <TableCell>{new Date(req.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Typography fontWeight="bold" color={getStatusColor(req.status)}>
                      {req.status}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                  You have not made any borrow requests yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ResidentMyRequests;
