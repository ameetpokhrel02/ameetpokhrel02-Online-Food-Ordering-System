import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const FoodGridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '16px',
  padding: '16px',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}));

interface FoodGridProps {
  children: React.ReactNode;
}

const FoodGrid: React.FC<FoodGridProps> = ({ children }) => {
  return <FoodGridContainer>{children}</FoodGridContainer>;
};

export default FoodGrid;