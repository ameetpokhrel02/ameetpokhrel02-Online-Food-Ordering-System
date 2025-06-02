import React from 'react';
import { Box, Paper } from '@mui/material';
import foodLogo from '../../assets/image.png';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: '#111',
    }}
  >
    <Paper
      elevation={8}
      sx={{
        display: 'flex',
        borderRadius: 4,
        overflow: 'hidden',
        minWidth: { xs: 340, md: 800 },
        minHeight: { xs: 400, md: 480 },
        bgcolor: 'transparent',
        border: '2px solid #fff2',
      }}
    >
      {/* Left: Food image/logo and background */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#000',
          p: 4,
          minWidth: 340,
        }}
      >
        <img src={foodLogo} alt="Food" style={{ maxWidth: 260, borderRadius: 16, boxShadow: '0 8px 32px #0008' }} />
      </Box>
      {/* Right: Form area */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#181818',
          p: { xs: 3, md: 6 },
        }}
      >
        {children}
      </Box>
    </Paper>
  </Box>
);

export default AuthLayout; 