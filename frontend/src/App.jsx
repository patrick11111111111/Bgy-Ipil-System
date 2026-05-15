import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

import Layout from './components/Layout';
import PublicLayout from './components/PublicLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import BorrowRequestsManagement from './pages/admin/BorrowRequestsManagement';
import InventoryManagement from './pages/admin/InventoryManagement';
import Reports from './pages/admin/Reports';

// Resident/Public Pages
import AvailableItems from './pages/AvailableItems';
import ItemDetails from './pages/ItemDetails';
import HowToBorrow from './pages/HowToBorrow';
import BorrowRequest from './pages/resident/BorrowRequest';
import UserDashboard from './pages/resident/UserDashboard';
import MyRequests from './pages/resident/MyRequests';

// Old Pages (to be migrated/replaced)
import RegistrationPortal from './pages/RegistrationPortal';
import ResidentList from './pages/ResidentList';
import InventoryDashboard from './pages/InventoryDashboard';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="barangay-ui-theme">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes with Navbar */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/items" element={<AvailableItems />} />
              <Route path="/items/:id" element={<ItemDetails />} />
              <Route path="/how-to-borrow" element={<HowToBorrow />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><Layout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="requests" element={<BorrowRequestsManagement />} />
              <Route path="inventory" element={<InventoryManagement />} />
              <Route path="reports" element={<Reports />} />
              <Route path="residents" element={<ResidentList />} />
            </Route>

            {/* Resident Routes */}
            <Route path="/resident" element={<ProtectedRoute allowedRoles={['resident', 'admin']}><Layout /></ProtectedRoute>}>
              <Route index element={<UserDashboard />} />
              <Route path="borrow" element={<BorrowRequest />} />
              <Route path="my-requests" element={<MyRequests />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
