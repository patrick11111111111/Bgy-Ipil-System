import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = () => {
  const location = useLocation();

  return (
    <Box sx={{ 
      display: 'flex', minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e0eafc 100%)',
      position: 'relative'
    }}>
      {/* Subtle Background Blobs for logged-in view */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        style={{ position: 'absolute', top: '10%', right: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(26,35,126,0.05) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%', pointerEvents: 'none' }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 2 }}
        style={{ position: 'absolute', bottom: '10%', left: '20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(249,168,37,0.08) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%', pointerEvents: 'none' }}
      />

      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 4, display: 'flex', flexDirection: 'column', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default Layout;
