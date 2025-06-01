import React, { useState, useEffect } from 'react';
import { Box, Typography, Fade, Stack } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ReplayIcon from '@mui/icons-material/Replay';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import vegetableImg from '../assets/vegetable.jpg';
import fruitsImg from '../assets/fruits.jpg';
import spiciesImg from '../assets/spicies.jpg';
import dryFruitsImg from '../assets/dry fruits.jpg';

const slides = [
  {
    img: vegetableImg,
    title: "We're Best Quality Grocery Shopper",
    subtitle: 'Our Quality',
    desc: 'Penatibus amet donec pellentesque faucibus cursus vulputate. Pulvinar tellus vel et et mauris massa at. Egestas massa enim accumsan elit. Justo senectus vitae egestas',
    features: [
      { icon: <ShoppingBasketIcon />, label: 'Multi Payment Methods' },
      { icon: <ReplayIcon />, label: 'Easy Refund Policy' },
      { icon: <SupportAgentIcon />, label: 'Customer Support' },
      { icon: <LocalShippingIcon />, label: 'Fast Delivery' },
    ],
  },
  {
    img: fruitsImg,
    title: 'Fresh Fruits, Happy Life',
    subtitle: 'Our Quality',
    desc: 'Enjoy a variety of fresh fruits delivered to your door. Quality and taste guaranteed for every family.',
    features: [
      { icon: <ShoppingBasketIcon />, label: 'Multi Payment Methods' },
      { icon: <ReplayIcon />, label: 'Easy Refund Policy' },
      { icon: <SupportAgentIcon />, label: 'Customer Support' },
      { icon: <LocalShippingIcon />, label: 'Fast Delivery' },
    ],
  },
  {
    img: spiciesImg,
    title: 'Spices for Every Kitchen',
    subtitle: 'Our Quality',
    desc: 'Discover a world of flavors with our premium spices. Sourced for freshness and aroma.',
    features: [
      { icon: <ShoppingBasketIcon />, label: 'Multi Payment Methods' },
      { icon: <ReplayIcon />, label: 'Easy Refund Policy' },
      { icon: <SupportAgentIcon />, label: 'Customer Support' },
      { icon: <LocalShippingIcon />, label: 'Fast Delivery' },
    ],
  },
  {
    img: dryFruitsImg,
    title: 'Premium Dry Fruits Selection',
    subtitle: 'Our Quality',
    desc: 'Handpicked dry fruits for your health and taste. Perfect for snacking and gifting.',
    features: [
      { icon: <ShoppingBasketIcon />, label: 'Multi Payment Methods' },
      { icon: <ReplayIcon />, label: 'Easy Refund Policy' },
      { icon: <SupportAgentIcon />, label: 'Customer Support' },
      { icon: <LocalShippingIcon />, label: 'Fast Delivery' },
    ],
  },
];

const AboutQualitySection: React.FC = () => {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setSlide((prev) => (prev + 1) % slides.length), 3000);
    return () => clearInterval(timer);
  }, []);
  const current = slides[slide];

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 6, bgcolor: '#fafbfa', borderRadius: 4, boxShadow: '0 4px 24px #0001', px: { xs: 2, md: 6 }, py: { xs: 4, md: 6 }, my: 8 }}>
      {/* Left: Animated Text & Features */}
      <Box sx={{ flex: 2, pr: { md: 6 }, textAlign: { xs: 'center', md: 'left' } }}>
        <Fade in timeout={600} key={slide}>
          <Box>
            <Typography variant="subtitle1" sx={{ color: '#388e3c', fontWeight: 600, mb: 1 }}>{current.subtitle}</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: '#222' }}>{current.title}</Typography>
            <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>{current.desc}</Typography>
            <Stack spacing={2}>
              {current.features.map((f, i) => (
                <Box key={f.label} sx={{ display: 'flex', alignItems: 'center', gap: 2, '&:hover .MuiSvgIcon-root': { bgcolor: '#43a047', color: '#fff', transform: 'scale(1.1)' }, cursor: 'pointer', transition: 'all 0.2s' }}>
                  <Box sx={{ bgcolor: '#e8f5e9', color: '#388e3c', borderRadius: 2, p: 1.2, display: 'flex', alignItems: 'center', mr: 2, transition: 'all 0.2s' }}>
                    {f.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{f.label}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Fade>
      </Box>
      {/* Right: Animated Image */}
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', mt: { xs: 4, md: 0 } }}>
        <Fade in timeout={600} key={slide + '-img'}>
          <Box
            component="img"
            src={current.img}
            alt={current.title}
            sx={{ width: { xs: '90vw', sm: 320, md: 340 }, maxWidth: 400, borderRadius: 4, boxShadow: '0 8px 32px #0002', objectFit: 'cover', background: '#fff' }}
          />
        </Fade>
      </Box>
    </Box>
  );
};

export default AboutQualitySection; 