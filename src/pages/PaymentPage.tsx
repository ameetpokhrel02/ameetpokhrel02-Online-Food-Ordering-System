import React, { useState } from 'react';
import { Box, Typography, Container, Paper, Grid, Button, TextField } from '@mui/material';
import esewaLogo from '../assets/esewa.png';
import khaltiLogo from '../assets/khalti.jpg.crdownload';
import imepayLogo from '../assets/ime.png';
import paymentImage from '../assets/payment.jpeg';

const PaymentPage: React.FC = () => {
  const [esewaAmount, setEsewaAmount] = useState('');
  const [esewaPhone, setEsewaPhone] = useState('');
  const [khaltiAmount, setKhaltiAmount] = useState('');
  const [khaltiPhone, setKhaltiPhone] = useState('');
  const [imepayAmount, setImepayAmount] = useState('');
  const [imepayPhone, setImepayPhone] = useState('');

  const handleEsewaAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEsewaAmount(event.target.value);
  };

  const handleEsewaPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEsewaPhone(event.target.value);
  };

  const handleKhaltiAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKhaltiAmount(event.target.value);
  };

  const handleKhaltiPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKhaltiPhone(event.target.value);
  };

  const handleImepayAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImepayAmount(event.target.value);
  };

  const handleImepayPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImepayPhone(event.target.value);
  };

  // Placeholder functions for initiating payment
  const handleEsewaPayment = () => {
    console.log('Initiating eSewa payment:', { amount: esewaAmount, phone: esewaPhone });
    // Add eSewa payment initiation logic here (without backend)
  };

  const handleKhaltiPayment = () => {
    console.log('Initiating Khalti payment:', { amount: khaltiAmount, phone: khaltiPhone });
    // Add Khalti payment initiation logic here (without backend)
  };

  const handleImepayPayment = () => {
    console.log('Initiating IME Pay payment:', { amount: imepayAmount, phone: imepayPhone });
    // Add IME Pay payment initiation logic here (without backend)
  };

  return (
    <Box sx={{
      bgcolor: 'background.default',
      minHeight: '100vh',
      py: 8,
    }}>
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" align="center" gutterBottom sx={{
          fontWeight: 700,
          color: 'primary.main',
          mb: 6,
        }}>
          Choose Your Payment Method
        </Typography>

        <Grid container spacing={4} justifyContent="center" alignItems="center">
          {/* Payment Image Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}>
              <Box 
                component="img"
                src={paymentImage}
                alt="Online Payment"
                sx={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 8,
                  boxShadow: 3,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  },
                }}
              />
            </Box>
          </Grid>

          {/* Payment Methods Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{
              p: 4,
              borderRadius: 4,
              bgcolor: 'background.paper',
            }}>
              <Typography variant="h4" component="h2" gutterBottom sx={{
                fontWeight: 600,
                color: 'secondary.main',
                mb: 3,
              }}>
                Pay with:
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* eSewa Payment Method */}
                <Box>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    sx={{
                      borderColor: '#60B554',
                      color: '#60B554',
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: '#60B554',
                        color: '#fff',
                        boxShadow: '0 4px 12px rgba(96, 181, 84, 0.4)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                    onClick={handleEsewaPayment}
                  >
                    <Box component="img" src={esewaLogo} alt="eSewa Logo" sx={{ height: 30, mr: 1 }} />
                    Pay with eSewa
                  </Button>
                  <TextField
                    label="Amount"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={esewaAmount}
                    onChange={handleEsewaAmountChange}
                  />
                  <TextField
                    label="Phone Number"
                    type="tel"
                    fullWidth
                    margin="normal"
                    value={esewaPhone}
                    onChange={handleEsewaPhoneChange}
                  />
                </Box>

                {/* Khalti Payment Method */}
                <Box>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                     sx={{
                      borderColor: '#5D2C8D',
                      color: '#5D2C8D',
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: '#5D2C8D',
                        color: '#fff',
                        boxShadow: '0 4px 12px rgba(93, 44, 141, 0.4)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                    onClick={handleKhaltiPayment}
                  >
                     <Box component="img" src={khaltiLogo} alt="Khalti Logo" sx={{ height: 30, mr: 1 }} />
                    Pay with Khalti
                  </Button>
                   <TextField
                    label="Amount"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={khaltiAmount}
                    onChange={handleKhaltiAmountChange}
                  />
                  <TextField
                    label="Phone Number"
                    type="tel"
                    fullWidth
                    margin="normal"
                    value={khaltiPhone}
                    onChange={handleKhaltiPhoneChange}
                  />
                </Box>

                {/* IME Pay Payment Method */}
                <Box>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                     sx={{
                      borderColor: '#1E3376',
                      color: '#1E3376',
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: '#1E3376',
                        color: '#fff',
                        boxShadow: '0 4px 12px rgba(30, 51, 118, 0.4)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                     onClick={handleImepayPayment}
                  >
                     <Box component="img" src={imepayLogo} alt="IME Pay Logo" sx={{ height: 30, mr: 1 }} />
                    Pay with IME Pay
                  </Button>
                   <TextField
                    label="Amount"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={imepayAmount}
                    onChange={handleImepayAmountChange}
                  />
                  <TextField
                    label="Phone Number"
                    type="tel"
                    fullWidth
                    margin="normal"
                    value={imepayPhone}
                    onChange={handleImepayPhoneChange}
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PaymentPage; 