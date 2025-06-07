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
      {/* Hero Section with Parallax */}
      <Box sx={{ position: 'relative', height: '60vh', mb: 8, overflow: 'hidden', borderRadius: 4 }}>
        {heroSlides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              transform: `translateY(${parallax}px)`,
            }}
          >
            <img
              ref={heroImgRef}
              src={slide.image}
              alt={slide.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                p: 4,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                color: 'white',
              }}
            >
              <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
                {slide.name}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Discover our delicious menu
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Product Listing Section */}
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
          {/* OffersSection was here, moving it below the main flex container */}
          {/* <OffersSection /> */}
        </Box>
      </Box>

      {/* Place the OffersSection here to span the full width */}
      <OffersSection />

      {/* Add the FoodDeliverySection here */}
      <FoodDeliverySection />

    </Container>
  );
};

export default ProductsPage;