import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ResidentHowToBorrow = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" color="primary" fontWeight="bold">
          How to Borrow
        </Typography>
        <Button variant="outlined" onClick={() => navigate('/resident')}>
          Back to Dashboard
        </Button>
      </Box>

      <Paper sx={{ p: 4, borderLeft: '6px solid #f9a825' }}>
        <Typography variant="body1" paragraph fontSize="1.1rem">
          Welcome to the Municipal Borrowing System. Here is how you can request to borrow an item:
        </Typography>
        <Typography variant="body1" paragraph fontSize="1.1rem">
          <strong>Step 1:</strong> Go to the <em>Available Items</em> page from your sidebar.
        </Typography>
        <Typography variant="body1" paragraph fontSize="1.1rem">
          <strong>Step 2:</strong> Browse the available municipal inventory. When you find what you need, click the <em>Continue to Verification</em> button on the item card.
        </Typography>
        <Typography variant="body1" paragraph fontSize="1.1rem">
          <strong>Step 3:</strong> Your request will be sent to the Barangay Admin for verification.
        </Typography>
        <Typography variant="body1" paragraph fontSize="1.1rem">
          <strong>Step 4:</strong> Check the <em>My Requests</em> page to see if your request has been <strong>Approved</strong> or <strong>Rejected</strong>.
        </Typography>
        <Typography variant="body1" fontSize="1.1rem" color="textSecondary" sx={{ mt: 3 }}>
          * Make sure to return the items in good condition once you are done using them.
        </Typography>
      </Paper>
    </Box>
  );
};

export default ResidentHowToBorrow;
