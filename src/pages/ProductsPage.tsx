import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Container, FormControl, InputLabel, Select, MenuItem, Drawer, IconButton, Divider, Button, SelectChangeEvent, Fade } from '@mui/material';
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
import { AddShoppingCart, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useCart } from '../context/CartContext';

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
  const [sliderRef] = useState(useRef<HTMLDivElement>(null));
  const [mainProductIndex, setMainProductIndex] = useState(0);
  const [mainProduct, setMainProduct] = useState<Product>(allProducts[mainProductIndex]);
  const [orbitingProducts, setOrbitingProducts] = useState<Product[]>([]);
  const [orbitingStartIndex, setOrbitingStartIndex] = useState(0);
  const NUM_ORBITING_ITEMS = 5;

  // Access cart functions
  const { addToCart } = useCart();

  // Auto-play for main product
  useEffect(() => {
    const interval = setInterval(() => {
      setMainProductIndex((prevIndex) => (prevIndex + 1) % allProducts.length);
    }, 2500); // Change product every 2.5 seconds
    return () => clearInterval(interval);
  }, []);

  // Update mainProduct when mainProductIndex changes
  useEffect(() => {
    setMainProduct(allProducts[mainProductIndex]);
  }, [mainProductIndex]);

  // Auto-play for orbiting products
  useEffect(() => {
    const orbitInterval = setInterval(() => {
      setOrbitingStartIndex((prevIndex) => {
        const potentialOrbitingProducts = allProducts.filter(p => p.id !== mainProduct.id);
        if (potentialOrbitingProducts.length === 0) return 0; // Handle empty array
        return (prevIndex + 1) % potentialOrbitingProducts.length;
      });
    }, 2000); // Orbiting items change every 2 seconds
    return () => clearInterval(orbitInterval);
  }, [allProducts, mainProduct]);

  // Update orbitingProducts when mainProduct or orbitingStartIndex changes
  useEffect(() => {
    if (mainProduct) {
      const potentialOrbitingProducts = allProducts.filter(p => p.id !== mainProduct.id);
      const visibleOrbitingProducts: Product[] = [];
      const itemsToSlice = Math.min(NUM_ORBITING_ITEMS, potentialOrbitingProducts.length);

      for (let i = 0; i < itemsToSlice; i++) {
        const index = (orbitingStartIndex + i) % potentialOrbitingProducts.length;
        if (potentialOrbitingProducts[index]) {
          visibleOrbitingProducts.push(potentialOrbitingProducts[index]);
        }
      }
      setOrbitingProducts(visibleOrbitingProducts);
    }
  }, [mainProduct, orbitingStartIndex, allProducts]);

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
  };

  const handleAddToCartMainProduct = () => {
    if (mainProduct) {
      console.log('Adding to cart:', mainProduct);
      addToCart(mainProduct);
    }
  };

  return (
    <Container sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{
        position: 'relative',
        height: { xs: 300, md: 500 },
        backgroundImage: `url(${heroSlides[currentSlide].image})`,
        backgroundSize: 'cover',
        backgroundPosition: `center ${50 + parallax}px`,
        borderRadius: 4,
        boxShadow: 3,
        mb: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        overflow: 'hidden',
        transition: 'background-image 0.5s ease-in-out',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7))',
          borderRadius: 4,
        },
      }}>
        <Typography variant="h2" component="h1" sx={{ zIndex: 1, fontWeight: 700, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          {heroSlides[currentSlide].name}
        </Typography>
        <IconButton
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          sx={{
            position: 'absolute',
            left: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            color: 'white',
            bgcolor: 'rgba(0,0,0,0.5)',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
          }}
        >
          <ArrowBackIos />
        </IconButton>
        <IconButton
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          sx={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            color: 'white',
            bgcolor: 'rgba(0,0,0,0.5)',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
          }}
        >
          <ArrowForwardIos />
        </IconButton>
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
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            startIcon={<AddShoppingCart />}
            onClick={handleAddToCartMainProduct}
          >
            Add to Cart
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

            {/* Previous Button */}
            <IconButton
              onClick={() => setMainProductIndex((prev) => (prev - 1 + allProducts.length) % allProducts.length)}
              sx={{
                position: 'absolute',
                left: -50,
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
              onClick={() => setMainProductIndex((prev) => (prev + 1) % allProducts.length)}
              sx={{
                position: 'absolute',
                right: -50,
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

            {/* Orbiting Products */}
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
                  alignItems: 'center',
                  justifyContent: 'center',
                  // Positioning around the circle - adjust as needed
                  top: `calc(50% + ${180 * Math.sin((2 * Math.PI * index) / NUM_ORBITING_ITEMS)}px - 40px)`,
                  left: `calc(50% + ${180 * Math.cos((2 * Math.PI * index) / NUM_ORBITING_ITEMS)}px - 40px)`,
                  transition: 'box-shadow 0.2s, transform 0.2s ease-in-out',
                  '&:hover': {
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                    transform: 'scale(1.1)',
                  },
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
          display: { xs: 'none', md: 'flex' }, // Hide on mobile, show on desktop
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
            pb: 8,
          }}>
            {products.map((product, index) => (
              <Fade in={visibleCards.includes(index)} key={product.id}>
                <Box data-idx={index} ref={(el: HTMLDivElement | null) => { productRefs.current[index] = el; }}>
                  <ProductCard product={product} />
                </Box>
              </Fade>
            ))}
          </Box>
        </Box>
      </Box>

      <OffersSection />
      <FoodDeliverySection />
    </Container>
  );
};

export default ProductsPage;