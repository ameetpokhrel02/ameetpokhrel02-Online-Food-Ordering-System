import React from 'react';
import { Dialog, DialogContent, DialogTitle, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import foodLogo from '../../assets/image.png';

interface LoginSignupModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
  onSignup: () => void;
}

const LoginSignupModal = ({ open, onClose, onLogin, onSignup }: LoginSignupModalProps) => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" PaperProps={{ sx: { borderRadius: 4, bgcolor: '#181818', color: '#fff', p: 2 } }}>
    <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <img src={foodLogo} alt="Food" style={{ height: 36, borderRadius: 8 }} />
        <Typography variant="h6" fontWeight={700} color="primary.main">BiteBazaar</Typography>
      </Box>
      <IconButton onClick={onClose} sx={{ color: '#fff' }}><CloseIcon /></IconButton>
    </DialogTitle>
    <DialogContent sx={{ pt: 1 }}>
      <Typography variant="h5" fontWeight={700} align="center" sx={{ mb: 2 }}>
        Want to see more products?
      </Typography>
      <Typography align="center" sx={{ mb: 3 }}>
        Please <b>Login</b> or <b>Sign Up</b> to unlock the full experience!
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 2 }}>
        <Button onClick={onLogin} variant="contained" color="primary" sx={{ fontWeight: 700, borderRadius: 2, px: 4 }}>
          Login
        </Button>
        <Button onClick={onSignup} variant="outlined" color="secondary" sx={{ fontWeight: 700, borderRadius: 2, px: 4 }}>
          Sign Up
        </Button>
      </Box>
    </DialogContent>
  </Dialog>
);

export default LoginSignupModal; 