import { styled } from '@mui/material/styles';
import { Card, CardContent } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: '100%',
  margin: '16px',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '345px',
  },
}));

export const StyledCardContent = styled(CardContent)({
  padding: '16px',
  textAlign: 'center',
});

export const FoodTitle = styled('h2')({
  fontSize: '24px',
  color: '#FF4B3A',
  margin: '8px 0',
});

export const FoodPrice = styled('div')({
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#000',
  marginBottom: '8px',
});

export const FoodDescription = styled('p')({
  color: '#666',
  fontSize: '14px',
  marginBottom: '16px',
});