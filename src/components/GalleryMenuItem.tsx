import React, { useState } from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import { Favorite, FavoriteBorder, AddShoppingCart, Visibility } from '@mui/icons-material';
import { useCart } from '../context/CartContext';

interface GalleryMenuItemProps {
  item: {
    id: number;
    name: string;
    price: string;
    imageUrl: string;
  };
  onViewDetailsClick: () => void; // Function to handle view details
}

const GalleryMenuItem: React.FC<GalleryMenuItemProps> = ({ item, onViewDetailsClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);


  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'transform 0.3s ease-in-out',
      '&:hover': { transform: 'scale(1.05)' },
    }} onClick={onViewDetailsClick}>
      {/* Circular Image */}
      <Box sx={{
        width: 140,
        height: 140,
        borderRadius: '50%',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        mb: 2,
        border: '3px solid #fff',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Box>

      {/* Item Name */}
      <Typography variant="h6" fontWeight={700} sx={{ color: '#fff', mb: 0.5 }}>
        {item.name}
      </Typography>

      {/* Item Price */}
      <Typography variant="body1" fontWeight={600} sx={{ color: '#fff', mb: 2 }}>
        ${item.price}
      </Typography>

      {/* Actions: Add to Cart, Favorite, View Details */}
      <Box sx={{ display: 'flex', gap: 1 }}>
         {/* Add to Cart Button */}
         <Button
            variant="contained"
            size="small"
            startIcon={<AddShoppingCart fontSize="small" />}
            onClick={handleAddToCart}
            sx={{
              borderRadius: 6,
              bgcolor: isAdded ? '#4caf50' : '#ff3b00',
               color: '#fff',
              '&:hover': {
                bgcolor: isAdded ? '#4caf50' : '#c1452b',
              },
               transition: 'background-color 0.3s',
               fontSize: '0.75rem',
               px: 1,
               py: 0.5
            }}
          >
            {isAdded ? 'Added' : 'Add'}
          </Button>

        {/* Favorite Button */}
        <IconButton size="small" onClick={(e) => { e.stopPropagation(); setIsFavorite(!isFavorite); }} sx={{ color: isFavorite ? '#ff3b00' : '#fff' }}>
          {isFavorite ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
        </IconButton>

        {/* View Details Button */}
        <IconButton size="small" onClick={(e) => { e.stopPropagation(); onViewDetailsClick(); }} sx={{ color: '#fff' }}>
          <Visibility fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default GalleryMenuItem; 