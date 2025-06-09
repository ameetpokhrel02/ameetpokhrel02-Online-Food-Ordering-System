import React from 'react';
import { Box, Typography, Button, TextField, Divider, IconButton, InputAdornment, Link as MuiLink } from '@mui/material';
import { Visibility, VisibilityOff, Google, GitHub, Facebook } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import AuthLayout from './AuthLayout';
import { Link } from 'react-router-dom';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password should be at least 6 characters').required('Password is required'),
});

const SignupPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Here you would typically make an API call to your backend
        console.log('Signup attempt with:', values);
        // For now, we'll just show an alert
        alert('Signup successful!');
      } catch (error) {
        console.error('Signup failed:', error);
        alert('Signup failed. Please try again.');
      }
    },
  });

  return (
    <AuthLayout>
      <Box sx={{ width: '100%', maxWidth: 340 }}>
        <Typography variant="h4" align="center" fontWeight={700} color="#fff" gutterBottom sx={{ mb: 3 }}>
          Sign Up
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            type="text"
            autoComplete="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={{ 
              input: { color: '#fff' }, 
              label: { color: '#fff' }, 
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
            InputLabelProps={{ style: { color: '#fff' } }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ 
              input: { color: '#fff' }, 
              label: { color: '#fff' }, 
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
            InputLabelProps={{ style: { color: '#fff' } }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ 
              input: { color: '#fff' }, 
              label: { color: '#fff' }, 
              mb: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={() => setShowPassword((s) => !s)} 
                    edge="end" 
                    tabIndex={-1}
                    sx={{ color: '#fff' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ py: 1.2, fontWeight: 700, fontSize: 18, borderRadius: 2, mb: 2 }}
          >
            Sign up
          </Button>
        </form>
        <Divider sx={{ my: 2, color: '#fff' }}>or continue with</Divider>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
          <IconButton color="primary" sx={{ bgcolor: '#fff', '&:hover': { bgcolor: '#eee' } }}><Google /></IconButton>
          <IconButton color="primary" sx={{ bgcolor: '#fff', '&:hover': { bgcolor: '#eee' } }}><GitHub /></IconButton>
          <IconButton color="primary" sx={{ bgcolor: '#fff', '&:hover': { bgcolor: '#eee' } }}><Facebook /></IconButton>
        </Box>
        <Typography align="center" color="#fff" fontSize={15}>
          Already have an account?{' '}
          <MuiLink component={Link} to="/login" color="secondary" underline="hover" fontWeight={700}>
            Login
          </MuiLink>
        </Typography>
      </Box>
    </AuthLayout>
  );
};

export default SignupPage; 