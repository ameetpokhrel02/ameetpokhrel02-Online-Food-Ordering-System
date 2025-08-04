import React, { useState } from 'react';
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

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const menuItems = ['Home', 'About', 'Products', 'Menu', 'Gallery', 'Contact', 'Blog'];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItemButton key={item} onClick={() => handleDrawerToggle()}>
          <ListItemText primary={item} />
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
          
          <Logo src="/logo.png" alt="BiteBazaar" />
          
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              {menuItems.map((item) => (
                <NavButton key={item}>
                  {item}
                </NavButton>
              ))}
            </Box>
          )}
          
          <Box sx={{ flexGrow: isMobile ? 1 : 0, display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton sx={{ color: '#333' }}>
              <ShoppingCartIcon />
            </IconButton>
            <NavButton variant="outlined" sx={{ borderColor: '#FF4B3A', color: '#FF4B3A' }}>
              Login
            </NavButton>
            <NavButton variant="contained" sx={{ backgroundColor: '#FF4B3A', color: '#fff', '&:hover': { backgroundColor: '#ff3621' } }}>
              Signup
            </NavButton>
          </Box>
        </Toolbar>
      </StyledAppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
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