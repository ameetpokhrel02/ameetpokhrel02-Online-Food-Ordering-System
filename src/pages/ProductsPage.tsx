import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Container, FormControl, InputLabel, Select, MenuItem, Drawer, IconButton, Divider, Button, SelectChangeEvent, Slide, TextField } from '@mui/material';
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
import OffersSection from '../components/OffersSection';
import FoodDeliverySection from '../components/FoodDeliverySection';
import { Product } from '../types/product';
import { InputBase } from '@mui/material';
import { AddShoppingCart, LocationOn } from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import vegetableBag from '../assets/vegetable.jpg';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setSearch } from '../store/slices/uiSlice';
import { Link } from 'react-router-dom';

const categories = ['All', 'Pizza', 'Burger', 'Special', 'Dessert', 'Rice', 'Starter', 'Dumpling'];

interface ProductsPageProps {}

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

const ProductsPage: React.FC<ProductsPageProps> = () => {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector((state) => state.ui);
  const [sort, setSort] = useState('default');
  const [filter, setFilter] = useState('All');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [mainProductIndex, setMainProductIndex] = useState(0);
  const [mainProduct, setMainProduct] = useState<Product | null>(null);
  const [orbitingProducts, setOrbitingProducts] = useState<Product[]>([]);
  const [orbitingStartIndex, setOrbitingStartIndex] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const NUM_ORBITING_ITEMS = 5;
  const mainProductImageContainerRef = useRef<HTMLDivElement>(null);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  const { addToCart } = useCart();
  const [openMap, setOpenMap] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/products/')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        const formatted = Array.isArray(data) ? data.map((p: any) => ({
          ...p,
          imageUrl: p.image,
        })) : [];
        setProducts(formatted);
        setMainProduct(formatted[0] || null);
      })
      .catch(err => {
        setProducts([]);
        setMainProduct(null);
        // Optionally set an error state to show a user-friendly message
        console.error('Failed to fetch products:', err);
      });
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setMainProduct(products[mainProductIndex]);
    }
  }, [mainProductIndex, products]);

  useEffect(() => {
    const orbitInterval = setInterval(() => {
      setOrbitingStartIndex((prevIndex) => {
        const potentialOrbitingProducts = products.filter(p => mainProduct && p.id !== mainProduct.id);
        if (potentialOrbitingProducts.length === 0) return 0;
        return (prevIndex + 1) % potentialOrbitingProducts.length;
      });
    }, 2000);
    return () => clearInterval(orbitInterval);
  }, [products, mainProduct]);

  useEffect(() => {
    if (mainProduct && products.length > 0) {
      const potentialOrbitingProducts = products.filter(p => p.id !== mainProduct.id);
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
  }, [mainProduct, orbitingStartIndex, products]);

  useEffect(() => {
    const interval = setInterval(() => {
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  let productsToDisplay = products.filter(p => filter === 'All' || p.category === filter);
  if (sort === 'price-asc') productsToDisplay = [...productsToDisplay].sort((a, b) => Number(a.price) - Number(b.price));
  if (sort === 'price-desc') productsToDisplay = [...productsToDisplay].sort((a, b) => Number(b.price) - Number(a.price));
  productsToDisplay = productsToDisplay.filter(product =>
    typeof product.name === 'string' && product.name.toLowerCase().includes(search.toLowerCase())
  );

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
  }, [productsToDisplay]);

  const handleSortChange = (e: SelectChangeEvent) => setSort(e.target.value as string);
  const handleFilterChange = (cat: string) => { setFilter(cat); setDrawerOpen(false); };

  const handleOrbitingProductClick = (product: Product) => {
    const newIndex = products.findIndex(p => p.id === product.id);
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
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        gap: 4,
        bgcolor: '#fff8f5',
        borderRadius: 4,
        p: 4,
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
        minHeight: '60vh',
        position: 'relative',
        overflow: 'hidden',
        mb: 8,
      }}>
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

        <Box sx={{ flex: 1, pr: { md: 4 }, textAlign: { xs: 'center', md: 'left' }, zIndex: 2 }}>
          <Typography variant="h2" component="h1" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
            {mainProduct?.name}
          </Typography>
          <Typography variant="h4" component="p" sx={{ color: 'text.secondary', mb: 3 }}>
            {mainProduct?.description}
          </Typography>
          <Typography variant="h3" component="p" sx={{ fontWeight: 700, color: 'secondary.main', mb: 4 }}>
            ${typeof mainProduct?.price === 'number' ? Number(mainProduct.price).toFixed(2) : '0.00'}
          </Typography>
          <Button variant="contained" color="primary" size="large" sx={{ py: 1.5, px: 4, fontSize: '1.1rem', mr: 2 }} onClick={handleAddToCartMainProduct}>
            <AddShoppingCart sx={{ mr: 1 }} /> Add to Cart
          </Button>
          <Button variant="outlined" color="primary" size="large" sx={{ py: 1.5, px: 4, fontSize: '1.1rem' }} component={Link} to="/menu">
            View Menu
          </Button>
        </Box>

        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', mt: { xs: 6, md: 0 }, minHeight: 350, zIndex: 2 }}>
          <Slide direction={slideDirection} in={true} timeout={700} container={mainProductImageContainerRef.current}>
            <Box
              component="img"
              src={mainProduct?.imageUrl || imagePng} // Use fallback image if imageUrl is missing
              alt={mainProduct?.name}
              sx={{
                width: { xs: 250, sm: 350, md: 400 },
                height: { xs: 250, sm: 350, md: 400 },
                borderRadius: '50%',
                objectFit: 'cover',
                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.5s ease-in-out',
              }}
            />
          </Slide>

          {/* Orbiting small images */}
          {orbitingProducts.map((product, index) => {
            const angle = (-60 + (120 / (NUM_ORBITING_ITEMS - 1)) * index);
            const radius = 220;

            const x = radius * Math.cos(angle * (Math.PI / 180));
            const y = radius * Math.sin(angle * (Math.PI / 180));

            return (
              <Box
                key={product.id}
                onClick={() => handleOrbitingProductClick(product)}
                sx={{
                  position: 'absolute',
                  left: `calc(50% + ${x}px - 30px)`,
                  top: `calc(50% + ${y}px - 30px)`,
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  cursor: 'pointer',
                  border: mainProduct?.id === product.id ? '3px solid' : 'none',
                  borderColor: 'primary.main',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                  },
                }}
              >
                <img
                  src={product.imageUrl || imagePng} // Use fallback image if imageUrl is missing
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Sidebar with search, filter, and sort options */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: 280, bgcolor: '#fefefe', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={700} mb={3} color="primary.main">Filters</Typography>
          <InputBase
            placeholder="Search products..."
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            sx={{
              mb: 3,
              bgcolor: '#f5f5f5',
              borderRadius: 2,
              px: 2,
              py: 1,
              width: '100%',
            }}
            inputProps={{ 'aria-label': 'search products' }}
          />
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sort} label="Sort By" onChange={handleSortChange}>
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="price-asc">Price: Low to High</MenuItem>
              <MenuItem value="price-desc">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
          <Divider sx={{ my: 3 }} />
          <Typography variant="subtitle1" fontWeight={700} mb={2} color="primary.main">Categories</Typography>
          {categories.map((cat) => (
            <Button
              key={cat}
              fullWidth
              variant={filter === cat ? 'contained' : 'text'}
              onClick={() => handleFilterChange(cat)}
              sx={{ justifyContent: 'flex-start', mb: 1, borderRadius: 2 }}
            >
              {cat}
            </Button>
          ))}
        </Box>
      </Drawer>

      {/* Product Grid */}
      <Box display="flex" alignItems="center" mb={4} justifyContent="space-between">
        <Typography variant="h4" component="h2" fontWeight={700} color="primary.main">
          Our Products
        </Typography>
        <IconButton onClick={() => setDrawerOpen(true)} color="primary">
          <FilterListIcon />
        </IconButton>
      </Box>
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={4}>
        {productsToDisplay.length > 0 ? (
          productsToDisplay.map((product, index) => (
            <Slide
              key={product.id}
              direction="up"
              in={visibleCards.includes(index)}
              timeout={400 + index * 50}
            >
              <Box ref={(el: HTMLDivElement | null) => { productRefs.current[index] = el; }} data-idx={index}>
                <ProductCard product={product} />
              </Box>
            </Slide>
          ))
        ) : (
          <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', gridColumn: '1 / -1' }}>
            No products found.
          </Typography>
        )}
      </Box>

      <OffersSection />
      <FoodDeliverySection />

      {/* New Order Section */}
      <Box sx={{
        py: 8,
        bgcolor: '#f8f8f8',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Container maxWidth="lg">
          <Box sx={{
            bgcolor: 'white',
            borderRadius: 4,
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
            p: { xs: 4, md: 8 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
          }}>
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
                Craving Something Delicious?
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Order now and get fresh, hot food delivered to your doorstep!
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 3 }}>
                <Button variant="contained" color="primary" size="large" sx={{ py: 1.5, px: 4, fontSize: '1.1rem' }}>
                  <AddShoppingCart sx={{ mr: 1 }} /> Order Pick-up
                </Button>
                <Button variant="outlined" color="primary" size="large" sx={{ py: 1.5, px: 4, fontSize: '1.1rem' }} onClick={() => setOpenMap(true)}>
                  <LocationOn sx={{ mr: 1 }} /> Order Delivery
                </Button>
              </Box>
              <TextField
                label="Enter Your Address"
                variant="outlined"
                fullWidth
                sx={{ maxWidth: { xs: '100%', sm: 400 } }}
              />
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', minHeight: { xs: 200, md: 300 } }}>
              <Box
                component="img"
                src={vegetableBag}
                alt="Fresh Vegetables"
                sx={{
                  position: 'absolute',
                  bottom: { xs: -50, md: -100 },
                  right: { xs: -50, md: -100 },
                  width: { xs: 200, md: 400 },
                  height: { xs: 200, md: 400 },
                  objectFit: 'contain',
                  zIndex: 0,
                  maxWidth: '100%',
                  maxHeight: '100%',
                  transform: 'rotate(15deg)',
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Map Dialog */}
      <Dialog open={openMap} onClose={() => setOpenMap(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Select Delivery Location</Typography>
            <IconButton onClick={() => setOpenMap(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ height: 400, p: 0 }}>
          <iframe
            title="Kathmandu Map"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14130.08272922718!2d85.31977755!3d27.7003444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb0f1e8c71c4c342d!2sKathmandu%2044600!5e0!3m2!1sen!2snp!4v1678280010000!5m2!1sen!2snp"
            allowFullScreen={false}
            aria-hidden="false"
            tabIndex={0}
          >
          </iframe>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ProductsPage;