import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Fade } from '@mui/material';
import vegetableImg from '../assets/vegetable.jpg';
import fruitsImg from '../assets/fruits.jpg';
import spiciesImg from '../assets/spicies.jpg';
import dryFruitsImg from '../assets/dry fruits.jpg';
import girlCarryingVegetablesImg from '../assets/girlcarryingvegetables.jpg';

const categories = [
  {
    title: 'Vegetables',
    img: vegetableImg,
    desc: 'Dictum laoreet quisque sed vehicula massa auctor. Diam leo.'
  },
  {
    title: 'Fresh fruits',
    img: fruitsImg,
    desc: 'Elit ultrices in ac sapien sit eget vel lectus convallis. Tristique sem.'
  },
  {
    title: 'Spices',
    img: spiciesImg,
    desc: 'Elit ultrices in ac sapien sit eget vel lectus convallis. Tristique sem.'
  },
  {
    title: 'Dry Fruits',
    img: dryFruitsImg,
    desc: 'Elit ultrices in ac sapien sit eget vel lectus convallis. Tristique sem.'
  },
];

const offerSlides = [
  {
    img: spiciesImg,
    title: 'Spices Sale',
    offer: '50% OFF',
    desc: 'Get the best spices at half price. Limited time offer!',
    bg: '#14532d',
    color: '#fff',
    btn: 'Shop Spices',
  },
  {
    img: fruitsImg,
    title: 'Fruits Bonanza',
    offer: '50% OFF',
    desc: 'Enjoy fresh fruits with a massive discount. Grab yours now!',
    bg: '#256029',
    color: '#fff',
    btn: 'Shop Fruits',
  },
  {
    img: girlCarryingVegetablesImg,
    title: 'Vegetables Offer',
    offer: '50% OFF',
    desc: 'Fresh vegetables at half price. Eat healthy, save more!',
    bg: '#4e7d4c',
    color: '#fff',
    btn: 'Shop Vegetables',
  },
];

const OffersSection: React.FC = () => {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setSlide((prev) => (prev + 1) % offerSlides.length), 3000);
    return () => clearInterval(timer);
  }, []);
  const current = offerSlides[slide];

  return (
    <Box sx={{ my: 8 }}>
      <Typography variant="subtitle1" align="center" sx={{ color: '#388e3c', fontWeight: 600, mb: 1 }}>
        Our Offers
      </Typography>
      <Typography variant="h3" align="center" sx={{ fontWeight: 700, mb: 2 }}>
        What we're offering to customers
      </Typography>
      <Typography align="center" sx={{ color: '#666', mb: 6, maxWidth: 600, mx: 'auto' }}>
        Velit vel sit lacus pharetra pulvinar tempus massa sed. Turpis consectetur justo accumsan ac nuno ornare viverra pharetra.
      </Typography>
      {/* Categories */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, justifyContent: 'center', mb: 8, maxWidth: 1200, mx: 'auto', px: { xs: 1, sm: 2, md: 0 } }}>
        {categories.map((cat) => (
          <Box key={cat.title} sx={{ flex: 1, bgcolor: '#fafafa', borderRadius: 3, boxShadow: '0 2px 12px #0001', p: 3, textAlign: 'center', minWidth: 220, maxWidth: 300, mx: 'auto' }}>
            <Box sx={{ width: 100, height: 100, mx: 'auto', mb: 2, borderRadius: '50%', overflow: 'hidden', boxShadow: '0 2px 8px #0002', bgcolor: '#fff' }}>
              <img src={cat.img} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
            <Typography variant="h6" sx={{ color: '#388e3c', fontWeight: 700, mb: 1 }}>{cat.title}</Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>{cat.desc}</Typography>
          </Box>
        ))}
      </Box>
      {/* Animated Offer Card */}
      <Fade in timeout={600} key={slide}>
        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: current.bg, color: current.color, borderRadius: 5, p: { xs: 3, md: 5 }, boxShadow: '0 4px 32px #0002', maxWidth: 900, mx: 'auto', minHeight: 220, mb: 2, px: { xs: 1, sm: 2, md: 5 } }}>
          <Box sx={{ flex: 1, minWidth: 180 }}>
            <img src={current.img} alt={current.title} style={{ width: '100%', maxWidth: 220, borderRadius: 16, boxShadow: '0 2px 12px #0003' }} />
          </Box>
          <Box sx={{ flex: 2, pl: { xs: 0, md: 6 }, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#fffde7', mb: 1 }}>{current.title}</Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, color: '#ffe082', mb: 1 }}>{current.offer}</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>{current.desc}</Typography>
            <Button variant="contained" sx={{ bgcolor: '#ff9800', color: '#fff', borderRadius: 3, px: 4, py: 1.2, fontWeight: 700, fontSize: '1.1rem', boxShadow: '0 2px 8px #0002', '&:hover': { bgcolor: '#f57c00' } }}>{current.btn}</Button>
          </Box>
        </Box>
      </Fade>
    </Box>
  );
};

export default OffersSection; 