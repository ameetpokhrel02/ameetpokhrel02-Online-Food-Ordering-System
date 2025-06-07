import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Container, FormControl, InputLabel, Select, MenuItem, Drawer, IconButton, Divider, Button, SelectChangeEvent } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ProductCard from '../components/ProductCard';
import food1 from '../assets/food1.avif';
import food2 from '../assets/food 2.jpg';
import imagePng from '../assets/image.png';
import galleryPng from '../assets/gallery.png';
import biryani from '../assets/biryani.jpg';
import lolipop from '../assets/lolipop.jpg';
import pizza from '../assets/pizza.jpg';
import momo from '../assets/momo.jpeg';
import burgerImg from '../assets/pizza.jpg';
import OffersSection from '../components/OffersSection';
import FoodDeliverySection from '../components/FoodDeliverySection';
import { Product } from '../types/product';
import { InputBase } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';

const allProducts: Product[] = [
  { id: 1, name: 'Delicious Pizza', price: '19.99', imageUrl: food1, category: 'Pizza', description: 'A delicious pizza made with the freshest ingredients.' },
  { id: 2, name: 'Tasty Burger', price: '29.50', imageUrl: food2, category: 'Burger', description: 'Juicy burger with all the fixings.' },
  { id: 3, name: 'Special Dish', price: '15.00', imageUrl: imagePng, category: 'Special', description: 'Our chef\'s special creation, a must-try!' },
  { id: 4, name: 'Yummy Dessert', price: '45.75', imageUrl: galleryPng, category: 'Dessert', description: 'Indulge in this sweet and delightful dessert.' },
  { id: 5, name: 'Classic Biryani', price: '22.00', imageUrl: biryani, category: 'Rice', description: 'Aromatic and flavorful classic biryani.' },
  { id: 6, name: 'Chicken Lollipop', price: '18.50', imageUrl: lolipop, category: 'Starter', description: 'Crispy and juicy chicken lollipops.' },
  { id: 7, name: 'Cheese Pizza', price: '21.99', imageUrl: pizza, category: 'Pizza', description: 'Extra cheesy pizza for cheese lovers.' },
  { id: 8, name: 'Steamed Momo', price: '16.00', imageUrl: momo, category: 'Dumpling', description: 'Soft and tender steamed momos with spicy sauce.' },
];

const categories = ['All', 'Pizza', 'Burger', 'Special', 'Dessert', 'Rice', 'Starter', 'Dumpling'];

interface ProductsPageProps {
  search: string;
  setSearch: (query: string) => void;
}

const heroSlides = [
  { name: 'Delicious Pizza', image: food1 },
  { name: 'Tasty Burger', image: food2 },
  { name: 'Special Dish', image: imagePng },
  { name: 'Yummy Dessert', image: galleryPng },
  { name: 'Classic Biryani', image: biryani },
  { name: 'Chicken Lollipop', image: lolipop },
  { name: 'Cheese Pizza', image: pizza },
  { name: 'Steamed Momo', image: momo },
];

const ProductsPage: React.FC<ProductsPageProps> = ({ search, setSearch }) => {
  const [sort, setSort] = useState('default');
  const [filter, setFilter] = useState('All');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [parallax, setParallax] = useState(0);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featIndex, setFeatIndex] = useState(0);
  const productsToShow = 3;
  const maxIndex = Math.max(0, allProducts.length - productsToShow);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [mainProduct, setMainProduct] = useState<Product>(allProducts[0]);
  const [orbitingProducts, setOrbitingProducts] = useState<Product[]>([]);

  // Parallax effect for hero image
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setParallax(offset * 0.3);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero slider auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Initialize orbiting products when component mounts or mainProduct changes
  useEffect(() => {
    if (mainProduct) {
      // Select other products, excluding the main one, from the same category or overall
      setOrbitingProducts(allProducts.filter(p => p.id !== mainProduct.id && p.category === mainProduct.category).slice(0, 5)); // Limit to 5 orbiting products for visual appeal
      // Fallback if not enough in the same category
      if (orbitingProducts.length < 5) {
        setOrbitingProducts(allProducts.filter(p => p.id !== mainProduct.id).slice(0,5));
      }
    }
  }, [mainProduct]);

  // Filter by global search
  let products = allProducts.filter(p => filter === 'All' || p.category === filter);
  if (sort === 'price-asc') products = [...products].sort((a, b) => Number(a.price) - Number(b.price));
  if (sort === 'price-desc') products = [...products].sort((a, b) => Number(b.price) - Number(a.price));
  products = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Fade/slide-in animation for product cards
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            setVisibleCards((prev) => (prev.includes(idx) ? prev : [...prev, idx]));
          }
        });
      },
      { threshold: 0.2 }
    );
    productRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, [products]);

  const handleSortChange = (e: SelectChangeEvent) => setSort(e.target.value as string);
  const handleFilterChange = (cat: string) => { setFilter(cat); setDrawerOpen(false); };

  const handlePrev = () => setFeatIndex((i) => Math.max(0, i - 1));
  const handleNext = () => setFeatIndex((i) => Math.min(maxIndex, i + 1));

  // Wipe animation for slider
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${featIndex * (100 / productsToShow)}%)`;
    }
  }, [featIndex, productsToShow]);

  const handleOrbitingProductClick = (product: Product) => {
    setMainProduct(product);
    setOrbitingProducts(allProducts.filter(p => p.category === product.category && p.id !== product.id));
  };

  return (
    <Container sx={{ py: 8 }}>
      {/* Hero Section with Custom Design and Animated Circular Image */}
      <Box sx={{
        position: 'relative',
        height: { xs: 'auto', md: '500px' },
        mb: 8,
        borderRadius: 4,
        overflow: 'hidden',
        bgcolor: '#2e2e2e', // Dark gray background
        color: 'white',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        p: { xs: 3, md: 6 },
        gap: { xs: 4, md: 0 },
      }}>
        {/* Left Side: Text and Search Bar (Overlay) - zIndex 1 */}
        <Box sx={{ flex: 1, zIndex: 1, textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontFamily: '"Georgia", serif', // Custom font similar to image
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem', lg: '3.5rem' },
              lineHeight: 1.2,
            }}
          >
            It is even better than an expensive cookery book
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.9rem', md: '1.1rem' },
              mb: 4,
              maxWidth: { xs: '100%', md: '450px' },
              mx: { xs: 'auto', md: 'unset' },
              color: 'rgba(255,255,255,0.8)',
            }}
          >
            Learn how to make your favorite restaurant's dishes
          </Typography>

          {/* Search Bar */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'rgba(255,255,255,0.1)',
            borderRadius: 8,
            overflow: 'hidden',
            maxWidth: { xs: '100%', sm: '500px' },
            height: 56,
            mx: { xs: 'auto', md: 'unset' },
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
          }}>
            <InputBase
              placeholder="I want to make..."
              sx={{
                ml: 2,
                flex: 1,
                color: 'white',
                '&::placeholder': {
                  color: 'rgba(255,255,255,0.7)',
                },
              }}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <Select
              value="Categories" // Placeholder, actual filtering is handled elsewhere
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{
                bgcolor: 'transparent',
                color: 'white',
                border: 'none',
                height: '100%',
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '& .MuiSelect-select': { pr: 1, pl: 2 },
                '& .MuiSvgIcon-root': { color: 'white' },
                borderLeft: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 0,
                minWidth: 120,
              }}
            >
              <MenuItem value="Categories" disabled>Categories</MenuItem>
              {categories.slice(1).map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
            <Button
              sx={{
                minWidth: 56,
                height: '100%',
                borderRadius: 8,
                bgcolor: '#4CAF50', // Green search button
                color: 'white',
                '&:hover': {
                  bgcolor: '#388E3C',
                },
              }}
            >
              <span style={{ fontSize: 24 }}>&#128269;</span> {/* Search icon */}
            </Button>
          </Box>
        </Box>

        {/* Right Side: Animated Circular Image with Wipe Hover (zIndex 0) */}
        {heroSlides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              top: '50%',
              right: { xs: '50%', md: 0 },
              transform: { xs: 'translate(50%, -50%)', md: 'translateY(-50%)' },
              width: { xs: 280, md: 400 }, // Size of the circular image
              height: { xs: 280, md: 400 },
              borderRadius: '50%',
              overflow: 'hidden',
              opacity: currentSlide === index ? 1 : 0, // Fade animation for changing images
              transition: 'opacity 1s ease-in-out',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              zIndex: 0, // Ensure it's behind text and search bar

              // Hover effects
              cursor: 'pointer',
              '& .image-wrapper': {
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden', // Crucial for image scale
                '& img': {
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease-in-out',
                },
              },
              '&:hover .image-wrapper img': {
                transform: 'scale(1.1)', // Zoom effect on image hover
              },

              '& .details-overlay': { // This will be our "wipe" effect
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: 0, // Starts at 0 width for wipe from left
                height: '100%', // Full height
                background: 'rgba(0,0,0,0.7)', // Dark overlay color
                transition: 'width 0.3s ease-in-out, opacity 0.3s ease-in-out',
                opacity: 0.9, // Slightly visible initially for better transition
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                p: 2,
                color: 'white',
              },
              '&:hover .details-overlay': {
                width: '100%', // Wipes right to 100% width
                opacity: 1, // Becomes fully opaque
              },
            }}
          >
            <Box className="image-wrapper">
              <img
                src={slide.image}
                alt={slide.name}
              />
            </Box>
            <Box className="details-overlay">
              <Typography variant="h5" fontWeight={700}>{slide.name}</Typography>
              <Typography variant="body2">Price: ${allProducts.find(p => p.name === slide.name)?.price || 'N/A'}</Typography>
              <Button variant="contained" size="small" sx={{ mt: 1 }}>View Details</Button>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Main Product Display with Orbiting Items */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        minHeight: 500,
        bgcolor: '#fefefe', // Light background for this section as in the image
        borderRadius: 4,
        boxShadow: 3,
        p: 4,
        overflow: 'hidden',
      }}>
        {/* Left side: Main Product Details */}
        <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, mr: { xs: 0, md: 4 }, zIndex: 2 }}>
          <Typography variant="h4" sx={{ color: '#ffc107', fontWeight: 700, mb: 1 }}>
            ${mainProduct?.price}
          </Typography>
          <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
            {mainProduct?.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 350, mx: { xs: 'auto', md: 'unset' } }}>
            {mainProduct?.description}
          </Typography>
          <Button variant="contained" color="primary" size="large" startIcon={<AddShoppingCart />}>
            Add to Card
          </Button>
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
            border: '1px dashed #ccc',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {/* Main Product Image (Central) */}
            <Box sx={{
              width: 220,
              height: 220,
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              transition: 'all 0.5s ease-in-out',
            }}>
              <img src={mainProduct?.imageUrl} alt={mainProduct?.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>

            {/* Orbiting Small Product Images */}
            {orbitingProducts.map((product, index) => (
              <Box
                key={product.id}
                onClick={() => handleOrbitingProductClick(product)}
                sx={{
                  position: 'absolute',
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  bgcolor: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // Positioning around the circle - adjust as needed
                  top: `calc(50% + ${180 * Math.sin((2 * Math.PI * index) / orbitingProducts.length)}px - 40px)`,
                  left: `calc(50% + ${180 * Math.cos((2 * Math.PI * index) / orbitingProducts.length)}px - 40px)`,
                }}
              >
                <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Product Listing Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Our Products
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton 
            onClick={() => setDrawerOpen(true)} 
            sx={{ 
              display: { xs: 'inline-flex', md: 'none' },
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            <FilterListIcon />
          </IconButton>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Sort By</InputLabel>
            <Select 
              value={sort} 
              label="Sort By" 
              onChange={handleSortChange}
              sx={{
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="price-asc">Price: Low to High</MenuItem>
              <MenuItem value="price-desc">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 4 }}>
        {/* Sidebar: Search + Categories */}
        <Box sx={{
          minWidth: 260,
          maxWidth: 300,
          bgcolor: '#fff',
          borderRadius: 4,
          p: 3,
          mr: 2,
          boxShadow: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          height: 'fit-content',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: 4,
          },
        }}>
          {/* Search Bar */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 4, 
            bgcolor: '#f5f5f5', 
            borderRadius: 3, 
            px: 2, 
            py: 1,
            transition: 'all 0.3s ease-in-out',
            '&:focus-within': {
              transform: 'scale(1.02)',
              boxShadow: 1,
            },
          }}>
            <input
              type="text"
              placeholder="Search Item"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#222',
                fontSize: 18,
                flex: 1,
              }}
            />
            <span style={{ color: '#888', fontSize: 22, marginLeft: 8 }}>&#128269;</span>
          </Box>
          <Typography variant="h5" sx={{ color: '#222', fontWeight: 700, mb: 2, fontFamily: 'cursive, Nunito, sans-serif' }}>
            Category:
          </Typography>
          <Divider sx={{ bgcolor: '#eee', mb: 2 }} />
          {categories.map((cat) => (
            <Button
              key={cat}
              variant="text"
              color="inherit"
              sx={{
                justifyContent: 'flex-start',
                color: filter === cat ? '#ff3b00' : '#222',
                fontWeight: filter === cat ? 700 : 400,
                fontSize: 18,
                borderRadius: 2,
                mb: 1,
                textTransform: 'none',
                pl: 0,
                transition: 'all 0.3s ease-in-out',
                '&:hover': { 
                  color: '#ff3b00', 
                  background: 'rgba(255,59,0,0.07)',
                  transform: 'translateX(5px)',
                },
              }}
              onClick={() => handleFilterChange(cat)}
              fullWidth
            >
              {cat}
            </Button>
          ))}
        </Box>

        {/* Product Grid */}
        <Box sx={{ flex: 1 }}>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 4,
          }}>
            {products.map((product, idx) => (
              <Box 
                key={product.id} 
                ref={(el: HTMLDivElement | null) => { productRefs.current[idx] = el; }} 
                data-idx={idx} 
                sx={{ 
                  opacity: visibleCards.includes(idx) ? 1 : 0, 
                  transform: visibleCards.includes(idx) ? 'none' : 'translateY(40px)', 
                  transition: 'all 0.7s cubic-bezier(.4,2,.3,1)',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <ProductCard product={product} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Offers Section */}
      <OffersSection />

      {/* Food Delivery Section */}
      <FoodDeliverySection />
    </Container>
  );
};

export default ProductsPage;