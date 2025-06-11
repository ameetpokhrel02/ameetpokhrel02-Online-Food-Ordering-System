import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Container, Button, Paper, Fade, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { CheckCircleOutline as CheckCircleOutlineIcon } from '@mui/icons-material'; // Placeholder icon
import ProductCard from '../components/ProductCard'; // Assuming ProductCard is used here too
import food1 from '../assets/food1.avif';
import food2 from '../assets/food2.jpg';
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
import { ArrowBackIos, ArrowForwardIos, LocationOn } from '@mui/icons-material';
import { Product } from '../types/product'; // Import the shared Product interface
import vegetableBag from '../assets/vegetable.jpg'; // Added vegetableBag import
import TextField from '@mui/material/TextField'; // Added TextField import
import Dialog from '@mui/material/Dialog'; // Added Dialog import
import DialogContent from '@mui/material/DialogContent'; // Added DialogContent import
import DialogTitle from '@mui/material/DialogTitle'; // Added DialogTitle import
import CloseIcon from '@mui/icons-material/Close'; // Added CloseIcon import

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
  const products: Product[] = [
    { id: 1, name: 'Delicious Pizza', price: '19.99', imageUrl: food1, description: 'A delicious pizza made with the freshest ingredients.' },
    { id: 2, name: 'Tasty Burger', price: '29.50', imageUrl: food2, description: 'Juicy burger with all the fixings.' },
    { id: 3, name: 'Special Dish', price: '15.00', imageUrl: imagePng, description: 'Our chef\'s special creation, a must-try!' },
    { id: 4, name: 'Yummy Dessert', price: '45.75', imageUrl: galleryPng, description: 'Indulge in this sweet and delightful dessert.' },
    { id: 5, name: 'Classic Biryani', price: '22.00', imageUrl: biryani, description: 'Aromatic and flavorful classic biryani.' },
    { id: 6, name: 'Chicken Lollipop', price: '18.50', imageUrl: lolipop, description: 'Crispy and juicy chicken lollipops.' },
    { id: 7, name: 'Cheese Pizza', price: '21.99', imageUrl: pizza, description: 'Extra cheesy pizza for cheese lovers.' },
    { id: 8, name: 'Steamed Momo', price: '16.00', imageUrl: momo, description: 'Soft and tender steamed momos with spicy sauce.' },
  ];

  // Filter products by search
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // --- HERO SECTION STATE ---
  const [featuredIndex, setFeaturedIndex] = useState(0); // Start with the first item
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [openMap, setOpenMap] = useState(false); // State to control map dialog visibility

  // Get the featured product from heroItems instead of products
  const featuredProduct = heroItems[featuredIndex];

  console.log('Featured Product:', featuredProduct);

  // Auto-play effect for hero section
  useEffect(() => {
    console.log('Setting auto-play timer for featuredIndex:', featuredIndex);
    timerRef.current = setTimeout(() => {
      console.log('Auto-play timer fired. Calling handleNextFeatured.');
      handleNextFeatured();
    }, AUTO_PLAY_INTERVAL);
    return () => {
      if (timerRef.current) {
        console.log('Clearing auto-play timer for featuredIndex:', featuredIndex);
        clearTimeout(timerRef.current);
      }
    };
    // eslint-disable-next-line
  }, [featuredIndex]);

  const handleNextFeatured = () => {
    console.log('handleNextFeatured called.');
    setAnimating(true);
    setTimeout(() => {
      setFeaturedIndex((prev) => (prev + 1) % heroItems.length);
      setAnimating(false);
    }, 400);
  };

  const handlePrevFeatured = () => {
    setAnimating(true);
    setTimeout(() => {
      setFeaturedIndex((prev) => (prev - 1 + heroItems.length) % heroItems.length);
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
          <Box sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'visible',
            minHeight: 320,
          }}>
            {/* Previous Button */}
            <IconButton
              onClick={handlePrevFeatured}
              sx={{
                position: 'absolute',
                left: { xs: 0, md: -60 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 5,
                color: 'primary.main',
                bgcolor: 'rgba(255,255,255,0.7)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              }}
            >
              <ArrowBackIos />
            </IconButton>

            {/* Next Button */}
            <IconButton
              onClick={handleNextFeatured}
              sx={{
                position: 'absolute',
                right: { xs: 0, md: -60 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 5,
                color: 'primary.main',
                bgcolor: 'rgba(255,255,255,0.7)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              }}
            >
              <ArrowForwardIos />
            </IconButton>

            {/* Main featured image with parallax */}
            {heroItems.map((item, idx) => (
              <Box
                key={item.name}
                sx={{
                  position: 'absolute',
                  width: '100%',
                  maxWidth: { xs: 300, md: 400 },
                  maxHeight: { xs: 300, md: 340 },
                  borderRadius: '50%',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px #0002',
                  opacity: idx === featuredIndex ? 1 : 0,
                  zIndex: idx === featuredIndex ? 2 : 1,
                  transform: `scale(${idx === featuredIndex ? 1 : 0.98})`,
                  transition: 'opacity 0.7s cubic-bezier(.4,2,.3,1), transform 0.7s cubic-bezier(.4,2,.3,1)',
                  willChange: 'transform, opacity',
                }}
              >
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
            ))}
            {/* Food name overlay (for mobile) */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, position: 'absolute', bottom: 16, left: 0, right: 0, justifyContent: 'center', zIndex: 3 }}>
              <Typography variant="h5" sx={{ bgcolor: 'rgba(0,0,0,0.5)', color: '#fff', px: 2, py: 1, borderRadius: 2 }}>
                {heroItems[featuredIndex].name}
              </Typography>
            </Box>

            {/* Circular thumbnail images positioned in an arc */}
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
                      transition: 'box-shadow 0.2s, border 0.2s, transform 0.2s ease-in-out',
                      '&:hover': { 
                        boxShadow: '0 8px 24px #ff3b0033', 
                        border: '3px solid #ff3b00',
                        transform: 'scale(1.1)',
                      },
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

      {/* --- CATEGORY SECTION --- */}
      <Container sx={{ py: 8 }}>
        {/* Add Category Content Here */}
      </Container>

      {/* --- FEATURED PRODUCTS SECTION --- */}
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
          {products.map((product: Product) => (
            <Box key={product.id}>
              <ProductCard product={product} />
            </Box>
          ))}
        </Box>
      </Container>

      {/* New Order Section */}
      <Box sx={{
        bgcolor: '#e0eaf4', // Light blue-grey background for the entire section area
        py: { xs: 10, md: 15 }, // Vertical padding for the outer box
        mt: 8, // Margin top to separate from previous section
        position: 'relative', // For absolute positioning of address bar and image
        pb: 15, // Padding bottom to accommodate the overlapping address bar
        borderRadius: 4, // Match overall section border radius if any
        overflow: 'hidden' // Keep overflow hidden for outer box to contain decorative elements and main image
      }}>
        {/* Main Content Box (White Card) */}
        <Box sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          py: { xs: 8, md: 12 },
          px: { xs: 2, md: 4 },
          bgcolor: '#fff', // White background for the inner card-like section
          borderRadius: 4,
          boxShadow: 3,
          overflow: 'visible', // Allow content to overflow (specifically the image if needed)
          minHeight: 400,
          maxWidth: 1000, // Adjusted maxWidth for inner white card
          mx: 'auto',
        }}>
          {/* Decorative elements (relative to this white box) */}
          <Box sx={{
            position: 'absolute',
            top: 30,
            left: '15%',
            width: 30,
            height: 30,
            bgcolor: '#f44336',
            transform: 'rotate(45deg)',
            opacity: 0.8,
            '&::before': { content: '""' , position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%) rotate(90deg)', width: '100%', height: '100%', bgcolor: '#f44336' },
          }} />
           <Box sx={{
            position: 'absolute',
            top: '20%',
            right: '30%',
            width: 20,
            height: 20,
            bgcolor: '#f44336',
            transform: 'rotate(45deg)',
            opacity: 0.8,
            '&::before': { content: '""' , position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%) rotate(90deg)', width: '100%', height: '100%', bgcolor: '#f44336' },
          }} />
           <Box sx={{
            position: 'absolute',
            bottom: '10%',
            left: '35%',
            width: 15,
            height: 15,
            bgcolor: '#f44336',
            transform: 'rotate(45deg)',
            opacity: 0.8,
            '&::before': { content: '""' , position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%) rotate(90deg)', width: '100%', height: '100%', bgcolor: '#f44336' },
          }} />
          <Box sx={{
            position: 'absolute',
            top: '20%',
            left: '5%',
            width: 50,
            height: 50,
            borderRadius: '50%',
            bgcolor: '#ffc107',
            opacity: 0.8,
          }} />
          <Box sx={{
            position: 'absolute',
            bottom: '10%',
            right: '5%',
            width: 25,
            height: 25,
            borderRadius: '50%',
            bgcolor: '#f44336',
            opacity: 0.8,
          }} />

          <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', zIndex: 1 }}>
            {/* Left Content */}
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, mb: { xs: 4, md: 0 }, pr: { md: 4 } }}>
              <Typography variant="overline" sx={{ color: '#f44336', fontWeight: 600, letterSpacing: 1.5, display: 'block', mb: 1 }}>
                ONLINE FOOD DELIVERY
              </Typography>
              <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '3rem', md: '4.5rem' }, fontWeight: 900, lineHeight: 1.1, mb: 2 }}>
                <Box component="span" sx={{ color: '#333' }}>Don't Strave</Box><br />
                <Box component="span" sx={{ color: '#f44336' }}>Just Order</Box>
              </Typography>
              <Box sx={{ borderLeft: '4px solid #f44336', pl: 2, mb: 4, maxWidth: 400, mx: { xs: 'auto', md: 0 } }}>
                <Typography variant="body1" sx={{ color: '#666' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' }, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#f44336',
                    color: '#fff',
                    '&:hover': { bgcolor: '#d32f2f' },
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: '1rem',
                  }}
                >
                  Order Now <Box component="span" sx={{ ml: 1 }}>&gt;</Box>
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: '#ddd',
                    color: '#666',
                    '&:hover': { borderColor: '#f44336', color: '#f44336' },
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: '1rem',
                  }}
                >
                  Know more
                </Button>
              </Box>
            </Box>
            {/* Right side is empty within this container, image is outside */}
          </Container>
        </Box>

        {/* Main Vegetable Image (positioned relative to outermost Box) */}
        <Box sx={{
          position: 'absolute',
          bottom: -20, // Adjusted from -100
          right: -100, // Adjusted from -250
          width: { xs: '100%', md: '600px' }, // Adjusted from 800px
          height: 'auto',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          pointerEvents: 'none', // Ensure text/buttons are clickable
          zIndex: 0, // Keep it behind the content
        }}>
          <img src={vegetableBag} alt="Vegetables in bag" style={{
            width: '100%',
            height: 'auto',
            maxHeight: '550px', // Adjusted from 750px
            objectFit: 'contain',
            filter: 'drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.3))',
          }} />
        </Box>

        {/* Address Input Section (positioned relative to outermost Box) */}
        <Box sx={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: { xs: '90%', sm: '80%', md: '70%' },
          maxWidth: 900,
          bgcolor: '#fff',
          borderRadius: 4,
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
          zIndex: 2, // Ensure it's above the main content box and image
        }}>
          <LocationOn sx={{ color: '#f44336', fontSize: 28, ml: 1 }} />
          <TextField
            variant="standard"
            placeholder="Enter your full address..."
            sx={{
              flex: 1,
              '.MuiInputBase-input': { padding: '10px 0', fontSize: '1rem', color: '#333' },
              '.MuiInputBase-input::placeholder': { color: '#999', opacity: 1 },
              '& .MuiInputBase-root:before': { borderBottom: 'none' },
              '& .MuiInputBase-root:after': { borderBottom: 'none' },
              '&:hover .MuiInputBase-root:before': { borderBottom: 'none !important' },
            }}
            InputProps={{
              disableUnderline: true,
            }}
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: '#f44336',
              color: '#fff',
              '&:hover': { bgcolor: '#d32f2f' },
              px: 3,
              py: 1.2,
              borderRadius: 2,
              fontWeight: 600,
              minWidth: 100,
            }}
          >
            Delivery
          </Button>
          <Typography variant="body2" sx={{ mx: 1, color: '#999' }}>
            or
          </Typography>
          <Button
            variant="outlined"
            sx={{
              borderColor: '#ddd',
              color: '#666',
              '&:hover': { borderColor: '#f44336', color: '#f44336' },
              px: 3,
              py: 1.2,
              borderRadius: 2,
              fontWeight: 600,
              minWidth: 100,
            }}
            onClick={() => setOpenMap(true)} // Open map on click
          >
            Pick-up
          </Button>
        </Box>

      </Box>
      <FaqSection />

      {/* Kathmandu Map Dialog */}
      <Dialog open={openMap} onClose={() => setOpenMap(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Select your location in Kathmandu
          <IconButton onClick={() => setOpenMap(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0, height: 400, width: '100%' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14129.277028169824!2d85.31846985!3d27.7052955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19875f280a9d%3A0xc47b952f1e68787c!2sKathmandu!5e0!3m2!1sen!2snp!4v1678901234567!5m2!1sen!2snp"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Kathmandu Map"
          ></iframe>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default HomePage; 