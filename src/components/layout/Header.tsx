import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Link as MuiLink, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import foodLogo from '../../assets/image.png';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../context/CartContext';

const Header = ({ onSearch }: { onSearch?: (query: string) => void }) => {
  const [search, setSearch] = React.useState('');
  const [cartOpen, setCartOpen] = React.useState(false);
  const { cartItems, removeFromCart, clearCart } = useCart();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };
  const cartCount = cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
  return (
    <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
      <Toolbar sx={{
        flexWrap: 'wrap',
        py: { xs: 1, md: 0 }, // Adjust padding based on screen size
        px: { xs: 2, md: 3 },
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={foodLogo} alt="Food Logo" style={{ height: 40, marginRight: 12, borderRadius: 8 }} />
          <Typography 
            variant="h6" 
            color="primary.main" // Use primary color for site title
            noWrap 
            sx={{
              flexGrow: 1,
              fontWeight: 700, // Make title bold
              fontSize: '1.5rem',
            }}
          >
            Amyths
          </Typography>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <MuiLink component={Link} to="/" color="inherit" underline="none" sx={{ fontWeight: 500 }}>Home</MuiLink>
          <MuiLink component={Link} to="/about" color="inherit" underline="none" sx={{ fontWeight: 500 }}>About</MuiLink>
          <MuiLink component={Link} to="/products" color="inherit" underline="none" sx={{ fontWeight: 500 }}>Products</MuiLink>
          <MuiLink component={Link} to="/gallery" color="inherit" underline="none" sx={{ fontWeight: 500 }}>Gallery</MuiLink>
          <MuiLink component={Link} to="/contact" color="inherit" underline="none" sx={{ fontWeight: 500 }}>Contact</MuiLink>
          {/* Global Search Bar */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', bgcolor: '#f5f5f5', borderRadius: 2, px: 1, ml: 2 }}>
            <SearchIcon color="action" />
            <InputBase
              placeholder="Search..."
              value={search}
              onChange={handleSearchChange}
              sx={{ ml: 1, flex: 1, minWidth: 120 }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Box>
          {/* Cart Icon with Badge */}
          <IconButton color="primary" onClick={() => setCartOpen(true)} sx={{ ml: 2 }}>
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon fontSize="large" />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
      {/* Cart Drawer */}
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Box sx={{ width: 340, p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Typography variant="h6" gutterBottom>Shopping Cart</Typography>
          {cartItems.length === 0 ? (
            <Typography color="text.secondary">Your cart is empty.</Typography>
          ) : (
            <>
              <Box sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
                {cartItems.map(item => (
                  <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <img src={item.imageUrl} alt={item.name} style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8, marginRight: 12 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography fontWeight={600}>{item.name}</Typography>
                      <Typography color="text.secondary">${item.price} x {item.quantity}</Typography>
                    </Box>
                    <IconButton color="error" onClick={() => removeFromCart(item.id)}>
                      ×
                    </IconButton>
                  </Box>
                ))}
              </Box>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
                Total: ${cartItems.reduce((sum: number, item: CartItem) => sum + Number(item.price) * item.quantity, 0).toFixed(2)}
              </Typography>
              <Button variant="contained" color="primary" fullWidth sx={{ mb: 1 }} onClick={clearCart}>
                Clear Cart
              </Button>
              <Button variant="contained" color="secondary" fullWidth>
                Checkout
              </Button>
            </>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header; 