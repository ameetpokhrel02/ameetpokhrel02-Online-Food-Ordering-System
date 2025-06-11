import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Container, FormControl, InputLabel, Select, MenuItem, Drawer, IconButton, Divider, Button, SelectChangeEvent, Fade, Slide, TextField } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ProductCard from '../components/ProductCard';
import food1 from '../assets/food1.avif';
import food2 from '../assets/food2.jpg';
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
import { AddShoppingCart, ArrowBackIos, ArrowForwardIos, LocationOn } from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import vegetableBag from '../assets/vegetable.jpg';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';

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
  const mainProductImageContainerRef = useRef<HTMLDivElement>(null);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [openMap, setOpenMap] = useState(false);

  // Access cart functions
  const { addToCart } = useCart();

  // Auto-play for main product
  useEffect(() => {
    const interval = setInterval(() => {
      setMainProductIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % allProducts.length;
        setSlideDirection('right'); // Moving to next, so slide from right
        return newIndex;
      });
    }, 2500);
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
        if (potentialOrbitingProducts.length === 0) return 0;
        return (prevIndex + 1) % potentialOrbitingProducts.length;
      });
    }, 2000);
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
    const newIndex = allProducts.findIndex(p => p.id === product.id);
    if (newIndex !== -1) {
      setMainProductIndex(newIndex);
      const direction = newIndex > mainProductIndex ? 'right' : 'left';
      setSlideDirection(direction);
    }
  };

  const handleAddToCartMainProduct = () => {
    if (mainProduct) {
      console.log('Adding to cart:', mainProduct);
      addToCart(mainProduct);
    }
  };

  return (
    <Container sx={{ py: 8 }}>

      {/* Main Product Display with Orbiting Items */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        minHeight: 500,
        bgcolor: '#f5f5f5',
        borderRadius: 4,
        boxShadow: 3,
        p: 4,
        overflow: 'hidden',
        mb: 8,
      }}>
        {/* Left side: Main Product Details */}
        <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, mr: { xs: 0, md: 4 }, zIndex: 2 }}>
          <Typography variant="h4" sx={{ color: '#ff3b00', fontWeight: 700, mb: 1 }}>
            ${mainProduct?.price}
          </Typography>
          <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 2, color: '#333' }}>
            {mainProduct?.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 350, mx: { xs: 'auto', md: 'unset' } }}>
            {mainProduct?.description}
          </Typography>
          <Button variant="contained" color="primary" size="large" startIcon={<AddShoppingCart />} onClick={handleAddToCartMainProduct}>
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
            <Slide direction={slideDirection} in={true} container={mainProductImageContainerRef.current} timeout={700} >
              <Box ref={mainProductImageContainerRef} sx={{
                width: 220,
                height: 220,
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                transition: 'all 0.5s ease-in-out',
                border: '2px solid #ff3b00',
              }}>
                <img src={mainProduct?.imageUrl} alt={mainProduct?.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
            </Slide>

            {/* Previous Button */}
            <IconButton
              onClick={() => {
                setMainProductIndex((prev) => (prev - 1 + allProducts.length) % allProducts.length);
                setSlideDirection('left');
              }}
              sx={{
                position: 'absolute',
                left: { xs: 0, md: -60 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 5,
                color: '#ff3b00',
                bgcolor: 'rgba(255,255,255,0.7)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              }}
            >
              <ArrowBackIos />
            </IconButton>

            {/* Next Button */}
            <IconButton
              onClick={() => {
                setMainProductIndex((prev) => (prev + 1) % allProducts.length);
                setSlideDirection('right');
              }}
              sx={{
                position: 'absolute',
                right: { xs: 0, md: -60 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 5,
                color: '#ff3b00',
                bgcolor: 'rgba(255,255,255,0.7)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              }}
            >
              <ArrowForwardIos />
            </IconButton>

            {/* Orbiting Small Menu Item Images */}
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
                  bgcolor: '#fff',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '2px solid #ff3b00',
                  transition: 'box-shadow 0.2s, transform 0.2s ease-in-out',
                  '&:hover': {
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                    transform: 'scale(1.1)',
                  },
                  // Positioning around the circle - adjust as needed
                  top: `calc(50% + ${150 * Math.sin((2 * Math.PI * index) / NUM_ORBITING_ITEMS)}px - 40px)`,
                  left: `calc(50% + ${150 * Math.cos((2 * Math.PI * index) / NUM_ORBITING_ITEMS)}px - 40px)`,
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
          display: { xs: 'none', md: 'flex' },
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
            onClick={() => setOpenMap(true)} // Open map on click
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
          >
            Pick-up
          </Button>
        </Box>

      </Box>
      <OffersSection />

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
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Kathmandu Map"
          ></iframe>
        </DialogContent>
      </Dialog>
      <FoodDeliverySection />
    </Container>
  );
};

export default ProductsPage;