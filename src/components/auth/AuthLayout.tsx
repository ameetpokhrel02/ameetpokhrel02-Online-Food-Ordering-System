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
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5',
        p: 2,
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          mb: 4,
        }}
      >
        <img src={foodLogo} alt="Logo" style={{ height: 60, marginBottom: 16 }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: 'primary.main' }}>
          BiteBazaar
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Your culinary journey starts here.
        </Typography>
      </Box>
      <Paper
        elevation={8}
        sx={{
          width: { xs: '100%', sm: 400 },
          p: { xs: 3, sm: 4 },
          borderRadius: 2,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
        }}
      >
        {children}
      </Paper>
    </Box>
  );
};

export default AuthLayout; 