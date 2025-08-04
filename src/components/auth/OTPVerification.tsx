import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper
} from '@mui/material';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add OTP verification logic here
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" sx={{ mb: 3, color: '#FF4B3A' }}>
            Verify Your Email
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Please enter the verification code sent to your email
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="otp"
              label="Verification Code"
              name="otp"
              autoFocus
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2,
                backgroundColor: '#FF4B3A',
                '&:hover': {
                  backgroundColor: '#ff3621'
                }
              }}
            >
              Verify
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default OTPVerification;