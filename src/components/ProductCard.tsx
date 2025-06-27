import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, IconButton } from '@mui/material';
import { useCart } from '../context/CartContext';
import { Product } from '../types/product';
import { ShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Card
      sx={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
      aria-label={`Product: ${product.name}`}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={product.imageUrl}
          alt={product.name}
          sx={{ objectFit: 'cover' }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/fallback-image.jpg';
          }}
        />
        <IconButton
          onClick={toggleFavorite}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
          }}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 600,
            fontSize: '1.1rem',
            lineHeight: 1.3,
          }}
        >
          {product.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            flexGrow: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.description}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="h6"
            color="primary"
            sx={{ fontWeight: 700 }}
          >
            ${product.price}
          </Typography>

          <Button
            variant="contained"
            startIcon={<ShoppingCart />}
            onClick={handleAddToCart}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>

      {/* Accessibility Announcement */}
      <div
        role="status"
        aria-live="polite"
        style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: 0 }}
      >
        {isHovered ? `Product details: ${product.name}, Price: $${product.price}` : ''}
      </div>
    </Card>
  );
};

export default ProductCard; 