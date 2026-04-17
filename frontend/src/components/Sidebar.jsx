import React, { useContext } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography, Divider, Button } from '@mui/material';
import { PersonAdd, People, Inventory, AccountCircle, ExitToApp } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const drawerWidth = 260;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const adminMenu = [
    { text: 'Registration Portal', icon: <PersonAdd />, path: '/admin' },
    { text: 'Resident List', icon: <People />, path: '/admin/residents' },
    { text: 'Inventory', icon: <Inventory />, path: '/admin/inventory' },
  ];

  const residentMenu = [
    { text: 'My Profile', icon: <AccountCircle />, path: '/resident' },
    { text: 'My Inventory', icon: <Inventory />, path: '/resident/inventory' },
  ];

  const menuItems = user?.role === 'admin' ? adminMenu : residentMenu;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e0e0e0',
          display: 'flex',
          flexDirection: 'column'
        },
      }}
    >
      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box
          sx={{
            width: 100, height: 100, borderRadius: '50%', backgroundColor: '#f5f5f5',
            display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2,
            overflow: 'hidden', border: '2px solid #f9a825'
          }}
        >
          <img src="/logo.jpg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
        </Box>
        <Typography variant="h6" color="primary" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Barangay Ipil
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          {user?.role === 'admin' ? 'Admin Portal' : 'Resident Portal'}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Logged in as: {user?.username}
        </Typography>
      </Box>
      <Divider />
      <List sx={{ pt: 2, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/admin' && item.path !== '/resident' && location.pathname.startsWith(item.path));
          return (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                mx: 1, borderRadius: 2, mb: 1,
                backgroundColor: isActive ? 'rgba(26, 35, 126, 0.1)' : 'transparent',
                color: isActive ? 'primary.main' : 'text.primary',
                borderRight: isActive ? '4px solid #f9a825' : '4px solid transparent',
                '&:hover': { backgroundColor: 'rgba(26, 35, 126, 0.05)' }
              }}
            >
              <ListItemIcon sx={{ color: isActive ? 'primary.main' : 'text.secondary', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: isActive ? 600 : 400 }} />
            </ListItem>
          );
        })}
      </List>
      <Box sx={{ p: 2 }}>
        <Button variant="outlined" color="error" fullWidth startIcon={<ExitToApp />} onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
