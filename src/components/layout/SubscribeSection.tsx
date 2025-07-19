import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import food1 from '../../assets/food1.avif';

const SubscribeSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the subscription logic (API call, etc.)
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setEmail('');
  };

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: '#fff',
        py: { xs: 6, md: 8 },
        px: { xs: 0, md: 0 },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'stretch',
        justifyContent: 'center',
        boxShadow: '0 8px 32px rgba(0,0,0,0.07)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Left: Text and Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: { xs: 'center', md: 'flex-start' },
          px: { xs: 2, md: 8 },
          py: { xs: 4, md: 0 },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: '#222',
            mb: 2,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          Get Exclusive Offers –<br />Subscribe Now
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 4, color: '#555', textAlign: { xs: 'center', md: 'left' } }}
        >
          Sign up for exclusive discounts, updates, and the latest menu items
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 420, display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter Your Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            sx={{ bgcolor: '#fff', borderRadius: 25 }}
            size="medium"
            type="email"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 25,
              px: 4,
              fontWeight: 600,
              boxShadow: '0 2px 8px rgba(255,59,0,0.15)',
              minWidth: 110,
            }}
          >
            {submitted ? 'Subscribed!' : 'Submit'}
          </Button>
        </Box>
      </Box>
      {/* Right: Food Image */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          pr: 6,
        }}
      >
        <Box
          component="img"
          src={food1}
          alt="Delicious food"
          sx={{
            width: '100%',
            maxWidth: 400,
            borderRadius: '0 0 120px 0',
            boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
            objectFit: 'cover',
          }}
        />
      </Box>
    </Box>
  );
};

export default SubscribeSection; 