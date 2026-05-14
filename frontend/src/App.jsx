import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Admin Pages
import RegistrationPortal from './pages/RegistrationPortal';
import ResidentList from './pages/ResidentList';
import InventoryDashboard from './pages/InventoryDashboard';
import AdminBorrowRequests from './pages/AdminBorrowRequests';

// Resident Pages
import ResidentProfile from './pages/resident/ResidentProfile';
import ResidentAvailableItems from './pages/resident/ResidentAvailableItems';
import ResidentMyRequests from './pages/resident/ResidentMyRequests';
import ResidentHowToBorrow from './pages/resident/ResidentHowToBorrow';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><Layout /></ProtectedRoute>}>
              <Route index element={<RegistrationPortal />} />
              <Route path="residents" element={<ResidentList />} />
              <Route path="inventory" element={<InventoryDashboard />} />
              <Route path="requests" element={<AdminBorrowRequests />} />
            </Route>

            {/* Resident Routes */}
            <Route path="/resident" element={<ProtectedRoute allowedRoles={['resident']}><Layout /></ProtectedRoute>}>
              <Route index element={<ResidentProfile />} />
              <Route path="available-items" element={<ResidentAvailableItems />} />
              <Route path="my-requests" element={<ResidentMyRequests />} />
              <Route path="how-to-borrow" element={<ResidentHowToBorrow />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
