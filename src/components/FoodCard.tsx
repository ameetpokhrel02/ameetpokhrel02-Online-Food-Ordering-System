import React from 'react';
import Button from '@mui/material/Button';
import { 
  StyledCard,
  StyledCardContent,
  FoodTitle,
  FoodPrice,
  FoodDescription 
} from './styles/FoodCard.styles';

interface FoodCardProps {
  title: string;
  price: number;
  description: string;
  onOrder: () => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ title, price, description, onOrder }) => {
  return (
    <StyledCard>
      <StyledCardContent>
        <FoodTitle>{title}</FoodTitle>
        <FoodPrice>${price}</FoodPrice>
        <FoodDescription>{description}</FoodDescription>
        <Button 
          variant="contained" 
          onClick={onOrder}
          sx={{
            backgroundColor: '#FF4B3A',
            borderRadius: '30px',
            padding: '10px 30px',
            '&:hover': {
              backgroundColor: '#ff3621'
            }
          }}
        >
          Order Now
        </Button>
      </StyledCardContent>
    </StyledCard>
  );
};

export default FoodCard;