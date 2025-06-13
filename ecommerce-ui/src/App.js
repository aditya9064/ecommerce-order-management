import React, { useState } from 'react';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// Import pages
import Dashboard from './pages/Dashboard';
import ProductCatalog from './pages/ProductCatalog';
import OrderManagement from './pages/OrderManagement';
import CustomerManagement from './pages/CustomerManagement';

// Professional theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      dark: '#115293',
      light: '#42a5f5'
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: '#2c3e50'
    },
    h6: {
      fontWeight: 500
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          borderRadius: '12px',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500
        }
      }
    }
  }
});

const drawerWidth = 260;

// Navigation items
const navigationItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Products', icon: <InventoryIcon />, path: '/products' },
  { text: 'Orders', icon: <ShoppingCartIcon />, path: '/orders' },
  { text: 'Customers', icon: <PeopleIcon />, path: '/customers' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

// Sidebar Component
function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, #1976d2 0%, #1565c0 100%)',
          color: 'white',
        },
      }}
    >
      <Toolbar sx={{ background: 'rgba(255,255,255,0.1)' }}>
        <Typography variant="h6" noWrap component="div" sx={{ 
          fontWeight: 'bold', 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          🛒 E-Commerce Pro
        </Typography>
      </Toolbar>
      
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
      
      <List sx={{ pt: 2 }}>
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem 
              button 
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                mx: 1,
                borderRadius: '8px',
                mb: 0.5,
                backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: '40px' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  '& .MuiTypography-root': { 
                    fontWeight: isActive ? 600 : 400 
                  } 
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}

// Top Bar Component
function TopBar({ onMenuClick, sidebarOpen }) {
  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: 'linear-gradient(90deg, #1976d2 0%, #1565c0 100%)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onMenuClick}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          E-Commerce Order Processing System
        </Typography>
        <Typography variant="body2" sx={{ 
          background: 'rgba(255,255,255,0.2)', 
          px: 2, 
          py: 0.5, 
          borderRadius: '20px' 
        }}>
          Welcome, Admin
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

// Main App Layout
function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: 'flex' }}>
      <TopBar 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
        sidebarOpen={sidebarOpen}
      />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          minHeight: '100vh',
          transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: sidebarOpen ? 0 : `-${drawerWidth}px`,
        }}
      >
        <Toolbar /> {/* Spacer for fixed AppBar */}
        
        <Box sx={{ p: 3 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductCatalog />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/customers" element={<CustomerManagement />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

// Main App Component
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppLayout />
      </Router>
    </ThemeProvider>
  );
}

export default App;
