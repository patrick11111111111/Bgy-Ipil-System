import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e', // Official Blue
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#b71c1c', // Barangay Red/Brown
    },
    warning: {
      main: '#f9a825', // Barangay Gold
    },
    background: {
      default: '#f5f5f5', // light grays
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 15px rgba(26, 35, 126, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 8px 32px rgba(0,0,0,0.08)',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          transition: 'all 0.2s ease-in-out',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1a237e', // Blue border on focus
            borderWidth: 2,
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRight: '1px solid rgba(255,255,255,0.5)',
        }
      }
    }
  },
});

export default theme;
