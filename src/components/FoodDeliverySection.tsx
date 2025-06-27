import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import deliveryMan from '../assets/food delivery boy.jpg';

const FoodDeliverySection: React.FC = () => {
  return (
    <Box sx={{
      py: 8,
      bgcolor: '#fefefe',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Container maxWidth="lg" sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        gap: 4,
      }}>
        <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, mb: { xs: 4, md: 0 } }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
            Fastest Food Delivery
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Experience lightning-fast delivery right to your doorstep. Hot, fresh, and on time!
          </Typography>
          <Button variant="contained" color="primary" size="large" sx={{ py: 1.5, px: 4, fontSize: '1.1rem' }}>
            Order Now
          </Button>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <Box
            component="img"
            src={deliveryMan}
            alt="Food Delivery"
            sx={{
              width: '100%',
              maxWidth: 450,
              height: 'auto',
              borderRadius: 2,
              boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default FoodDeliverySection; 