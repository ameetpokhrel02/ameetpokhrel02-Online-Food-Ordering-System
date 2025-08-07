import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import foodLogo from '../../assets/image.png';
import food1 from '../../assets/food1.avif';
import food2 from '../../assets/food2.jpg';
import biryani from '../../assets/biryani.jpg';
import lolipop from '../../assets/lolipop.jpg';
import pizza from '../../assets/pizza.jpg';
import momo from '../../assets/momo.jpeg';
import chicken from '../../assets/chicken.jpg';

const foodSlides = [
  {
    image: food1,
    name: 'Delicious Pizza',
    desc: 'A classic Italian pizza with fresh ingredients and a crispy crust.'
  },
  {
    image: food2,
    name: 'Tasty Burger',
    desc: 'Juicy burger with fresh veggies and special sauce.'
  },
  {
    image: biryani,
    name: 'Classic Biryani',
    desc: 'Aromatic rice dish with tender meat and spices.'
  },
  {
    image: lolipop,
    name: 'Chicken Lollipop',
    desc: 'Crispy fried chicken lollipops, a spicy treat.'
  },
  {
    image: pizza,
    name: 'Cheese Pizza',
    desc: 'Loaded with cheese and your favorite toppings.'
  },
  {
    image: momo,
    name: 'Steamed Momo',
    desc: 'Soft dumplings filled with savory goodness.'
  },
  {
    image: chicken,
    name: 'Roasted Chicken',
    desc: 'Perfectly roasted chicken with herbs and lemon.'
  },
];

interface AuthLayoutProps {
  children: React.ReactNode;
}


const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const [slide, setSlide] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % foodSlides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        bgcolor: 'linear-gradient(120deg, #232526 0%, #414345 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 0, sm: 2 },
      }}
    >
      <Paper
        elevation={8}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: { xs: '100%', sm: 500, md: 820 },
          minHeight: { xs: 600, md: 420 },
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0px 8px 32px rgba(0,0,0,0.18)',
        }}
      >
        {/* Left: Form */}
        <Box
          sx={{
            flex: 1,
            bgcolor: 'rgba(30,34,44,0.98)',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: { xs: 3, sm: 4, md: 5 },
            minWidth: { xs: '100%', md: 350 },
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 340 }}>{children}</Box>
        </Box>
        {/* Right: Image/Slide */}
        <Box
          sx={{
            flex: 1,
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            minWidth: 350,
            background: 'linear-gradient(120deg, #355C7D 0%, #6C5B7B 100%)',
            p: 0,
          }}
        >
          <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4 }}>
            <img
              src={foodSlides[slide].image}
              alt={foodSlides[slide].name}
              style={{
                width: 220,
                height: 220,
                objectFit: 'cover',
                borderRadius: '50%',
                boxShadow: '0 8px 32px #0004',
                marginBottom: 24,
                border: '4px solid #fff2',
              }}
            />
            <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, mb: 1, textShadow: '0 2px 8px #0006' }}>
              {foodSlides[slide].name}
            </Typography>
            <Typography variant="body1" sx={{ color: '#fff', opacity: 0.85, textAlign: 'center', textShadow: '0 1px 4px #0004' }}>
              {foodSlides[slide].desc}
            </Typography>
          </Box>
          <Box sx={{ position: 'absolute', bottom: 18, left: 0, width: '100%', textAlign: 'center' }}>
            <img src={foodLogo} alt="Logo" style={{ height: 38, opacity: 0.7 }} />
            <Typography variant="subtitle2" sx={{ color: '#fff', opacity: 0.7, fontWeight: 500, mt: 1 }}>
              BiteBazaar
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthLayout; 