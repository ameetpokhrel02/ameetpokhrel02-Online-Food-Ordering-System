import React, { useState } from 'react';
import { Typography, Container, Box, Button } from '@mui/material';
import ProductCard from '../components/ProductCard';
import food1 from '../assets/food1.avif';
import food2 from '../assets/food 2.jpg';
import imagePng from '../assets/image.png';
import galleryPng from '../assets/gallery.png';
import biryani from '../assets/biryani.jpg';
import lolipop from '../assets/lolipop.jpg';
import pizza from '../assets/pizza.jpg';
import momo from '../assets/momo.jpeg';
import buffKeemaNoodles from '../assets/buff-keema-noodles.jpg';
import chowmein from '../assets/chowmein.webp';
import kd8z02kfs9u61 from '../assets/kd8z02kfs9u61.jpg';
import chicken from '../assets/chicken.jpg';
import GalleryMenuItem from '../components/GalleryMenuItem';
import FoodDeliverySection from '../components/FoodDeliverySection';

const allGalleryItems = [
  { id: 1, name: 'Delicious Pizza', price: '19.99', imageUrl: food1 },
  { id: 2, name: 'Tasty Burger', price: '29.50', imageUrl: food2 },
  { id: 3, name: 'Special Dish', price: '15.00', imageUrl: imagePng },
  { id: 4, name: 'Yummy Dessert', price: '45.75', imageUrl: galleryPng },
   { id: 5, name: 'Classic Biryani', price: '22.00', imageUrl: biryani },
  { id: 6, name: 'Chicken Lollipop', price: '18.50', imageUrl: lolipop },
  { id: 7, name: 'Cheese Pizza', price: '21.99', imageUrl: pizza },
  { id: 8, name: 'Steamed Momo', price: '16.00', imageUrl: momo },
  { id: 9, name: 'Buff Keema Noodles', price: '14.50', imageUrl: buffKeemaNoodles },
  { id: 10, name: 'Chowmein', price: '12.00', imageUrl: chowmein },
  { id: 11, name: 'Delicious Meal', price: '35.00', imageUrl: kd8z02kfs9u61 },
  { id: 12, name: 'Roasted Chicken', price: '28.75', imageUrl: chicken },
];

interface GalleryPageProps {
  search: string;
  setSearch: (query: string) => void;
}

const GalleryPage: React.FC<GalleryPageProps> = ({ search, setSearch }) => {
  const [showFullMenu, setShowFullMenu] = useState(false);

  // Filter products by global search (applied to full menu when visible)
  const filteredGalleryItems = allGalleryItems.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Select top 3 items for the featured section
  const topMenuItems = allGalleryItems.slice(0, 3);

  const handleViewDetailsClick = () => {
    setShowFullMenu(true);
  };

  return (
    <Box>
      {/* Our Top Menu Section */}
      <Box sx={{
        bgcolor: '#fff8e1', // Light creamy background, matching website theme
        py: 8,
        textAlign: 'center',
        color: '#333', // Darker text for contrast
      }}>
        <Container>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#ff3b00' }}>
            Our Top Menu
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Sample text. Click to select the text box. Click again or double click to start editing the text.
          </Typography>
          <Button
            variant="outlined"
            sx={{
              color: '#ff3b00', // Orange text color
              borderColor: '#ff3b00', // Orange border color
              borderRadius: 2,
              px: 4,
              '&:hover': { borderColor: '#c1452b', bgcolor: 'rgba(255,59,0,0.1)' } // Darker orange border and subtle orange background on hover
            }}
            onClick={() => setShowFullMenu(true)}
          >
            View Menu
          </Button>

          {/* Top Menu Items */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 6 }}>
             {topMenuItems.map(item => (
                <GalleryMenuItem key={item.id} item={item} onViewDetailsClick={handleViewDetailsClick} />
             ))}
          </Box>
        </Container>
      </Box>

      {/* Full Gallery Menu (conditionally displayed) */}
      {showFullMenu && (
        <Container sx={{ py: 8 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 6 }}>
            All Menu Items
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
            {filteredGalleryItems.map((item) => (
              <Box key={item.id} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)', md: '1 1 calc(25% - 18px)' }, maxWidth: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(25% - 18px)' } }}>
                {/* Using ProductCard for now, will replace with GalleryMenuItem if needed for different style */}
                <ProductCard product={item} />
              </Box>
            ))}
          </Box>
        </Container>
      )}
      <FoodDeliverySection sx={{ bgcolor: '#fff' }} />
    </Box>
  );
}

export default GalleryPage; 