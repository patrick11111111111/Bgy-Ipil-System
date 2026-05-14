import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const AdminBorrowRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/borrow`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/borrow/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchRequests();
    } catch (error) {
      console.error('Error updating request status:', error);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" color="primary" fontWeight="bold" sx={{ mb: 4 }}>
        Borrow Requests Management
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ bgcolor: 'rgba(26, 35, 126, 0.05)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Resident</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Item Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Request Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody component={motion.tbody}>
            <AnimatePresence>
              {requests.length > 0 ? (
                requests.map((req) => (
                  <TableRow key={req._id} component={motion.tr} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <TableCell>{req.userId ? req.userId.username : 'Unknown User'}</TableCell>
                    <TableCell>{req.itemId ? req.itemId.itemName : 'Unknown Item'}</TableCell>
                    <TableCell>{new Date(req.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Typography fontWeight="bold" color={
                        req.status === 'Approved' ? 'success.main' : 
                        req.status === 'Rejected' ? 'error.main' : 'warning.main'
                      }>
                        {req.status}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      {req.status === 'Pending' && (
                        <>
                          <IconButton color="success" onClick={() => handleStatusChange(req._id, 'Approved')}>
                            <CheckCircle />
                          </IconButton>
                          <IconButton color="error" onClick={() => handleStatusChange(req._id, 'Rejected')}>
                            <Cancel />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    No borrow requests found.
                  </TableCell>
                </TableRow>
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminBorrowRequests;
