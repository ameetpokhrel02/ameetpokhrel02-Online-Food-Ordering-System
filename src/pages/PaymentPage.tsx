import React, { useState } from 'react';
import { Box, Typography, Container, Paper, Grid, Button, TextField, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import esewaLogo from '../assets/esewa.png';
import imepayLogo from '../assets/ime.png';
import khaltiLogo from '../assets/khalti.png';
import paymentImage from '../assets/payment.jpeg';

const PaymentPage: React.FC = () => {
  const [esewaAmount, setEsewaAmount] = useState('');
  const [esewaPhone, setEsewaPhone] = useState('');
  const [imepayAmount, setImepayAmount] = useState('');
  const [imepayPhone, setImepayPhone] = useState('');
  const [khaltiAmount, setKhaltiAmount] = useState('');
  const [khaltiPhone, setKhaltiPhone] = useState('');

  // State to manage expanded accordion panel
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleAccordionChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleEsewaAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEsewaAmount(event.target.value);
  };

  const handleEsewaPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEsewaPhone(event.target.value);
  };

  const handleImepayAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImepayAmount(event.target.value);
  };

  const handleImepayPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImepayPhone(event.target.value);
  };

  const handleKhaltiAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKhaltiAmount(event.target.value);
  };

  const handleKhaltiPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKhaltiPhone(event.target.value);
  };

  // Placeholder functions for initiating payment
  const handleEsewaPayment = () => {
    console.log('Initiating eSewa payment:', { amount: esewaAmount, phone: esewaPhone });
    // Add eSewa payment initiation logic here (without backend)
  };

  const handleImepayPayment = () => {
    console.log('Initiating IME Pay payment:', { amount: imepayAmount, phone: imepayPhone });
    // Add IME Pay payment initiation logic here (without backend)
  };

  const handleKhaltiPayment = () => {
    console.log('Initiating Khalti payment:', { amount: khaltiAmount, phone: khaltiPhone });
    // Add Khalti payment initiation logic here (without backend)
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
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

                {/* eSewa Payment Method Accordion */}
                <Accordion expanded={expanded === 'esewaPanel'} onChange={handleAccordionChange('esewaPanel')}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box component="img" src={esewaLogo} alt="eSewa Logo" sx={{ height: 30, mr: 2 }} />
                      <Typography variant="h6">Pay with eSewa</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
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
                    <Button 
                      variant="contained" 
                      fullWidth 
                      sx={{
                        bgcolor: '#60B554',
                        '&:hover': { bgcolor: '#50A045' },
                        mt: 2,
                      }}
                      onClick={handleEsewaPayment}
                    >
                      Pay with eSewa
                    </Button>
                  </AccordionDetails>
                </Accordion>

                {/* IME Pay Payment Method Accordion */}
                <Accordion expanded={expanded === 'imepayPanel'} onChange={handleAccordionChange('imepayPanel')}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box component="img" src={imepayLogo} alt="IME Pay Logo" sx={{ height: 30, mr: 2 }} />
                      <Typography variant="h6">Pay with IME Pay</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
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
                    <Button 
                      variant="contained" 
                      fullWidth 
                      sx={{
                        bgcolor: '#1E3376',
                        '&:hover': { bgcolor: '#152550' },
                        mt: 2,
                      }}
                      onClick={handleImepayPayment}
                    >
                      Pay with IME Pay
                    </Button>
                  </AccordionDetails>
                </Accordion>

                {/* Khalti Payment Method Accordion */}
                <Accordion expanded={expanded === 'khaltiPanel'} onChange={handleAccordionChange('khaltiPanel')}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box component="img" src={khaltiLogo} alt="Khalti Logo" sx={{ height: 30, mr: 2 }} />
                      <Typography variant="h6">Pay with Khalti</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
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
                    <Button 
                      variant="contained" 
                      fullWidth 
                      sx={{
                        bgcolor: '#5C2D91',
                        '&:hover': { bgcolor: '#4A2473' },
                        mt: 2,
                      }}
                      onClick={handleKhaltiPayment}
                    >
                      Pay with Khalti
                    </Button>
                  </AccordionDetails>
                </Accordion>

              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PaymentPage; 