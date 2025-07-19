import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Link as MuiLink, Box, IconButton, Drawer, Paper, Slide, Fade } from '@mui/material';
import { Link } from 'react-router-dom';
import newLogo from '../../assets/logo.jpg';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart, CartItem } from '../../context/CartContext';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setSearch } from '../../store/slices/uiSlice';

const Header = () => {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector((state) => state.ui);
  const [cartOpen, setCartOpen] = React.useState(false);
  const { cartItems, removeFromCart, clearCart, addToCart, decreaseQuantity } = useCart();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };
  const cartCount = cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
  const getCartTotal = () => {
    return cartItems.reduce((sum: number, item: CartItem) => sum + Number(item.price) * item.quantity, 0);
  };
  return (
    <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
      <Toolbar sx={{
        flexWrap: 'wrap',
        py: { xs: 1, md: 0 },
        px: { xs: 2, md: 3 },
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={newLogo} alt="Website Logo" style={{ height: 40, marginRight: 12, borderRadius: 8 }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 700,
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            BiteBazaar
          </Typography>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <MuiLink component={Link} to="/" color="inherit" underline="none" sx={{ fontWeight: 500, mx: 1, transition: 'color 0.2s, border-bottom 0.2s', '&:hover': { color: 'primary.main', borderBottom: '2px solid', borderColor: 'primary.main', bgcolor: 'transparent' } }}>Home</MuiLink>
          <MuiLink component={Link} to="/about" color="inherit" underline="none" sx={{ fontWeight: 500, mx: 1, transition: 'color 0.2s, border-bottom 0.2s', '&:hover': { color: 'primary.main', borderBottom: '2px solid', borderColor: 'primary.main', bgcolor: 'transparent' } }}>About</MuiLink>
          <MuiLink component={Link} to="/products" color="inherit" underline="none" sx={{ fontWeight: 500, mx: 1, transition: 'color 0.2s, border-bottom 0.2s', '&:hover': { color: 'primary.main', borderBottom: '2px solid', borderColor: 'primary.main', bgcolor: 'transparent' } }}>Products</MuiLink>
          <MuiLink component={Link} to="/menu" color="inherit" underline="none" sx={{ fontWeight: 500, mx: 1, transition: 'color 0.2s, border-bottom 0.2s', '&:hover': { color: 'primary.main', borderBottom: '2px solid', borderColor: 'primary.main', bgcolor: 'transparent' } }}>Menu</MuiLink>
          <MuiLink component={Link} to="/gallery" color="inherit" underline="none" sx={{ fontWeight: 500, mx: 1, transition: 'color 0.2s, border-bottom 0.2s', '&:hover': { color: 'primary.main', borderBottom: '2px solid', borderColor: 'primary.main', bgcolor: 'transparent' } }}>Gallery</MuiLink>
          <MuiLink component={Link} to="/contact" color="inherit" underline="none" sx={{ fontWeight: 500, mx: 1, transition: 'color 0.2s, border-bottom 0.2s', '&:hover': { color: 'primary.main', borderBottom: '2px solid', borderColor: 'primary.main', bgcolor: 'transparent' } }}>Contact</MuiLink>
          <MuiLink component={Link} to="/blog" color="inherit" underline="none" sx={{ fontWeight: 500, mx: 1, transition: 'color 0.2s, border-bottom 0.2s', '&:hover': { color: 'primary.main', borderBottom: '2px solid', borderColor: 'primary.main', bgcolor: 'transparent' } }}>Blog</MuiLink>
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
          <IconButton color="primary" onClick={() => setCartOpen(true)} sx={{ ml: 2 }}>
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon fontSize="large" />
            </Badge>
          </IconButton>
          <Button component={Link} to="/login" variant="outlined" color="primary" sx={{ ml: 2, fontWeight: 600, borderRadius: 2 }}>
            Login
          </Button>
          <Button component={Link} to="/signup" variant="contained" color="primary" sx={{ ml: 1, fontWeight: 600, borderRadius: 2 }}>
            Signup
          </Button>
        </Box>
      </Toolbar>
      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 400 },
            bgcolor: '#fefefe',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            borderRadius: { xs: '0', sm: '16px 0 0 16px' },
            display: 'flex',
            flexDirection: 'column',
          },
        }}
        TransitionComponent={Slide}
        transitionDuration={{ enter: 400, exit: 200 }}
      >
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eee' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
            Shopping Cart
          </Typography>
          <IconButton onClick={() => setCartOpen(false)} sx={{ color: 'text.secondary' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>&times;</span>
          </IconButton>
        </Box>
        {cartItems.length === 0 ? (
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center' }}>
              Your cart is empty.
            </Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
              {cartItems.map((item, index) => (
                <Fade in={cartOpen} timeout={400 + index * 50} key={item.id}>
                  <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2, borderRadius: 2, bgcolor: '#fff' }}>
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      style={{
                        width: 64, 
                        height: 64, 
                        objectFit: 'cover', 
                        borderRadius: 1, 
                        marginRight: 16,
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight={600} noWrap>{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">${Number(item.price).toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton size="small" color="primary" onClick={() => decreaseQuantity(item.id)} sx={{ '&:hover': { bgcolor: 'primary.light' } }}>
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                      <Typography sx={{ mx: 1, fontWeight: 500 }}>{item.quantity}</Typography>
                      <IconButton size="small" color="primary" onClick={() => addToCart(item)} sx={{ '&:hover': { bgcolor: 'primary.light' } }}>
                        <AddCircleOutlineIcon />
                      </IconButton>
                    </Box>
                    <IconButton color="error" onClick={() => removeFromCart(item.id)} sx={{ ml: 1, '&:hover': { bgcolor: 'error.light' } }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>&times;</span>
                    </IconButton>
                  </Paper>
                </Fade>
              ))}
            </Box>
            <Box sx={{ p: 3, borderTop: '1px solid #eee', bgcolor: '#fff' }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Total:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ mb: 1, borderRadius: 8, py: 1.5, fontWeight: 600, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
                onClick={clearCart}
              >
                Clear Cart
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                component={Link}
                to="/payment"
                sx={{ borderRadius: 8, py: 1.5, fontWeight: 600, boxShadow: '0 4px 8px rgba(255,59,0,0.2)' }}
              >
                Checkout
              </Button>
            </Box>
          </>
        )}
      </Drawer>
    </AppBar>
  );
};

export default Header; 