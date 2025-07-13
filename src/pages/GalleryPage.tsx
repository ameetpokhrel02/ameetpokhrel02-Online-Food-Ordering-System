import React, { useState } from 'react';
import { Typography, Container, Box, Button } from '@mui/material';
import ProductCard from '../components/ProductCard';
import food1 from '../assets/food1.avif';
import food2 from '../assets/food2.jpg';
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
import { Product } from '../types/product'; // Import the shared Product interface

const allGalleryItems: Product[] = [
  { id: 1, name: 'Delicious Pizza', price: '19.99', imageUrl: food1, description: 'A delicious pizza made with the freshest ingredients.' },
  { id: 2, name: 'Tasty Burger', price: '29.50', imageUrl: food2, description: 'Juicy burger with all the fixings.' },
  { id: 3, name: 'Special Dish', price: '15.00', imageUrl: imagePng, description: 'Our chef\'s special creation, a must-try!' },
  { id: 4, name: 'Yummy Dessert', price: '45.75', imageUrl: galleryPng, description: 'Indulge in this sweet and delightful dessert.' },
   { id: 5, name: 'Classic Biryani', price: '22.00', imageUrl: biryani, description: 'Aromatic and flavorful classic biryani.' },
  { id: 6, name: 'Chicken Lollipop', price: '18.50', imageUrl: lolipop, description: 'Crispy and juicy chicken lollipops.' },
  { id: 7, name: 'Cheese Pizza', price: '21.99', imageUrl: pizza, description: 'Extra cheesy pizza for cheese lovers.' },
  { id: 8, name: 'Steamed Momo', price: '16.00', imageUrl: momo, description: 'Soft and tender steamed momos with spicy sauce.' },
  { id: 9, name: 'Buff Keema Noodles', price: '14.50', imageUrl: buffKeemaNoodles, description: 'Spicy buff keema noodles.' },
  { id: 10, name: 'Chowmein', price: '12.00', imageUrl: chowmein, description: 'Classic stir-fried chowmein.' },
  { id: 11, name: 'Delicious Meal', price: '35.00', imageUrl: kd8z02kfs9u61, description: 'A hearty and delicious complete meal.' },
  { id: 12, name: 'Roasted Chicken', price: '28.75', imageUrl: chicken, description: 'Tender and flavorful roasted chicken.' },
];

interface GalleryPageProps {
  search?: string;
  setSearch?: (query: string) => void;
}

const GalleryPage: React.FC<GalleryPageProps> = ({ search = '', setSearch = () => {} }) => {
  const [showFullMenu, setShowFullMenu] = useState(false);

  // Filter products by global search (applied to full menu when visible)
  const filteredGalleryItems = allGalleryItems.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Select top 3 items for the featured sections
  const topMenuItems = allGalleryItems.slice(0, 3);

  const handleViewDetailsClick = () => {
    setShowFullMenu(true);
  };

  return (
    <Box>
      {/* Our Top Menu Sections */}
      {!showFullMenu && (
        <Box sx={{
          position: 'relative',
          height: { xs: 'auto', md: '500px' },
          py: { xs: 4, md: 0 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textAlign: 'center',
          backgroundImage: `url(${galleryPng})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            bgcolor: 'rgba(0,0,0,0.5)',
          },
        }}>
          <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Our Top Menu Section
            </Typography>
            <Typography variant="h6" component="p" sx={{ mb: 4 }}>
              Discover our chef's most popular and highly-rated dishes.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 3, mb: 4 }}>
              {topMenuItems.map((item: Product) => (
                <GalleryMenuItem key={item.id} item={item} onViewDetailsClick={handleViewDetailsClick} />
              ))}
            </Box>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#ff5722',
                '&:hover': { bgcolor: '#e64a19' },
                fontSize: '1.1rem',
                px: 4,
                py: 1.5,
              }}
              onClick={handleViewDetailsClick}
            >
              View Full Menu
            </Button>
          </Container>
        </Box>
      )}
      
      {/* Full Gallery Menu (conditionally displayed) */}
      {showFullMenu && (
        <Container sx={{ py: 8 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 6 }}>
            All Menu Items
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
            {filteredGalleryItems.map((item: Product) => (
              <Box key={item.id} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)', md: '1 1 calc(25% - 18px)' }, maxWidth: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(25% - 18px)' } }}>
                {/* Using ProductCard for now, will replace with GalleryMenuItem if needed for different style */}
                <ProductCard product={item} />
              </Box>
            ))}
          </Box>
        </Container>
      )}
      {/* Food Delivery Section */}
      <FoodDeliverySection />
    </Box>
  );
}

export default GalleryPage; 