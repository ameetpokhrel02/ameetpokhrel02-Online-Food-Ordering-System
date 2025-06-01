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

const carouselItems = [
  { image: food1, name: 'Delicious Pizza' },
  { image: food2, name: 'Tasty Burger' },
  { image: imagePng, name: 'Special Dish' },
  { image: galleryPng, name: 'Yummy Dessert' },
];

interface HomePageProps {
  search: string;
  setSearch: (query: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ search, setSearch }) => {
  // Carousel state for hero background (removed as per new design)
  // const [current, setCurrent] = useState(0);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrent((prev) => (prev + 1) % carouselItems.length);
  //   }, 3500);
  //   return () => clearInterval(interval);
  // }, []);

  // Use the same product images as ProductsPage
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

  // Animation state for hero section (removed as per new design)
  // const [heroVisible, setHeroVisible] = useState(false);
  // useEffect(() => {
  //   const timer = setTimeout(() => setHeroVisible(true), 200);
  //   return () => clearTimeout(timer);
  // }, []);

  // Featured Products slider state (for the section below Hero)
  const [featIndex, setFeatIndex] = useState(0);
  const productsToShow = 3;
  const maxIndex = Math.max(0, products.length - productsToShow);
  const sliderRef = useRef<HTMLDivElement>(null);
  const prevFeatIndex = useRef(featIndex); // To track previous index for animation direction

  const handlePrev = () => setFeatIndex((i) => Math.max(0, i - 1));
  const handleNext = () => setFeatIndex((i) => Math.min(maxIndex, i + 1));

  // Update slider position and add card animations (for the section below Hero)
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transition = 'transform 0.7s cubic-bezier(.4,2,.3,1)';
      sliderRef.current.style.transform = `translateX(-${featIndex * (100 / productsToShow)}%)`;
    }
  }, [featIndex, productsToShow]);

  // State for the currently featured product in the Hero section
  const [featuredProduct, setFeaturedProduct] = useState(products[0]); // Start with the first product

  // Products to show in the circular arc (excluding the featured one)
  const circularProducts = products.filter(p => p.id !== featuredProduct.id).slice(0, 4); // Get up to 4 other products

  return (
    <Box>
      {/* Hero Section based on Dribbble design */}
      <Box
        sx={{
          position: 'relative',
          minHeight: 'calc(100vh - 64px)',
          bgcolor: '#fff8f5', // Light pink background
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          pb: 8, // Add padding at the bottom
          pt: 8, // Add padding at the top
        }}
      >
        {/* Large curved background shape */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '80%', // Adjust size as needed
            height: '100%',
            bgcolor: '#ffe0d9', // Slightly darker pink
            borderRadius: '0 0 0 50%', // Curved bottom left corner
            zIndex: 1,
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4 }}>
          {/* Left Content: Title, Price, Description, Button */}
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h2" component="h1" sx={{ fontWeight: 700, fontSize: { xs: '3rem', md: '4rem', lg: '5rem' }, mb: 2, color: '#ff3b00' }}>
              {featuredProduct.name}
            </Typography>
            <Typography variant="h4" component="p" sx={{ fontWeight: 600, mb: 2, color: '#222' }}>
              ${featuredProduct.price}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', maxWidth: 400, mx: { xs: 'auto', md: 0 } }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                borderRadius: 25,
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                bgcolor: '#ff3b00',
                '&:hover': { bgcolor: '#c1452b' },
              }}
            >
              Order Now
            </Button>
          </Box>

          {/* Right Content: Main Image and Circular Images */}
          <Box sx={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
            {/* Main Food Image */}
            <Box
              sx={{
                width: 380, // Adjust size
                height: 380, // Adjust size
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
                 transform: 'scale(1)',
                 opacity: 1,
              }}
            >
              <img
                src={featuredProduct.imageUrl}
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
              width: '100%', // Adjusted width for better positioning
              height: '100%', // Adjusted height for better positioning
              top: 0,
              left: 0,
              zIndex: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
                {circularProducts.map((product, index) => (
                 <Box
                   key={product.id}
                   onClick={() => setFeaturedProduct(product)}
                   sx={{
                     position: 'absolute',
                     width: 80,
                     height: 80,
                     borderRadius: '50%',
                     overflow: 'hidden',
                     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                     cursor: 'pointer',
                     transition: 'all 0.3s ease-in-out',
                     '&:hover': { transform: 'scale(1.1)' },
                      background: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      // Positioning (adjust as needed for arc effect)
                      top: `${50 + (-1) * (index * 15)}%`,
                      left: `${50 + (index * 18)}%`,
                       transform: 'translate(-50%, -50%)',

                   }}
                 >
                   <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                 </Box>
               ))}
                 {/* Add dashed lines here if needed */}
            </Box>
             {/* Scroll Down Icons */}
             <Box sx={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 2, zIndex: 4 }}>
                <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.5)', '&:hover': { bgcolor: 'rgba(255,255,255,0.8)' } }}><ArrowDownwardIcon /></IconButton>
                 <IconButton sx={{ bgcolor: 'rgba(0,0,0,0.2)', color: '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' } }}><ArrowDownwardIcon /></IconButton>
            </Box>
          </Box>
        </Container>
      </Box>

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