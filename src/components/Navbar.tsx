import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Button, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  Box,
  useTheme,
  useMediaQuery 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import logoImg from '../assets/logo.jpg';
import { styled } from '@mui/material/styles';
import { ListItemButton } from '@mui/material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#fff',
  boxShadow: 'none',
  borderBottom: '1px solid #eee'
}));

const Logo = styled('img')({  
  height: '40px',
  marginRight: '20px'
});

const NavButton = styled(Button)({  
  color: '#333',
  textTransform: 'none',
  margin: '0 8px',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.04)'
  }
});

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit'
});

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
    { name: 'Blog', path: '/blog' }
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (mobileOpen) {
      handleDrawerToggle();
    }
  };

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItemButton 
          key={item.name} 
          onClick={() => handleNavigation(item.path)}
        >
          <ListItemText primary={item.name} />
        </ListItemButton>
      ))}
    </List>
  );

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, color: '#333' }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <StyledLink to="/">
            <Logo src={logoImg} alt="BiteBazaar" />
          </StyledLink>
          
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              {menuItems.map((item) => (
                <StyledLink to={item.path} key={item.name}>
                  <NavButton>
                    {item.name}
                  </NavButton>
                </StyledLink>
              ))}
            </Box>
          )}
          
          <Box sx={{ flexGrow: isMobile ? 1 : 0, display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton sx={{ color: '#333' }}>
              <ShoppingCartIcon />
            </IconButton>
            <StyledLink to="/login">
              <NavButton variant="outlined" sx={{ borderColor: '#FF4B3A', color: '#FF4B3A' }}>
                Login
              </NavButton>
            </StyledLink>
            <StyledLink to="/signup">
              <NavButton variant="contained" sx={{ backgroundColor: '#FF4B3A', color: '#fff', '&:hover': { backgroundColor: '#ff3621' } }}>
                Signup
              </NavButton>
            </StyledLink>
          </Box>
        </Toolbar>
      </StyledAppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;