import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, Paper, Fade } from '@mui/material';
import { Favorite, FavoriteBorder, AddShoppingCart } from '@mui/icons-material';
import { useCart } from '../context/CartContext';

interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const truncatedDescription = product.description.length > 50 
    ? product.description.substring(0, 50) + '...' 
    : product.description;

  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleReadMoreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log('Read More clicked for:', product.name);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 4,
        cursor: 'pointer',
        height: 480,
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.4s cubic-bezier(.4,2,.3,1)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
        },
      }}
    >
      {/* Product Image Container */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 280,
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '30%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
            zIndex: 1,
          },
        }}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {/* Favorite Button */}
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            bgcolor: 'rgba(255,255,255,0.9)',
            width: 40,
            height: 40,
            zIndex: 2,
            '&:hover': { 
              bgcolor: 'rgba(255,255,255,1)',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.3s',
          }}
        >
          {isFavorite ? (
            <Favorite sx={{ color: '#ff3b00', fontSize: 24 }} />
          ) : (
            <FavoriteBorder sx={{ fontSize: 24 }} />
          )}
        </IconButton>
      </Box>

      {/* Product Info */}
      <Box
        sx={{
          p: 2,
          flexGrow: 1,
          bgcolor: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 0.5,
              fontSize: '1.1rem',
            }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1 }}
          >
            {truncatedDescription}
          </Typography>
          <Button 
            size="small"
            onClick={handleReadMoreClick}
            sx={{
              textTransform: 'none',
              p: 0,
              justifyContent: 'flex-start'
            }}
          >
            Read More
          </Button>
          <Typography
            variant="body1"
            sx={{
              color: 'primary.main',
              fontWeight: 700,
              fontSize: '1rem',
              mt: 1,
            }}
          >
            ${product.price}
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddShoppingCart />}
          onClick={handleAddToCart}
          sx={{
            borderRadius: 8,
            px: 3,
            py: 1,
            fontSize: '1rem',
            background: isAdded ? '#4caf50' : '#ff3b00',
            '&:hover': {
              background: isAdded ? '#4caf50' : '#c1452b',
              transform: 'scale(1.05)',
            },
            transition: 'all 0.3s',
            mt: 2,
          }}
        >
          {isAdded ? 'Added!' : 'Add to Cart'}
        </Button>
      </Box>
    </Paper>
  );
};

export default ProductCard; 