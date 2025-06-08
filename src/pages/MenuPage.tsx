import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import spaghettiMeat from '../assets/spaghetti_meat_frying.jpg'; // Assuming these will be created or exist
import spaghettiOlive from '../assets/spaghetti_with_olive_oil.jpg';
import tacoSoup from '../assets/taco_soup_recipe.jpg';
import spaghettiOlive2 from '../assets/spaghetti_with_olive_oil_2.jpg';

// Placeholder data for menu items
const menuItems = [
  {
    id: 1,
    name: 'Spaghetti meat frying',
    price: '500 GR',
    description: 'Welcome to the home page of Broadway Limousines, the preferred providers of wedding cars in Sydney.',
    image: spaghettiMeat,
  },
  {
    id: 2,
    name: 'Spaghetti with Olive Oil',
    price: '410 GR',
    description: 'Welcome to the home page of Broadway Limousines, the preferred providers of wedding cars in Sydney.',
    image: spaghettiOlive,
  },
  {
    id: 3,
    name: 'Taco Soup Recipe',
    price: '430 GR',
    description: 'Welcome to the home page of Broadway Limousines, the preferred providers of wedding cars in Sydney.',
    image: tacoSoup,
  },
  {
    id: 4,
    name: 'Spaghetti with Olive Oil',
    price: '370 GR',
    description: 'Welcome to the home page of Broadway Limousines, the preferred providers of wedding cars in Sydney.',
    image: spaghettiOlive2,
  },
];

const MenuPage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#20222f', // Dark background color from the image
        color: '#fff',
        py: 8,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 700, mb: 6, color: '#ffc107' }}>
          Our Menu
        </Typography>

        {menuItems.map((item, index) => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end', // Alternate alignment
              mb: 8,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '1px',
                height: index < menuItems.length - 1 ? 'calc(50% + 50px)' : '0', // Adjust height for line
                bgcolor: '#444',
                left: index % 2 === 0 ? '25%' : 'auto',
                right: index % 2 !== 0 ? '25%' : 'auto',
                top: '50%',
                transform: 'translateX(-50%)',
                zIndex: 0,
              },
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: 150,
                height: 150,
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                border: '2px solid #ffc107',
                zIndex: 1,
                flexShrink: 0,
                mr: index % 2 === 0 ? 4 : 0,
                ml: index % 2 !== 0 ? 4 : 0,
              }}
            >
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  bgcolor: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  px: 1,
                  py: 0.5,
                  borderRadius: '4px',
                }}
              >
                {item.price}
              </Typography>
            </Box>

            <Box
              sx={{
                flex: 1,
                textAlign: index % 2 === 0 ? 'left' : 'right',
                maxWidth: '400px',
                ml: index % 2 === 0 ? 0 : 'auto',
                mr: index % 2 === 0 ? 'auto' : 0,
                p: 2,
                bgcolor: 'rgba(0,0,0,0.3)',
                borderRadius: 2,
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#ffc107', mb: 1 }}>
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default MenuPage; 