import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography
} from '@mui/material';
import AuthLayout from './AuthLayout';

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add password reset logic here
  };

  return (
    <AuthLayout>
      <Typography variant="h4" align="center" fontWeight={700} color="#fff" gutterBottom sx={{ mb: 3 }}>
        Reset Password
      </Typography>
      <Typography align="center" color="#fff" fontSize={15} sx={{ mb: 2, opacity: 0.8 }}>
        Enter your email address and we'll send you a link to reset your password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Email Address"
          name="email"
          type="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          Send Reset Link
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;