import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Container, Button, Paper, Fade, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { CheckCircleOutline as CheckCircleOutlineIcon } from '@mui/icons-material'; // Placeholder icon
import ProductCard from '../components/ProductCard'; // Assuming ProductCard is used here too
import food1 from '../assets/food1.avif';
import food2 from '../assets/food 2.jpg';
import imagePng from '../assets/image.png';
import galleryPng from '../assets/gallery.png';
import deliveryGif from '../assets/delivery.gif';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import biryani from '../assets/biryani.jpg';
import lolipop from '../assets/lolipop.jpg';
import pizza from '../assets/pizza.jpg';
import momo from '../assets/momo.jpeg';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import girlcarryingvegetables from '../assets/girlcarryingvegetables.jpg';
import OffersSection from '../components/OffersSection';
import FaqSection from '../components/FaqSection';
import FoodDeliverySection from '../components/FoodDeliverySection';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const carouselItems = [
  { image: food1, name: 'Delicious Pizza' },
  { image: food2, name: 'Tasty Burger' },
  { image: imagePng, name: 'Special Dish' },
  { image: galleryPng, name: 'Yummy Dessert' },
];

// --- HERO CAROUSEL DATA ---
const heroItems = [
  {
    name: 'Classic Biryani',
    price: 22.0,
    desc: 'Aromatic rice dish with tender meat and spices.',
    image: biryani,
  },
  {
    name: 'Delicious Pizza',
    price: 18.0,
    desc: 'A classic Italian pizza with fresh ingredients and a crispy crust.',
    image: pizza,
  },
  {
    name: 'Steamed Momo',
    price: 16.0,
    desc: 'Soft dumplings filled with savory goodness.',
    image: momo,
  },
  {
    name: 'Chicken Lollipop',
    price: 18.5,
    desc: 'Crispy fried chicken lollipops, a spicy treat.',
    image: lolipop,
  },
  {
    name: 'Tasty Burger',
    price: 29.5,
    desc: 'Juicy burger with fresh veggies and special sauce.',
    image: food2,
  },
  {
    name: 'Special Dish',
    price: 15.0,
    desc: 'A chef special with a unique blend of flavors.',
    image: imagePng,
  },
];

const AUTO_PLAY_INTERVAL = 4000;

interface HomePageProps {
  search: string;
  setSearch: (query: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ search, setSearch }) => {
  const products = [
    { id: 1, name: 'Delicious Pizza', price: '19.99', imageUrl: food1 },
    { id: 2, name: 'Tasty Burger', price: '29.50', imageUrl: food2 },
    { id: 3, name: 'Special Dish', price: '15.00', imageUrl: imagePng },
    { id: 4, name: 'Yummy Dessert', price: '45.75', imageUrl: galleryPng },
    { id: 5, name: 'Classic Biryani', price: '22.00', imageUrl: biryani },
    { id: 6, name: 'Chicken Lollipop', price: '18.50', imageUrl: lolipop },
    { id: 7, name: 'Cheese Pizza', price: '21.99', imageUrl: pizza },
    { id: 8, name: 'Steamed Momo', price: '16.00', imageUrl: momo },
  ];

  // Filter products by search
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // --- HERO SECTION STATE ---
  const [featuredIndex, setFeaturedIndex] = useState(0); // Start with the first item
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Get the featured product from heroItems instead of products
  const featuredProduct = heroItems[featuredIndex];

  console.log('Featured Product:', featuredProduct);

  // Auto-play effect for hero section
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      handleNextFeatured();
    }, AUTO_PLAY_INTERVAL);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line
  }, [featuredIndex]);

  const handleNextFeatured = () => {
    setAnimating(true);
    setTimeout(() => {
      setFeaturedIndex((prev) => (prev + 1) % heroItems.length);
      setAnimating(false);
    }, 400);
  };

  const handleSelectFeatured = (idx: number) => {
    if (idx === featuredIndex) return;
    if (timerRef.current) clearTimeout(timerRef.current); // Reset timer immediately
    setAnimating(true);
    setTimeout(() => {
      setFeaturedIndex(idx);
      setAnimating(false);
    }, 400);
  };

  // Arc positioning for small images (spread evenly around a circle, but only show a subset in a visible arc)
  const arcCount = 5; // Number of small images to show in the arc
  const arcRadius = 220; // Distance from center of main image
  const arcStart = -40; // Start angle in degrees (left)
  const arcEnd = 40; // End angle in degrees (right)
  const arcIndexes = products
    .map((_, idx) => idx)
    .filter(idx => idx !== featuredIndex)
    .slice(0, arcCount);

  return (
    <Box>
      {/* --- HERO SECTION (fixed arc and manual change) --- */}
      <Box
        sx={{
          position: 'relative',
          minHeight: 'calc(100vh - 64px)',
          background: 'linear-gradient(135deg, #fff8f5 0%, #fff 100%)',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          pb: 8,
          pt: 8,
        }}
      >
        {/* Large curved background shape with gradient */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '80%',
            height: '100%',
            background: 'linear-gradient(135deg, #FFE0D9 0%, #FFD6CF 100%)',
            borderRadius: '0 0 0 50%',
            zIndex: 1,
            opacity: 0.9,
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4 }}>
          {/* Left Content: Title, Price, Description, Button */}
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            {/* Conditionally render content only if featuredProduct is defined */}
            {featuredProduct ? (
              <>
                <Typography 
                  variant="h2" 
                  component="h1" 
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4.5rem' },
                    mb: 2,
                    color: 'primary.main',
                    transition: 'all 0.4s ease',
                    opacity: animating ? 0 : 1,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  {featuredProduct.name}
                </Typography>
                <Typography 
                  variant="h4" 
                  component="p" 
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: 'secondary.main',
                    transition: 'all 0.4s ease',
                    opacity: animating ? 0 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <span style={{ color: 'primary.main' }}>$</span>
                  {featuredProduct.price}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{
                    mb: 4,
                    color: 'text.secondary',
                    maxWidth: 400,
                    mx: { xs: 'auto', md: 0 },
                    transition: 'all 0.4s ease',
                    opacity: animating ? 0 : 1,
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                  }}
                >
                  {featuredProduct.desc}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    borderRadius: '25px',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    background: 'linear-gradient(45deg, #FF4B2B 30%, #FF6B4B 90%)',
                    boxShadow: '0 3px 12px rgba(255, 75, 43, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #E63B1B 30%, #FF4B2B 90%)',
                      boxShadow: '0 6px 16px rgba(255, 75, 43, 0.4)',
                    },
                    transition: 'all 0.4s ease',
                    opacity: animating ? 0 : 1,
                  }}
                >
                  Order Now
                </Button>
              </>
            ) : (
              // Optional: Render a loading state or placeholder if featuredProduct is undefined
              <Typography variant="h6" color="text.secondary">Loading product details...</Typography>
            )}
          </Box>

          {/* Right Content: Main Image and Circular Images */}
          <Box sx={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
            {/* Main Food Image */}
            <Box
              sx={{
                width: 380,
                height: 380,
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 16px 32px rgba(0,0,0,0.2)',
                position: 'relative',
                zIndex: 3,
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.8s cubic-bezier(.4,2,.3,1), opacity 0.8s cubic-bezier(.4,2,.3,1)',
                transform: animating ? 'scale(0.92)' : 'scale(1)',
                opacity: animating ? 0 : 1,
              }}
            >
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>

            {/* Circular Images in Arc */}
            <Box sx={{
              position: 'absolute',
              width: 380,
              height: 380,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 4,
              pointerEvents: animating ? 'none' : 'auto',
            }}>
              {arcIndexes.map((idx, i) => {
                // Spread arcCount images from arcStart to arcEnd degrees
                const angle = arcStart + ((arcEnd - arcStart) * i) / (arcCount - 1);
                const rad = (angle * Math.PI) / 180;
                const x = 190 + arcRadius * Math.cos(rad) - 40; // 40 = half of small image size
                const y = 190 + arcRadius * Math.sin(rad) - 40;
                return (
                  <Box
                    key={products[idx].id}
                    onClick={() => handleSelectFeatured(idx)}
                    sx={{
                      position: 'absolute',
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      cursor: 'pointer',
                      background: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      left: x,
                      top: y,
                      border: '3px solid #ffe0d9',
                      zIndex: 5,
                      transition: 'box-shadow 0.2s, border 0.2s',
                      '&:hover': { boxShadow: '0 8px 24px #ff3b0033', border: '3px solid #ff3b00' },
                    }}
                  >
                    <img src={products[idx].imageUrl} alt={products[idx].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Container>
      </Box>
      {/* --- END HERO SECTION --- */}

      {/* About Us Section */}
      <Container sx={{ py: 8 }}>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: 6,
          bgcolor: '#f6fcf7',
          borderRadius: 4,
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          px: { xs: 2, md: 6 },
          py: { xs: 4, md: 6 },
        }}>
          {/* Left: Content */}
          <Box sx={{ flex: 2, pr: { md: 6 }, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="subtitle1" sx={{ color: '#4caf50', fontWeight: 600, mb: 1 }}>
              Farming with Love
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: '#222' }}>
              Organic & healthy fresh<br />food provider
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Box sx={{ bgcolor: '#e8f5e9', color: '#388e3c', px: 2.5, py: 1, borderRadius: 99, fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', boxShadow: 1 }}>
                <span role="img" aria-label="leaf" style={{ marginRight: 8 }}>🌱</span> The natural products
              </Box>
              <Box sx={{ bgcolor: '#fffde7', color: '#fbc02d', px: 2.5, py: 1, borderRadius: 99, fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', boxShadow: 1 }}>
                <span role="img" aria-label="sun" style={{ marginRight: 8 }}>🌞</span> Everyday fresh food
              </Box>
            </Box>
            <Typography variant="body1" sx={{ mb: 2, color: '#555' }}>
              We connect buyers and sellers of natural, organic products who are so beguiled demoralized charme of pleasure
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: '#888' }}>
              Velit wisi et lacus pharetra pulvinar tempus massa sed. Turpis consectetur justo accumsan ac nunc ornare viverra pharetra. Lorem elementum mauris morbi cursus tellus ullamcorper.
            </Typography>
            <Box sx={{ bgcolor: '#e0f7fa', color: '#00796b', px: 3, py: 2, borderRadius: 2, mb: 3, fontWeight: 500, fontSize: '1.1rem', display: 'inline-block' }}>
              Every day fresh and quality products for you deliver at doorstep
            </Box>
            <br />
            <Button variant="contained" color="primary" size="large" component={Link} to="/about" sx={{ mt: 2, borderRadius: 25, px: 5, py: 1.5, fontWeight: 600, fontSize: '1.1rem', bgcolor: '#ff3b00', '&:hover': { bgcolor: '#c1452b' } }}>
              Explore Us
            </Button>
          </Box>
          {/* Right: Image */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', mt: { xs: 4, md: 0 } }}>
            <Box
              component="img"
              src={girlcarryingvegetables}
              alt="Girl carrying vegetables"
              sx={{
                width: { xs: '80%', md: 340 },
                maxWidth: 400,
                borderRadius: '24px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
                objectFit: 'cover',
                background: '#fff',
              }}
            />
          </Box>
        </Box>
      </Container>

      {/* Featured Products Section as horizontal slider */}
      <Container sx={{ py: 8 }}>
        <Box className="section-title">
          <Typography variant="h4" component="h2" gutterBottom>
            Featured Products
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Explore some of our popular items.
          </Typography>
        </Box>
        {/* Change to Grid Layout */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, // 1 to 3 columns based on screen size
          gap: 4,
          mt: 4,
        }}>
          {products.map((product) => (
            <Box key={product.id}>
              <ProductCard product={product} />
            </Box>
          ))}
        </Box>
      </Container>
      <OffersSection />
      <FoodDeliverySection />
      <FaqSection />
    </Box>
  );
};

export default HomePage; 