import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  TextField,
  Button,
  Chip,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Search,
  Add,
  ShoppingCart,
  Visibility,
  Edit,
  FilterList
} from '@mui/icons-material';

// Mock product data
const products = [
  {
    id: 'P001',
    name: 'Gaming Laptop',
    price: 75000,
    category: 'Electronics',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300',
    description: 'High-performance gaming laptop with RTX graphics'
  },
  {
    id: 'P002',
    name: 'Wireless Mouse',
    price: 2500,
    category: 'Accessories',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300',
    description: 'Ergonomic wireless mouse with precision tracking'
  },
  {
    id: 'P003',
    name: 'Mechanical Keyboard',
    price: 4500,
    category: 'Accessories',
    stock: 28,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300',
    description: 'RGB mechanical keyboard with blue switches'
  },
  {
    id: 'P004',
    name: 'Gaming Headphones',
    price: 8500,
    category: 'Audio',
    stock: 22,
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300',
    description: '7.1 surround sound gaming headphones'
  },
  {
    id: 'P005',
    name: '4K Monitor',
    price: 25000,
    category: 'Electronics',
    stock: 8,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300',
    description: '27-inch 4K UHD monitor with HDR support'
  },
  {
    id: 'P006',
    name: 'Webcam',
    price: 3500,
    category: 'Electronics',
    stock: 35,
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=300',
    description: '1080p HD webcam with auto-focus'
  },
  {
    id: 'P007',
    name: 'USB Drive 64GB',
    price: 1200,
    category: 'Storage',
    stock: 67,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300',
    description: 'High-speed USB 3.0 flash drive'
  },
  {
    id: 'P008',
    name: 'Phone Case',
    price: 800,
    category: 'Accessories',
    stock: 89,
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300',
    description: 'Premium protective phone case'
  }
];

const categories = ['All', 'Electronics', 'Accessories', 'Audio', 'Storage'];

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  const getStockColor = (stock) => {
    if (stock > 30) return 'success';
    if (stock > 10) return 'warning';
    return 'error';
  };

  const getStockText = (stock) => {
    if (stock > 30) return 'In Stock';
    if (stock > 10) return 'Low Stock';
    return 'Limited';
  };

  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 25px rgba(0,0,0,0.15)'
      }
    }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            {product.name}
          </Typography>
          <Chip 
            label={getStockText(product.stock)} 
            color={getStockColor(product.stock)}
            size="small"
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" mb={2}>
          {product.description}
        </Typography>
        
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
            ₹{product.price.toLocaleString()}
          </Typography>
          <Chip label={product.category} variant="outlined" size="small" />
        </Box>
        
        <Typography variant="body2" color="text.secondary">
          Stock: {product.stock} units
        </Typography>
      </CardContent>
      
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button 
          variant="contained" 
          startIcon={<ShoppingCart />}
          onClick={() => onAddToCart(product)}
          sx={{ mr: 1, flex: 1 }}
        >
          Add to Cart
        </Button>
        <Button 
          variant="outlined" 
          startIcon={<Visibility />}
          onClick={() => onViewDetails(product)}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
};

const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    stock: ''
  });

  // Filter and search products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'stock': return b.stock - a.stock;
        default: return a.name.localeCompare(b.name);
      }
    });

  const handleAddProduct = () => {
    // Generate new product ID
    const newId = `P${String(products.length + 1).padStart(3, '0')}`;
    const productData = {
      id: newId,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      stock: parseInt(newProduct.stock),
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300',
      description: newProduct.description
    };
    
    // Add to products array (in real app, this would be an API call)
    products.push(productData);
    
    // Reset form and close dialog
    setNewProduct({ name: '', price: '', category: '', description: '', stock: '' });
    setAddProductOpen(false);
    
    console.log('New product added:', productData);
  };

  const handleAddToCart = (product) => {
    // Add to cart logic here
    console.log('Added to cart:', product);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setDetailsOpen(true);
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
          🛍️ Product Catalog
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Browse our wide selection of products. Use filters to find exactly what you need.
        </Typography>
      </Box>

      {/* Filters and Search */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Category"
                onChange={(e) => setSelectedCategory(e.target.value)}
                startAdornment={<FilterList sx={{ mr: 1, color: 'action.active' }} />}
              >
                {categories.map(category => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="name">Name (A-Z)</MenuItem>
                <MenuItem value="price-low">Price (Low to High)</MenuItem>
                <MenuItem value="price-high">Price (High to Low)</MenuItem>
                <MenuItem value="stock">Stock Level</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Button 
              variant="contained" 
              startIcon={<Add />}
              fullWidth
              sx={{ height: '56px' }}
              onClick={() => setAddProductOpen(true)}
            >
              Add Product
            </Button>
          </Grid>
        </Grid>
        
        <Box mt={2} display="flex" alignItems="center" gap={2}>
          <Typography variant="body2" color="textSecondary">
            Showing {filteredProducts.length} of {products.length} products
          </Typography>
          {searchTerm && (
            <Chip 
              label={`Search: "${searchTerm}"`} 
              onDelete={() => setSearchTerm('')}
              size="small"
            />
          )}
          {selectedCategory !== 'All' && (
            <Chip 
              label={`Category: ${selectedCategory}`}
              onDelete={() => setSelectedCategory('All')}
              size="small"
            />
          )}
        </Box>
      </Paper>

      {/* Product Grid */}
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard 
              product={product}
              onAddToCart={handleAddToCart}
              onViewDetails={handleViewDetails}
            />
          </Grid>
        ))}
      </Grid>

      {filteredProducts.length === 0 && (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No products found
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Try adjusting your search criteria or filters
          </Typography>
        </Box>
      )}

      {/* Product Details Dialog */}
      <Dialog 
        open={detailsOpen} 
        onClose={() => setDetailsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedProduct && (
          <>
            <DialogTitle>
              <Typography variant="h5" component="div">
                {selectedProduct.name}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    style={{ width: '100%', borderRadius: '8px' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h4" color="primary" gutterBottom>
                    ₹{selectedProduct.price.toLocaleString()}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {selectedProduct.description}
                  </Typography>
                  <Box mb={2}>
                    <Chip label={selectedProduct.category} color="primary" />
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    Stock: {selectedProduct.stock} units available
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetailsOpen(false)}>
                Close
              </Button>
              <Button 
                variant="contained" 
                startIcon={<ShoppingCart />}
                onClick={() => {
                  handleAddToCart(selectedProduct);
                  setDetailsOpen(false);
                }}
              >
                Add to Cart
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Add Product Dialog */}
      <Dialog 
        open={addProductOpen} 
        onClose={() => setAddProductOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5">
            ➕ Add New Product
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Price (₹)"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={newProduct.category}
                  label="Category"
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                >
                  <MenuItem value="Electronics">Electronics</MenuItem>
                  <MenuItem value="Accessories">Accessories</MenuItem>
                  <MenuItem value="Audio">Audio</MenuItem>
                  <MenuItem value="Storage">Storage</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Stock Quantity"
                type="number"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddProductOpen(false)}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleAddProduct}
            disabled={!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.stock || !newProduct.description}
          >
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductCatalog;
