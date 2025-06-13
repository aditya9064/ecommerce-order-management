import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Avatar,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  TextField,
  Chip,
  Fab,
  Tooltip
} from '@mui/material';
import {
  Visibility,
  Edit,
  Delete,
  Add,
  Search,
  Email,
  Phone,
  LocationOn
} from '@mui/icons-material';

// Mock customer data
const customers = [
  {
    id: 'C001',
    name: 'Aditya Miriyala',
    email: 'aditya@example.com',
    phone: '+91 9876543210',
    address: '123 Tech Street, Bangalore, Karnataka 560001',
    totalOrders: 5,
    totalSpent: 245000,
    joinDate: '2024-01-15',
    status: 'Active'
  },
  {
    id: 'C002',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 9876543211',
    address: '456 Mall Road, Delhi, Delhi 110001',
    totalOrders: 3,
    totalSpent: 156000,
    joinDate: '2024-02-20',
    status: 'Active'
  },
  {
    id: 'C003',
    name: 'Rahul Kumar',
    email: 'rahul@example.com',
    phone: '+91 9876543212',
    address: '789 Park Avenue, Mumbai, Maharashtra 400001',
    totalOrders: 7,
    totalSpent: 298000,
    joinDate: '2024-01-10',
    status: 'Active'
  },
  {
    id: 'C004',
    name: 'Sneha Patel',
    email: 'sneha@example.com',
    phone: '+91 9876543213',
    address: '321 Garden Street, Pune, Maharashtra 411001',
    totalOrders: 2,
    totalSpent: 45000,
    joinDate: '2024-03-05',
    status: 'Inactive'
  },
  {
    id: 'C005',
    name: 'Arjun Singh',
    email: 'arjun@example.com',
    phone: '+91 9876543214',
    address: '654 Business District, Chennai, Tamil Nadu 600001',
    totalOrders: 4,
    totalSpent: 189000,
    joinDate: '2024-02-12',
    status: 'Active'
  }
];

const getStatusColor = (status) => {
  return status === 'Active' ? 'success' : 'default';
};

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const CustomerManagement = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [addCustomerOpen, setAddCustomerOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  // Filter customers
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setDetailsOpen(true);
  };

  const handleAddCustomer = () => {
    // Generate new customer ID
    const newId = `C${String(customers.length + 1).padStart(3, '0')}`;
    const customerData = {
      id: newId,
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone,
      address: newCustomer.address,
      totalOrders: 0,
      totalSpent: 0,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    };
    
    // Add to customers array (in real app, this would be an API call)
    customers.push(customerData);
    
    // Reset form and close dialog
    setNewCustomer({ name: '', email: '', phone: '', address: '' });
    setAddCustomerOpen(false);
    
    console.log('New customer added:', customerData);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
          👥 Customer Management
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Manage customer information and track their purchase history.
        </Typography>
      </Box>

      {/* Search and Actions */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box display="flex" gap={2} justifyContent="flex-end">
              <Button variant="outlined" startIcon={<Email />}>
                Send Newsletter
              </Button>
              <Button 
                variant="contained" 
                startIcon={<Add />}
                onClick={() => setAddCustomerOpen(true)}
              >
                Add Customer
              </Button>
            </Box>
          </Grid>
        </Grid>
        
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary">
            Showing {filteredCustomers.length} of {customers.length} customers
          </Typography>
        </Box>
      </Paper>

      {/* Customer Stats */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary" gutterBottom>
                {customers.length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total Customers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.main" gutterBottom>
                {customers.filter(c => c.status === 'Active').length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Active Customers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="info.main" gutterBottom>
                ₹{(customers.reduce((sum, c) => sum + c.totalSpent, 0) / 1000).toFixed(0)}K
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total Revenue
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="warning.main" gutterBottom>
                {Math.round(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length / 1000)}K
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Avg. Order Value
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Customers Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Contact</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Orders</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Total Spent</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((customer) => (
                <TableRow 
                  key={customer.id} 
                  hover
                  sx={{ '&:hover': { backgroundColor: '#f8f9fa' } }}
                >
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ bgcolor: '#1976d2' }}>
                        {getInitials(customer.name)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {customer.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          ID: {customer.id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                        <Email fontSize="small" color="action" />
                        <Typography variant="body2">
                          {customer.email}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Phone fontSize="small" color="action" />
                        <Typography variant="body2">
                          {customer.phone}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {customer.totalOrders} orders
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#2e7d32' }}>
                      ₹{customer.totalSpent.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={customer.status}
                      color={getStatusColor(customer.status)}
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <Tooltip title="View Details">
                        <IconButton 
                          color="primary" 
                          size="small"
                          onClick={() => handleViewDetails(customer)}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Customer">
                        <IconButton color="secondary" size="small">
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Customer">
                        <IconButton color="error" size="small">
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredCustomers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Customer Details Dialog */}
      <Dialog 
        open={detailsOpen} 
        onClose={() => setDetailsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedCustomer && (
          <>
            <DialogTitle>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ bgcolor: '#1976d2', width: 56, height: 56 }}>
                  {getInitials(selectedCustomer.name)}
                </Avatar>
                <Box>
                  <Typography variant="h5">
                    {selectedCustomer.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Customer ID: {selectedCustomer.id}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                {/* Contact Information */}
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom color="primary">
                        📞 Contact Information
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <Email fontSize="small" />
                        <Typography variant="body2">{selectedCustomer.email}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <Phone fontSize="small" />
                        <Typography variant="body2">{selectedCustomer.phone}</Typography>
                      </Box>
                      <Box display="flex" alignItems="flex-start" gap={1}>
                        <LocationOn fontSize="small" />
                        <Typography variant="body2">{selectedCustomer.address}</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Purchase History */}
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom color="primary">
                        🛍️ Purchase History
                      </Typography>
                      <Box mb={2}>
                        <Typography variant="body2">
                          <strong>Total Orders:</strong> {selectedCustomer.totalOrders}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Total Spent:</strong> ₹{selectedCustomer.totalSpent.toLocaleString()}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Avg. Order Value:</strong> ₹{Math.round(selectedCustomer.totalSpent / selectedCustomer.totalOrders).toLocaleString()}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Join Date:</strong> {new Date(selectedCustomer.joinDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Chip 
                        label={selectedCustomer.status}
                        color={getStatusColor(selectedCustomer.status)}
                        sx={{ fontWeight: 500 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>

                {/* Customer Insights */}
                <Grid item xs={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom color="primary">
                        📊 Customer Insights
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                          <Box textAlign="center" p={2} bgcolor="#e3f2fd" borderRadius={2}>
                            <Typography variant="h4" color="primary">
                              {selectedCustomer.totalOrders > 5 ? 'VIP' : 'Regular'}
                            </Typography>
                            <Typography variant="body2">Customer Tier</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Box textAlign="center" p={2} bgcolor="#e8f5e8" borderRadius={2}>
                            <Typography variant="h4" color="success.main">
                              {Math.round((Date.now() - new Date(selectedCustomer.joinDate)) / (1000 * 60 * 60 * 24))}
                            </Typography>
                            <Typography variant="body2">Days Active</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Box textAlign="center" p={2} bgcolor="#fff3e0" borderRadius={2}>
                            <Typography variant="h4" color="warning.main">
                              {selectedCustomer.totalSpent > 100000 ? 'High' : selectedCustomer.totalSpent > 50000 ? 'Medium' : 'Low'}
                            </Typography>
                            <Typography variant="body2">Value Segment</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetailsOpen(false)}>Close</Button>
              <Button variant="outlined" startIcon={<Email />}>
                Send Email
              </Button>
              <Button variant="contained" startIcon={<Edit />}>
                Edit Customer
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Floating Action Button */}
      <Fab 
        color="primary" 
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setAddCustomerOpen(true)}
      >
        <Add />
      </Fab>

      {/* Add Customer Dialog */}
      <Dialog 
        open={addCustomerOpen} 
        onClose={() => setAddCustomerOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5">
            👤 Add New Customer
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                placeholder="+91 9876543210"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={3}
                value={newCustomer.address}
                onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                placeholder="Street, City, State, PIN Code"
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddCustomerOpen(false)}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleAddCustomer}
            disabled={!newCustomer.name || !newCustomer.email || !newCustomer.phone || !newCustomer.address}
          >
            Add Customer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomerManagement;
