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

  return (
    <Container sx={{ py: 8 }}>
      {/* Hero/Slider Section with Parallax and Food Name Overlay */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', mb: 4, gap: 6, position: 'relative', minHeight: 360 }}>
        {/* Left: Text */}
        <Box sx={{ flex: 1, minWidth: 280, zIndex: 2 }}>
          <Typography variant="subtitle2" sx={{ letterSpacing: 2, mb: 2, color: 'text.secondary', fontWeight: 600 }}>
            WELCOME TO OUR RESTAURANT
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 700, fontSize: { xs: '2.2rem', md: '3.5rem', lg: '4.2rem' }, mb: 3, lineHeight: 1.1 }}>
            {heroSlides[currentSlide].name}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, maxWidth: 420 }}>
            Our burgers are made with high-quality ingredients, delivering a tasty, juicy, and satisfying meal in every bite.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Button variant="contained" color="primary" size="large" sx={{ borderRadius: 8, px: 4, fontWeight: 700 }}>Order now</Button>
            <Button variant="outlined" color="inherit" size="large" sx={{ borderRadius: 8, px: 4, fontWeight: 700, bgcolor: '#fff', color: 'text.primary', borderColor: '#eee' }}>Reservation</Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="user1" style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid #fff', marginLeft: -8, zIndex: 2 }} />
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="user2" style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid #fff', marginLeft: -8, zIndex: 1 }} />
              <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="user3" style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid #fff', marginLeft: -8, zIndex: 0 }} />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>50k+ Happy customer</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>4.9</Typography>
                <span role="img" aria-label="star">⭐</span>
                <span role="img" aria-label="star">⭐</span>
                <span role="img" aria-label="star">⭐</span>
                <span role="img" aria-label="star">⭐</span>
                <span role="img" aria-label="star">⭐</span>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Right: Parallax Main Image with Overlay */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'visible', minHeight: 320 }}>
          {heroSlides.map((slide, idx) => (
            <img
              key={slide.name}
              src={slide.image}
              alt={slide.name}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                maxWidth: 400,
                maxHeight: 340,
                borderRadius: 24,
                boxShadow: '0 8px 32px #0002',
                opacity: idx === currentSlide ? 1 : 0,
                zIndex: idx === currentSlide ? 2 : 1,
                transform: `translateY(${parallax}px) scale(${idx === currentSlide ? 1 : 0.98})`,
                transition: 'opacity 0.7s cubic-bezier(.4,2,.3,1), transform 0.7s cubic-bezier(.4,2,.3,1)',
                willChange: 'transform, opacity',
              }}
            />
          ))}
          {/* Food name overlay (for mobile) */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, position: 'absolute', bottom: 16, left: 0, right: 0, justifyContent: 'center', zIndex: 3 }}>
            <Typography variant="h5" sx={{ bgcolor: 'rgba(0,0,0,0.5)', color: '#fff', px: 2, py: 1, borderRadius: 2 }}>
              {heroSlides[currentSlide].name}
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* Circular Thumbnails Row */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 8 }}>
        {heroSlides.map((slide, idx) => (
          <Box
            key={slide.name}
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              overflow: 'hidden',
              border: idx === currentSlide ? '3px solid #ff3b00' : '2px solid #eee',
              boxShadow: idx === currentSlide ? '0 4px 16px #ff3b0033' : 'none',
              transition: 'border 0.3s, box-shadow 0.3s',
              cursor: 'pointer',
              position: 'relative',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: idx === currentSlide ? 1 : 0.7,
            }}
            onClick={() => setCurrentSlide(idx)}
          >
            <img src={slide.image} alt={slide.name} style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: '50%' }} />
            {idx === currentSlide && (
              <Box sx={{ position: 'absolute', bottom: -10, left: '50%', transform: 'translateX(-50%)', bgcolor: '#ff3b00', color: '#fff', px: 1.5, py: 0.5, borderRadius: 2, fontSize: 13, fontWeight: 700, boxShadow: 2 }}>
                {slide.name}
              </Box>
            )}
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Our Products
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => setDrawerOpen(true)} sx={{ display: { xs: 'inline-flex', md: 'none' } }}>
            <FilterListIcon />
          </IconButton>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sort} label="Sort By" onChange={handleSortChange}>
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
        }}>
          {/* Search Bar */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, bgcolor: '#f5f5f5', borderRadius: 3, px: 2, py: 1 }}>
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
                '&:hover': { color: '#ff3b00', background: 'rgba(255,59,0,0.07)' },
              }}
              onClick={() => handleFilterChange(cat)}
              fullWidth
            >
              {cat}
            </Button>
          ))}
        </Box>
        {/* Product Grid: 3 per row */}
        <Box sx={{ flex: 1 }}>
          {/* Slider */}
          <Box 
            // ref={sliderRef} // Remove slider ref
            sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, // Responsive grid
            gap: 4,
            // Remove slider specific styles
            // transition: 'transform 0.7s cubic-bezier(.4,2,.3,1)',
            // transform: `translateX(-${featIndex * (100 / productsToShow)}%)`,
            width: '100%', // Ensure it takes full width of its container
          }}>
            {products.map((product, idx) => (
              <Box key={product.id} ref={(el: HTMLDivElement | null) => { productRefs.current[idx] = el; }} data-idx={idx} sx={{ opacity: visibleCards.includes(idx) ? 1 : 0, transform: visibleCards.includes(idx) ? 'none' : 'translateY(40px)', transition: 'all 0.7s cubic-bezier(.4,2,.3,1)' }}>
                <ProductCard product={product} />
              </Box>
            ))}
          </Box>
          <OffersSection />
          <FoodDeliverySection sx={{ bgcolor: '#fff' }} />
        </Box>
      </Box>
    </Container>
  );
};

export default ProductsPage;