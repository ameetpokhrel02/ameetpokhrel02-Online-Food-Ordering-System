import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import biryani from '../assets/biryani.jpg';
import pizza from '../assets/pizza.jpg';
import momo from '../assets/momo.jpeg';
import lolipop from '../assets/lolipop.jpg';
import menuBackground from '../assets/gallery.png'; // Using an existing image for the parallax background
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'; // Import icons
import { Product } from '../types/product'; // Import the Product interface

// Placeholder data for menu items (now adhering to Product interface)
const allMenuItems: Product[] = [
  {
    id: 1,
    name: 'Spaghetti meat frying',
    price: '15.00',
    description: 'A delicious and savory spaghetti dish with perfectly fried meat.',
    imageUrl: biryani,
  },
  {
    id: 2,
    name: 'Spaghetti with Olive Oil',
    price: '12.50',
    description: 'Light and flavorful spaghetti tossed in olive oil and fresh herbs.',
    imageUrl: pizza,
  },
  {
    id: 3,
    name: 'Taco Soup Recipe',
    price: '10.00',
    description: 'A hearty and comforting taco soup, packed with flavor and spice.',
    imageUrl: momo,
  },
  {
    id: 4,
    name: 'Spaghetti with Olive Oil',
    price: '13.00',
    description: 'Another delightful rendition of spaghetti with olive oil, a classic.',
    imageUrl: lolipop,
  },
];

const MenuPage: React.FC = () => {
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [mainMenuItemIndex, setMainMenuItemIndex] = useState(0);
  const [mainMenuItem, setMainMenuItem] = useState<Product>(allMenuItems[mainMenuItemIndex]);
  const [orbitingMenuItems, setOrbitingMenuItems] = useState<Product[]>([]);
  const [orbitingStartIndex, setOrbitingStartIndex] = useState(0);
  const NUM_ORBITING_ITEMS = 4; // Changed to 4 for visual consistency with the image

  // Auto-play for main menu item
  useEffect(() => {
    const interval = setInterval(() => {
      setMainMenuItemIndex((prevIndex) => (prevIndex + 1) % allMenuItems.length);
    }, 4000); // Change main item every 4 seconds
    return () => clearInterval(interval);
  }, []);

  // Update mainMenuItem when mainMenuItemIndex changes
  useEffect(() => {
    setMainMenuItem(allMenuItems[mainMenuItemIndex]);
  }, [mainMenuItemIndex]);

  // Auto-play for orbiting menu items
  useEffect(() => {
    const orbitInterval = setInterval(() => {
      setOrbitingStartIndex((prevIndex) => {
        const potentialOrbitingItems = allMenuItems.filter(p => p.id !== mainMenuItem.id);
        if (potentialOrbitingItems.length === 0) return 0;
        return (prevIndex + 1) % potentialOrbitingItems.length;
      });
    }, 2500); // Orbiting items change every 2.5 seconds
    return () => clearInterval(orbitInterval);
  }, [allMenuItems, mainMenuItem]);

  // Update orbitingMenuItems when mainMenuItem or orbitingStartIndex changes
  useEffect(() => {
    if (mainMenuItem) {
      const potentialOrbitingItems = allMenuItems.filter(p => p.id !== mainMenuItem.id);
      const visibleOrbitingItems: Product[] = [];
      const itemsToSlice = Math.min(NUM_ORBITING_ITEMS, potentialOrbitingItems.length);

      for (let i = 0; i < itemsToSlice; i++) {
        const index = (orbitingStartIndex + i) % potentialOrbitingItems.length;
        if (potentialOrbitingItems[index]) {
          visibleOrbitingItems.push(potentialOrbitingItems[index]);
        }
      }
      setOrbitingMenuItems(visibleOrbitingItems);
    }
  }, [mainMenuItem, orbitingStartIndex, allMenuItems]);

  // Handle click on orbiting menu item
  const handleOrbitingMenuItemClick = (item: Product) => {
    setMainMenuItem(item);
  };

  // Handle previous/next for main menu item
  const handlePrevMainMenuItem = () => {
    setMainMenuItemIndex((prev) => (prev - 1 + allMenuItems.length) % allMenuItems.length);
  };

  const handleNextMainMenuItem = () => {
    setMainMenuItemIndex((prev) => (prev + 1) % allMenuItems.length);
  };

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
        bgcolor: 'background.default', // Using theme's default background color
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
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${menuBackground}) no-repeat center center fixed`,
          backgroundSize: 'cover',
          transform: `translateY(${parallaxOffset}px)`,
          zIndex: 0, // Ensure it's behind other content if needed
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

      <Container maxWidth="lg" sx={{ py: 8, bgcolor: 'background.default', position: 'relative', zIndex: 1 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 700, mb: 6, color: '#ffc107' }}>
          Our Menu
        </Typography>

        {/* Main Menu Item Display with Orbiting Items */}
        <Box sx={{
          flex: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          minHeight: 500,
          bgcolor: 'transparent', // Changed to transparent as per the image for this section
          borderRadius: 4,
          boxShadow: 'none',
          p: 4,
          overflow: 'hidden',
        }}>
          {/* Left side: Main Menu Item Details */}
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, mr: { xs: 0, md: 4 }, zIndex: 2 }}>
            <Typography variant="h4" sx={{ color: '#ffc107', fontWeight: 700, mb: 1 }}>
              ${mainMenuItem?.price}
            </Typography>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 2, color: '#fff' }}>
              {mainMenuItem?.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 350, mx: { xs: 'auto', md: 'unset' } }}>
              {mainMenuItem?.description}
            </Typography>
            {/* Add to Card button, or remove if not needed for Menu Page */}
            {/* <Button variant="contained" color="primary" size="large" startIcon={<AddShoppingCart />}>
              Add to Card
            </Button> */}
          </Box>

          {/* Right side: Orbiting Images and Main Image */}
          <Box sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            height: '100%',
            minHeight: { xs: 300, md: 'auto' },
            zIndex: 1,
          }}>
            {/* Animated path for orbiting items */}
            <Box sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '1px dashed #444', // Changed border color for dark background
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              {/* Main Menu Item Image (Central) */}
              <Box sx={{
                width: 220,
                height: 220,
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                transition: 'all 0.5s ease-in-out',
                border: '2px solid #ffc107', // Added border to main image
              }}>
                <img src={mainMenuItem?.imageUrl} alt={mainMenuItem?.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>

              {/* Previous Button */}
              <IconButton
                onClick={handlePrevMainMenuItem}
                sx={{
                  position: 'absolute',
                  left: { xs: 0, md: -60 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 5,
                  color: '#ffc107',
                  bgcolor: 'rgba(0,0,0,0.5)',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                  boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                }}
              >
                <ArrowBackIos />
              </IconButton>

              {/* Next Button */}
              <IconButton
                onClick={handleNextMainMenuItem}
                sx={{
                  position: 'absolute',
                  right: { xs: 0, md: -60 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 5,
                  color: '#ffc107',
                  bgcolor: 'rgba(0,0,0,0.5)',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                  boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                }}
              >
                <ArrowForwardIos />
              </IconButton>

              {/* Orbiting Small Menu Item Images */}
              {orbitingMenuItems.map((item, index) => (
                <Box
                  key={item.id}
                  onClick={() => handleOrbitingMenuItemClick(item)}
                  sx={{
                    position: 'absolute',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                    bgcolor: '#333', // Darker background for orbiting items
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '2px solid #ffc107', // Border for orbiting items
                    transition: 'box-shadow 0.2s, transform 0.2s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                      transform: 'scale(1.1)',
                    },
                    // Positioning around the circle - adjust as needed
                    top: `calc(50% + ${150 * Math.sin((2 * Math.PI * index) / orbitingMenuItems.length)}px - 40px)`,
                    left: `calc(50% + ${150 * Math.cos((2 * Math.PI * index) / orbitingMenuItems.length)}px - 40px)`,
                  }}
                >
                  <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {/* Price tag for orbiting items - optional, if desired */}
                  {/* <Typography
                    variant="caption"
                    sx={{
                      position: 'absolute',
                      bottom: 5,
                      right: 5,
                      bgcolor: 'rgba(0,0,0,0.6)',
                      color: '#fff',
                      px: 0.5,
                      borderRadius: '2px',
                    }}
                  >
                    ${item.price}
                  </Typography> */}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

      </Container>
    </Box>
  );
};

export default MenuPage; 