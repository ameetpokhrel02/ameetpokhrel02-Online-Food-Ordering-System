import React from 'react';
import { Box, Paper, Typography, Fade } from '@mui/material';
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

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [slide, setSlide] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % foodSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'linear-gradient(135deg, #fff8f5 0%, #ffe0d9 100%)',
      }}
    >
      <Paper
        elevation={8}
        sx={{
          display: 'flex',
          borderRadius: 5,
          overflow: 'hidden',
          minWidth: { xs: 340, md: 800 },
          minHeight: { xs: 400, md: 480 },
          bgcolor: '#fff',
          boxShadow: '0 8px 32px rgba(255,59,0,0.08)',
          border: '1.5px solid #ffe0d9',
        }}
      >
        {/* Left: Food carousel (desktop only) */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#fff8f5',
            p: 4,
            minWidth: 340,
            flexDirection: 'column',
            position: 'relative',
            borderRight: '1.5px solid #ffe0d9',
          }}
        >
          <Box sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: 'rgba(255,255,255,0.5)',
            zIndex: 1,
          }} />
          {foodSlides.map((slideObj, idx) => (
            <Fade in={slide === idx} timeout={700} key={slideObj.name} unmountOnExit>
              <Box sx={{ display: slide === idx ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center', width: '100%', zIndex: 2 }}>
                <img src={slideObj.image} alt={slideObj.name} style={{ maxWidth: 200, borderRadius: 16, boxShadow: '0 8px 32px #0002', marginBottom: 24 }} />
                <Typography variant="h5" sx={{ color: '#ff3b00', fontWeight: 700, mb: 1, textAlign: 'center' }}>{slideObj.name}</Typography>
                <Typography variant="body2" sx={{ color: '#333', textAlign: 'center', maxWidth: 240 }}>{slideObj.desc}</Typography>
              </Box>
            </Fade>
          ))}
        </Box>
        {/* Right: Form area */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#fff',
            p: { xs: 3, md: 6 },
            boxShadow: 'none',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 360 }}>
            {children}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthLayout; 