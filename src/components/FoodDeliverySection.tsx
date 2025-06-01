import React from 'react';
import { Box, Typography, Button, Link as MuiLink, Stack, Avatar, SxProps } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import foodDeliveryImg from '../assets/food delivery boy.jpg';

const customerAvatars = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/65.jpg',
  'https://randomuser.me/api/portraits/women/68.jpg',
];

interface FoodDeliverySectionProps {
  sx?: SxProps;
}

const FoodDeliverySection: React.FC<FoodDeliverySectionProps> = ({ sx }) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 4,
      bgcolor: '#fff',
      borderRadius: 4,
      boxShadow: '0 4px 32px #0001',
      px: { xs: 2, md: 6 },
      py: { xs: 4, md: 8 },
      my: 6,
      position: 'relative',
      overflow: 'hidden',
      ...sx,
    }}>
      {/* Left: Text Content */}
      <Box sx={{ flex: 1, zIndex: 2 }}>
        <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, fontSize: { xs: '2.2rem', md: '3.2rem', lg: '3.8rem' }, lineHeight: 1.1 }}>
          <Box component="span" sx={{ color: '#ffb300' }}>Fastest</Box>{' '}
          <Box component="span" sx={{ color: '#222' }}>Online</Box>{' '}
          <Box component="span" sx={{ color: '#ff3b00' }}>Food Delivery</Box>{' '}
          <Box component="span" sx={{ color: '#222' }}>Service</Box>
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', mb: 3, maxWidth: 500 }}>
          We are most fastest and favourite food delivery service all over the world. Search for your favourite food or restaurant in your area.
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
          <Button variant="contained" color="primary" size="large" sx={{ borderRadius: 2, px: 4, fontWeight: 700, boxShadow: 2 }}>
            Order Now
          </Button>
          <MuiLink href="/gallery" underline="hover" sx={{ fontWeight: 700, fontSize: '1.1rem', alignSelf: 'center', color: '#222', ml: 2 }}>
            See Menu
          </MuiLink>
        </Stack>
        <Stack direction="row" spacing={4} sx={{ mb: 3, alignItems: 'center' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <LocalShippingIcon sx={{ color: '#388e3c' }} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>No shipping Charge</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <SecurityIcon sx={{ color: '#ffb300' }} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>100% Secure Checkout</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {customerAvatars.map((src, i) => (
              <Avatar key={i} src={src} sx={{ width: 32, height: 32, ml: i === 0 ? 0 : -1.5, border: '2px solid #fff', zIndex: customerAvatars.length - i }} />
            ))}
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>Our customer</Typography>
          <Box sx={{ bgcolor: '#fffde7', color: '#ffb300', px: 1.5, py: 0.5, borderRadius: 2, fontWeight: 700, ml: 1 }}>2k+</Box>
        </Stack>
      </Box>
      {/* Right: Image & Animated Arrow */}
      <Box sx={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: 320, minHeight: 320 }}>
        {/* Animated Arrow (CSS) */}
        <Box
          sx={{
            position: 'absolute',
            top: 30,
            left: { xs: '50%', md: 40 },
            width: 120,
            height: 60,
            zIndex: 3,
            pointerEvents: 'none',
            animation: 'arrowMove 1.5s infinite alternate',
            '@keyframes arrowMove': {
              '0%': { transform: 'translateY(0) scale(1)' },
              '100%': { transform: 'translateY(10px) scale(1.05)' },
            },
          }}
        >
          <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 50 Q60 10 110 50" stroke="#ff3b00" strokeWidth="4" strokeDasharray="8 8" fill="none" />
            <polygon points="110,50 102,46 104,54" fill="#ff3b00" />
          </svg>
        </Box>
        <Box
          component="img"
          src={foodDeliveryImg}
          alt="Food Delivery Boy"
          sx={{
            width: { xs: '90vw', sm: 320, md: 380 },
            maxWidth: 420,
            borderRadius: 4,
            boxShadow: '0 8px 32px #0002',
            objectFit: 'cover',
            background: '#fff',
            zIndex: 2,
          }}
        />
      </Box>
    </Box>
  );
};

export default FoodDeliverySection; 