import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Divider, IconButton, InputAdornment, Link as MuiLink, Alert, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff, Google, GitHub, Facebook } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import AuthLayout from './AuthLayout';
import { Link, useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password should be at least 6 characters').required('Password is required'),
});

interface FormErrors {
  email?: string;
  password?: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Here you would typically make an API call to your backend
        console.log('Login attempt with:', values);
        // For now, we'll just show an alert
        alert('Login successful!');
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please try again.');
      }
    },
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Handle successful login
      navigate('/');
    } catch (error) {
      setSubmitError('Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Box sx={{ width: '100%', maxWidth: 340 }}>
        <Typography variant="h4" align="center" fontWeight={700} color="#fff" gutterBottom sx={{ mb: 3 }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          {submitError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {submitError}
            </Alert>
          )}
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            disabled={isLoading}
            sx={{
              input: { color: 'rgba(0, 0, 0, 0.87)' },
              label: { color: 'rgba(0, 0, 0, 0.6)' },
              '& .MuiInputBase-input::placeholder': {
                color: 'rgba(0, 0, 0, 0.6)',
                opacity: 1,
              },
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
            InputLabelProps={{ style: { color: 'rgba(0, 0, 0, 0.6)' } }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            disabled={isLoading}
            sx={{
              input: { color: 'rgba(0, 0, 0, 0.87)' },
              label: { color: 'rgba(0, 0, 0, 0.6)' },
              '& .MuiInputBase-input::placeholder': {
                color: 'rgba(0, 0, 0, 0.6)',
                opacity: 1,
              },
              mb: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
            InputLabelProps={{ style: { color: 'rgba(0, 0, 0, 0.6)' } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={() => setShowPassword((s) => !s)} 
                    edge="end" 
                    tabIndex={-1}
                    sx={{ color: 'rgba(0, 0, 0, 0.6)' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <MuiLink component={Link} to="#" color="secondary" underline="hover" fontSize={14}>
              Forgot Password?
            </MuiLink>
          </Box>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ py: 1.2, fontWeight: 700, fontSize: 18, borderRadius: 2, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </form>
        <Divider sx={{ my: 2, color: '#fff' }}>or continue with</Divider>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
          <IconButton color="primary" sx={{ bgcolor: '#fff', '&:hover': { bgcolor: '#eee' } }}><Google /></IconButton>
          <IconButton color="primary" sx={{ bgcolor: '#fff', '&:hover': { bgcolor: '#eee' } }}><GitHub /></IconButton>
          <IconButton color="primary" sx={{ bgcolor: '#fff', '&:hover': { bgcolor: '#eee' } }}><Facebook /></IconButton>
        </Box>
        <Typography align="center" color="#fff" fontSize={15}>
          Don&apos;t have an account yet?{' '}
          <MuiLink component={Link} to="/signup" color="secondary" underline="hover" fontWeight={700}>
            Register for free
          </MuiLink>
        </Typography>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage; 