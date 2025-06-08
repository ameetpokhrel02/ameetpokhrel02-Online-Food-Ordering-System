import React, { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import biryani from '../assets/biryani.jpg';
import pizza from '../assets/pizza.jpg';
import momo from '../assets/momo.jpeg';
import lolipop from '../assets/lolipop.jpg';
import menuBackground from '../assets/gallery.png'; // Using an existing image for the parallax background

// Placeholder data for menu items
const menuItems = [
  {
    id: 1,
    name: 'Spaghetti meat frying',
    price: '500 GR',
    description: 'A delicious and savory spaghetti dish with perfectly fried meat.',
    image: biryani,
  },
  {
    id: 2,
    name: 'Spaghetti with Olive Oil',
    price: '410 GR',
    description: 'Light and flavorful spaghetti tossed in olive oil and fresh herbs.',
    image: pizza,
  },
  {
    id: 3,
    name: 'Taco Soup Recipe',
    price: '430 GR',
    description: 'A hearty and comforting taco soup, packed with flavor and spice.',
    image: momo,
  },
  {
    id: 4,
    name: 'Spaghetti with Olive Oil',
    price: '370 GR',
    description: 'Another delightful rendition of spaghetti with olive oil, a classic.',
    image: lolipop,
  },
];

const MenuPage: React.FC = () => {
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Adjust the multiplier for the parallax effect speed
      setParallaxOffset(window.pageYOffset * 0.4);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#20222f', // Dark background color from the image
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Parallax Landing Section */}
      <Box
        sx={{
          position: 'relative',
          height: '60vh', // Adjust height as needed
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: `url(${menuBackground}) no-repeat center center fixed`,
          backgroundSize: 'cover',
          transform: `translateY(${parallaxOffset}px)`,
          zIndex: 0, // Ensure it's behind other content if needed
          '&::before': { // Overlay for better text readability
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
              color: '#fff',
              textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
            }}
          >
            Discover Our Delicious Menu
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: '#f5f5f5',
              maxWidth: 700,
              mx: 'auto',
              mt: 2,
            }}
          >
            Explore a world of flavors, from traditional dishes to modern culinary creations.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8, bgcolor: '#20222f', position: 'relative', zIndex: 1 }}>
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