import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import AuthLayout from './AuthLayout';
import { useNavigate } from 'react-router-dom';

function handleSendOtp(navigate: any, email: string) {
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }
  // Add API call to send OTP here if needed
  navigate('/otp', { state: { email } });
}

const ForgotPasswordEmail = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <Typography variant="h4" align="center" fontWeight={700} color="#fff" gutterBottom sx={{ mb: 3 }}>
        Forgot Password
      </Typography>
      <Typography align="center" color="#fff" fontSize={15} sx={{ mb: 2, opacity: 0.8 }}>
        Enter your email address to receive an OTP
      </Typography>
      <form onSubmit={function(e) { e.preventDefault(); handleSendOtp(navigate, email); }}>
        <TextField
          fullWidth
          margin="normal"
          label="Email Address"
          name="email"
          type="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={function(e) { setEmail(e.target.value); }}
          sx={{
            input: { color: '#fff' },
            label: { color: 'rgba(255,255,255,0.7)' },
            '& .MuiInputBase-input::placeholder': {
              color: 'rgba(255,255,255,0.7)',
              opacity: 1,
            },
            mb: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(255,255,255,0.3)',
              },
              '&:hover fieldset': {
                borderColor: '#fff',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
          InputLabelProps={{ style: { color: 'rgba(255,255,255,0.7)' } }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ py: 1.2, fontWeight: 700, fontSize: 18, borderRadius: 2, mb: 2, mt: 2 }}
        >
          Send OTP
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordEmail;
