
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  IconButton,
  InputAdornment,
  Link as MuiLink
} from '@mui/material';
import { Visibility, VisibilityOff, Google, GitHub, Facebook } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import AuthLayout from './AuthLayout';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add login logic here
  };

  return (
    <AuthLayout>
      <Typography variant="h4" align="center" fontWeight={700} color="#fff" gutterBottom sx={{ mb: 3 }}>
        Member Login
      </Typography>
      <Typography align="center" color="#fff" fontSize={15} sx={{ mb: 2, opacity: 0.8 }}>
        Please fill in your basic info
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
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
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            input: { color: '#fff' },
            label: { color: 'rgba(255,255,255,0.7)' },
            '& .MuiInputBase-input::placeholder': {
              color: 'rgba(255,255,255,0.7)',
              opacity: 1,
            },
            mb: 1,
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton 
                  onClick={() => setShowPassword((s) => !s)} 
                  edge="end" 
                  tabIndex={-1}
                  sx={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{ py: 1.2, fontWeight: 700, fontSize: 18, borderRadius: 2, mb: 2, mt: 2 }}
        >
          LOGIN
        </Button>
      </form>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, mb: 2 }}>
        <MuiLink component={RouterLink} to="/forgot-password" color="secondary" underline="hover" fontWeight={700}>
          Forgot Password?
        </MuiLink>
        <MuiLink component={RouterLink} to="/signup" color="secondary" underline="hover" fontWeight={700}>
          Create account
        </MuiLink>
      </Box>
      <Divider sx={{ my: 2, color: '#fff', opacity: 0.5 }}>or sign in with</Divider>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 1 }}>
        <IconButton color="primary" sx={{ bgcolor: '#fff', '&:hover': { bgcolor: '#eee' } }}><Google /></IconButton>
        <IconButton color="primary" sx={{ bgcolor: '#fff', '&:hover': { bgcolor: '#eee' } }}><GitHub /></IconButton>
        <IconButton color="primary" sx={{ bgcolor: '#fff', '&:hover': { bgcolor: '#eee' } }}><Facebook /></IconButton>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;