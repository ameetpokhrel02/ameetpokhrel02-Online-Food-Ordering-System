import React from 'react';
import { Box, Typography, Container, Link as MuiLink } from '@mui/material';
import { Facebook, Instagram, Twitter, LinkedIn } from '@mui/icons-material';
import GitHub from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f8f8f8', // Light background color
        color: '#555', // Default text color
        py: 6, // Increased vertical padding
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 4,
          '& > *': {
            flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 22px)' },
            maxWidth: { xs: '100%', md: 'calc(33.333% - 22px)' },
          }
        }}>
          <Box>
            <Typography variant="h6" gutterBottom sx={{ color: '#333' }}>
              Amyths
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Kathmandu, Nepal
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +977-9847226995
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: amyths04@gmail.com
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom sx={{ color: '#333' }}>
              Useful Links
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              <Box component="li" sx={{ mb: 1 }}><MuiLink href="/" color="inherit" sx={{ '&:hover': { color: 'primary.main' } }}>Home</MuiLink></Box>
              <Box component="li" sx={{ mb: 1 }}><MuiLink href="/about" color="inherit" sx={{ '&:hover': { color: 'primary.main' } }}>About Us</MuiLink></Box>
              <Box component="li" sx={{ mb: 1 }}><MuiLink href="/products" color="inherit" sx={{ '&:hover': { color: 'primary.main' } }}>Products</MuiLink></Box>
              <Box component="li" sx={{ mb: 1 }}><MuiLink href="/gallery" color="inherit" sx={{ '&:hover': { color: 'primary.main' } }}>Gallery</MuiLink></Box>
              <Box component="li" sx={{ mb: 1 }}><MuiLink href="/contact" color="inherit" sx={{ '&:hover': { color: 'primary.main' } }}>Contact</MuiLink></Box>
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom sx={{ color: '#333' }}>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', mt: 2 }}>
              <MuiLink href="#" sx={{ color: '#555', mr: 2, '&:hover': { color: 'primary.main' } }}><Twitter /></MuiLink>
              <MuiLink href="#" sx={{ color: '#555', mr: 2, '&:hover': { color: 'primary.main' } }}><Facebook /></MuiLink>
              <MuiLink href="#" sx={{ color: '#555', mr: 2, '&:hover': { color: 'primary.main' } }}><Instagram /></MuiLink>
              <MuiLink href="https://github.com/ameetpokhrel02" sx={{ color: '#555', mr: 2, '&:hover': { color: 'primary.main' } }}><GitHub /></MuiLink>
              <MuiLink href="https://www.linkedin.com/in/ameet-pokhrel-82533433b/" sx={{ color: '#555', '&:hover': { color: 'primary.main' } }}><LinkedIn /></MuiLink>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid #ccc', textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Amyths. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 