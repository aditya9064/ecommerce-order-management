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
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab,
  Tooltip
} from '@mui/material';
import {
  Visibility,
  Edit,
  LocalShipping,
  Add,
  Search,
  FilterList,
  GetApp,
  Print,
  Delete
} from '@mui/icons-material';

// Mock order data
const orders = [
  {
    id: 'ORD001',
    customerName: 'Aditya Miriyala',
    customerEmail: 'aditya@example.com',
    customerAddress: '123 Tech Street, Bangalore',
    items: [
      { name: 'Gaming Laptop', price: 75000, quantity: 1 },
      { name: 'Wireless Mouse', price: 2500, quantity: 1 }
    ],
    subtotal: 77500,
    shipping: 100,
    total: 77600,
    status: 'PENDING',
    orderDate: '2024-06-13',
    estimatedDelivery: '2024-06-20'
  },
  {
    id: 'ORD002',
    customerName: 'Priya Sharma',
    customerEmail: 'priya@example.com',
    customerAddress: '456 Mall Road, Delhi',
    items: [
      { name: 'Gaming Headphones', price: 8500, quantity: 1 },
      { name: '4K Monitor', price: 25000, quantity: 1 }
    ],
    subtotal: 33500,
    shipping: 100,
    total: 33600,
    status: 'SHIPPED',
    orderDate: '2024-06-12',
    estimatedDelivery: '2024-06-18'
  },
  {
    id: 'ORD003',
    customerName: 'Rahul Kumar',
    customerEmail: 'rahul@example.com',
    customerAddress: '789 Park Avenue, Mumbai',
    items: [
      { name: 'Mechanical Keyboard', price: 4500, quantity: 1 },
      { name: 'Webcam', price: 3500, quantity: 2 }
    ],
    subtotal: 11500,
    shipping: 100,
    total: 11600,
    status: 'DELIVERED',
    orderDate: '2024-06-10',
    estimatedDelivery: '2024-06-15'
  },
  {
    id: 'ORD004',
    customerName: 'Sneha Patel',
    customerEmail: 'sneha@example.com',
    customerAddress: '321 Garden Street, Pune',
    items: [
      { name: 'USB Drive 64GB', price: 1200, quantity: 3 },
      { name: 'Phone Case', price: 800, quantity: 2 }
    ],
    subtotal: 5200,
    shipping: 100,
    total: 5300,
    status: 'PENDING',
    orderDate: '2024-06-13',
    estimatedDelivery: '2024-06-21'
  },
  {
    id: 'ORD005',
    customerName: 'Arjun Singh',
    customerEmail: 'arjun@example.com',
    customerAddress: '654 Business District, Chennai',
    items: [
      { name: 'Gaming Laptop', price: 75000, quantity: 1 },
      { name: 'Gaming Headphones', price: 8500, quantity: 1 }
    ],
    subtotal: 83500,
    shipping: 100,
    total: 83600,
    status: 'SHIPPED',
    orderDate: '2024-06-11',
    estimatedDelivery: '2024-06-17'
  }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'PENDING': return 'warning';
    case 'SHIPPED': return 'info';
    case 'DELIVERED': return 'success';
    default: return 'default';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'PENDING': return '⏳';
    case 'SHIPPED': return '🚚';
    case 'DELIVERED': return '✅';
    default: return '📦';
  }
};

const OrderManagement = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editStatusOpen, setEditStatusOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [newOrderOpen, setNewOrderOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customerName: '',
    customerEmail: '',
    customerAddress: '',
    selectedProducts: []
  });

  const availableProducts = [
    { id: 'P001', name: 'Gaming Laptop', price: 75000 },
    { id: 'P002', name: 'Wireless Mouse', price: 2500 },
    { id: 'P003', name: 'Mechanical Keyboard', price: 4500 },
    { id: 'P004', name: 'Gaming Headphones', price: 8500 },
    { id: 'P005', name: '4K Monitor', price: 25000 },
    { id: 'P006', name: 'Webcam', price: 3500 }
  ];

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateOrder = () => {
    // Generate new order ID
    const newId = `ORD${String(orders.length + 1).padStart(3, '0')}`;
    
    // Calculate totals
    const subtotal = newOrder.selectedProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 100;
    const total = subtotal + shipping;
    
    const orderData = {
      id: newId,
      customerName: newOrder.customerName,
      customerEmail: newOrder.customerEmail,
      customerAddress: newOrder.customerAddress,
      items: newOrder.selectedProducts,
      subtotal: subtotal,
      shipping: shipping,
      total: total,
      status: 'PENDING',
      orderDate: new Date().toISOString().split('T')[0],
      estimatedDelivery: new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0]
    };
    
    // Add to orders array (in real app, this would be an API call)
    orders.push(orderData);
    
    // Reset form and close dialog
    setNewOrder({
      customerName: '',
      customerEmail: '',
      customerAddress: '',
      selectedProducts: []
    });
    setNewOrderOpen(false);
    
    console.log('New order created:', orderData);
  };

  const addProductToOrder = (product) => {
    const existingProduct = newOrder.selectedProducts.find(p => p.id === product.id);
    if (existingProduct) {
      // Increase quantity
      setNewOrder({
        ...newOrder,
        selectedProducts: newOrder.selectedProducts.map(p =>
          p.id === product.id ? {...p, quantity: p.quantity + 1} : p
        )
      });
    } else {
      // Add new product
      setNewOrder({
        ...newOrder,
        selectedProducts: [...newOrder.selectedProducts, {...product, quantity: 1}]
      });
    }
  };

  const removeProductFromOrder = (productId) => {
    setNewOrder({
      ...newOrder,
      selectedProducts: newOrder.selectedProducts.filter(p => p.id !== productId)
    });
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
  };

  const handleEditStatus = (order) => {
    setSelectedOrder(order);
    setEditStatusOpen(true);
  };

  const handleUpdateStatus = (newStatus) => {
    // Update status logic here
    console.log('Updating status for', selectedOrder.id, 'to', newStatus);
    setEditStatusOpen(false);
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
          📦 Order Management
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Manage and track all customer orders in one place.
        </Typography>
      </Box>

      {/* Filters and Actions */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status Filter</InputLabel>
              <Select
                value={statusFilter}
                label="Status Filter"
                onChange={(e) => setStatusFilter(e.target.value)}
                startAdornment={<FilterList sx={{ mr: 1, color: 'action.active' }} />}
              >
                <MenuItem value="All">All Orders</MenuItem>
                <MenuItem value="PENDING">Pending</MenuItem>
                <MenuItem value="SHIPPED">Shipped</MenuItem>
                <MenuItem value="DELIVERED">Delivered</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={5}>
            <Box display="flex" gap={2} justifyContent="flex-end">
              <Button variant="outlined" startIcon={<GetApp />}>
                Export
              </Button>
              <Button variant="outlined" startIcon={<Print />}>
                Print
              </Button>
              <Button 
                variant="contained" 
                startIcon={<Add />}
                onClick={() => setNewOrderOpen(true)}
              >
                New Order
              </Button>
            </Box>
          </Grid>
        </Grid>
        
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary">
            Showing {filteredOrders.length} of {orders.length} orders
          </Typography>
        </Box>
      </Paper>

      {/* Orders Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                <TableRow 
                  key={order.id} 
                  hover
                  sx={{ '&:hover': { backgroundColor: '#f8f9fa' } }}
                >
                  <TableCell sx={{ fontWeight: 500 }}>
                    {order.id}
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {order.customerName}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {order.customerEmail}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#2e7d32' }}>
                      ₹{order.total.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={`${getStatusIcon(order.status)} ${order.status}`}
                      color={getStatusColor(order.status)}
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
                          onClick={() => handleViewDetails(order)}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Update Status">
                        <IconButton 
                          color="secondary" 
                          size="small"
                          onClick={() => handleEditStatus(order)}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Track Shipment">
                        <IconButton color="info" size="small">
                          <LocalShipping />
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
          count={filteredOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Order Details Dialog */}
      <Dialog 
        open={detailsOpen} 
        onClose={() => setDetailsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedOrder && (
          <>
            <DialogTitle>
              <Typography variant="h5">
                Order Details - {selectedOrder.id}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                {/* Customer Info */}
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom color="primary">
                        👤 Customer Information
                      </Typography>
                      <Typography variant="body2"><strong>Name:</strong> {selectedOrder.customerName}</Typography>
                      <Typography variant="body2"><strong>Email:</strong> {selectedOrder.customerEmail}</Typography>
                      <Typography variant="body2"><strong>Address:</strong> {selectedOrder.customerAddress}</Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Order Info */}
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom color="primary">
                        📦 Order Information
                      </Typography>
                      <Typography variant="body2"><strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()}</Typography>
                      <Typography variant="body2"><strong>Estimated Delivery:</strong> {new Date(selectedOrder.estimatedDelivery).toLocaleDateString()}</Typography>
                      <Typography variant="body2">
                        <strong>Status:</strong> 
                        <Chip 
                          label={`${getStatusIcon(selectedOrder.status)} ${selectedOrder.status}`}
                          color={getStatusColor(selectedOrder.status)}
                          size="small"
                          sx={{ ml: 1 }}
                        />
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Items */}
                <Grid item xs={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom color="primary">
                        🛍️ Order Items
                      </Typography>
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell><strong>Product</strong></TableCell>
                              <TableCell align="right"><strong>Quantity</strong></TableCell>
                              <TableCell align="right"><strong>Price</strong></TableCell>
                              <TableCell align="right"><strong>Total</strong></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {selectedOrder.items.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell align="right">{item.quantity}</TableCell>
                                <TableCell align="right">₹{item.price.toLocaleString()}</TableCell>
                                <TableCell align="right">₹{(item.price * item.quantity).toLocaleString()}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Box display="flex" justifyContent="flex-end">
                        <Box>
                          <Typography variant="body2">Subtotal: ₹{selectedOrder.subtotal.toLocaleString()}</Typography>
                          <Typography variant="body2">Shipping: ₹{selectedOrder.shipping.toLocaleString()}</Typography>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                            Total: ₹{selectedOrder.total.toLocaleString()}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetailsOpen(false)}>Close</Button>
              <Button 
                variant="contained" 
                startIcon={<Print />}
                onClick={() => window.print()}
              >
                Print Order
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Status Update Dialog */}
      <Dialog open={editStatusOpen} onClose={() => setEditStatusOpen(false)}>
        <DialogTitle>Update Order Status</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>New Status</InputLabel>
            <Select
              defaultValue={selectedOrder?.status || ''}
              label="New Status"
            >
              <MenuItem value="PENDING">🕒 Pending</MenuItem>
              <MenuItem value="SHIPPED">🚚 Shipped</MenuItem>
              <MenuItem value="DELIVERED">✅ Delivered</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditStatusOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => handleUpdateStatus('SHIPPED')}>
            Update Status
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button */}
      <Fab 
        color="primary" 
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setNewOrderOpen(true)}
      >
        <Add />
      </Fab>

      {/* New Order Dialog */}
      <Dialog 
        open={newOrderOpen} 
        onClose={() => setNewOrderOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5">
            📦 Create New Order
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {/* Customer Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom color="primary">
                👤 Customer Information
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Customer Name"
                value={newOrder.customerName}
                onChange={(e) => setNewOrder({...newOrder, customerName: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Customer Email"
                type="email"
                value={newOrder.customerEmail}
                onChange={(e) => setNewOrder({...newOrder, customerEmail: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Customer Address"
                multiline
                rows={2}
                value={newOrder.customerAddress}
                onChange={(e) => setNewOrder({...newOrder, customerAddress: e.target.value})}
                required
              />
            </Grid>

            {/* Product Selection */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom color="primary" sx={{ mt: 2 }}>
                🛍️ Add Products
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {availableProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="body2" gutterBottom>
                        {product.name}
                      </Typography>
                      <Typography variant="h6" color="primary" gutterBottom>
                        ₹{product.price.toLocaleString()}
                      </Typography>
                      <Button 
                        size="small" 
                        variant="contained"
                        onClick={() => addProductToOrder(product)}
                      >
                        Add
                      </Button>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Selected Products */}
            {newOrder.selectedProducts.length > 0 && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom color="primary" sx={{ mt: 2 }}>
                    📋 Selected Products
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Price</TableCell>
                          <TableCell align="right">Total</TableCell>
                          <TableCell align="center">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {newOrder.selectedProducts.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell align="right">{item.quantity}</TableCell>
                            <TableCell align="right">₹{item.price.toLocaleString()}</TableCell>
                            <TableCell align="right">₹{(item.price * item.quantity).toLocaleString()}</TableCell>
                            <TableCell align="center">
                              <IconButton 
                                size="small" 
                                color="error"
                                onClick={() => removeProductFromOrder(item.id)}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell colSpan={3} sx={{ fontWeight: 'bold' }}>Total:</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                            ₹{newOrder.selectedProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}
                          </TableCell>
                          <TableCell />
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewOrderOpen(false)}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleCreateOrder}
            disabled={!newOrder.customerName || !newOrder.customerEmail || !newOrder.customerAddress || newOrder.selectedProducts.length === 0}
          >
            Create Order
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderManagement;
