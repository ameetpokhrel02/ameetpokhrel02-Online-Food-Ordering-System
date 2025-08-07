import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AuthLayout from './AuthLayout';
import { useNavigate } from 'react-router-dom';

function handleGoLogin(navigate: any) {
  navigate('/login');
}

const PasswordUpdated = () => {
  const navigate = useNavigate();
  return (
    <AuthLayout>
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="h4" fontWeight={700} color="#fff" gutterBottom sx={{ mb: 3 }}>
          Password Updated!
        </Typography>
        <Typography color="#fff" fontSize={16} sx={{ mb: 3, opacity: 0.9 }}>
          Your password has been updated successfully. You can now log in with your new password.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, fontWeight: 700, fontSize: 18, borderRadius: 2, px: 5, py: 1.2 }}
          onClick={function() { handleGoLogin(navigate); }}
        >
          Go to Login
        </Button>
      </Box>
    </AuthLayout>
  );
};

export default PasswordUpdated;
