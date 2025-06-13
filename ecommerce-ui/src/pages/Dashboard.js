import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  ShoppingCart,
  TrendingUp,
  People,
  LocalShipping,
  AttachMoney,
  Inventory
} from '@mui/icons-material';

// Mock data
const stats = [
  {
    title: 'Total Orders',
    value: '1,247',
    growth: '+12%',
    icon: <ShoppingCart />,
    color: '#1976d2',
    bgColor: '#e3f2fd'
  },
  {
    title: 'Revenue',
    value: '₹2.4M',
    growth: '+23%',
    icon: <AttachMoney />,
    color: '#2e7d32',
    bgColor: '#e8f5e8'
  },
  {
    title: 'Customers',
    value: '892',
    growth: '+8%',
    icon: <People />,
    color: '#ed6c02',
    bgColor: '#fff3e0'
  },
  {
    title: 'Products',
    value: '156',
    growth: '+5%',
    icon: <Inventory />,
    color: '#9c27b0',
    bgColor: '#f3e5f5'
  }
];

const recentOrders = [
  { id: 'ORD001', customer: 'Aditya Miriyala', total: '₹82,100', status: 'PENDING' },
  { id: 'ORD002', customer: 'Priya Sharma', total: '₹45,500', status: 'SHIPPED' },
  { id: 'ORD003', customer: 'Rahul Kumar', total: '₹67,800', status: 'DELIVERED' },
  { id: 'ORD004', customer: 'Sneha Patel', total: '₹23,400', status: 'PENDING' },
  { id: 'ORD005', customer: 'Arjun Singh', total: '₹91,200', status: 'SHIPPED' }
];

const StatCard = ({ stat }) => (
  <Card sx={{ 
    height: '100%',
    background: `linear-gradient(135deg, ${stat.bgColor} 0%, ${stat.color}15 100%)`,
    border: `1px solid ${stat.color}20`,
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: `0 8px 25px ${stat.color}20`
    }
  }}>
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography color="textSecondary" gutterBottom variant="body2">
            {stat.title}
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: stat.color }}>
            {stat.value}
          </Typography>
          <Box display="flex" alignItems="center" mt={1}>
            <TrendingUp sx={{ color: '#2e7d32', fontSize: 16, mr: 0.5 }} />
            <Typography variant="body2" sx={{ color: '#2e7d32', fontWeight: 500 }}>
              {stat.growth}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ 
          p: 2, 
          borderRadius: '50%', 
          backgroundColor: stat.color,
          color: 'white'
        }}>
          {stat.icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const getStatusColor = (status) => {
  switch (status) {
    case 'PENDING': return 'warning';
    case 'SHIPPED': return 'info';
    case 'DELIVERED': return 'success';
    default: return 'default';
  }
};

const Dashboard = () => {
  return (
    <Box>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom sx={{ 
          background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          fontWeight: 'bold'
        }}>
          📊 Dashboard Overview
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Welcome back! Here's what's happening with your e-commerce store today.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard stat={stat} />
          </Grid>
        ))}
      </Grid>

      {/* Charts and Tables Row */}
      <Grid container spacing={3}>
        {/* Recent Orders */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: 1,
                mb: 2
              }}>
                <LocalShipping color="primary" />
                Recent Orders
              </Typography>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>Order ID</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Customer</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow 
                        key={order.id} 
                        hover 
                        sx={{ '&:hover': { backgroundColor: '#f8f9fa' } }}
                      >
                        <TableCell sx={{ fontWeight: 500 }}>{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell sx={{ fontWeight: 500, color: '#2e7d32' }}>
                          {order.total}
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={order.status} 
                            color={getStatusColor(order.status)}
                            size="small"
                            sx={{ fontWeight: 500 }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: 1,
                mb: 2
              }}>
                📈 Quick Insights
              </Typography>
              
              <Box mb={3}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="body2">Order Completion Rate</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>87%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={87} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    bgcolor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: '#2e7d32'
                    }
                  }} 
                />
              </Box>

              <Box mb={3}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="body2">Customer Satisfaction</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>94%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={94} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    bgcolor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: '#1976d2'
                    }
                  }} 
                />
              </Box>

              <Box mb={3}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="body2">Inventory Turnover</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>76%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={76} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    bgcolor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: '#ed6c02'
                    }
                  }} 
                />
              </Box>

              <Box sx={{ 
                bgcolor: '#f8f9fa', 
                p: 2, 
                borderRadius: 2, 
                textAlign: 'center',
                mt: 2
              }}>
                <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                  ₹156K
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Average Monthly Revenue
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
