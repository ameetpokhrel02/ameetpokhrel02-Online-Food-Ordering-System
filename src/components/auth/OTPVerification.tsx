

import React, { useRef } from 'react';
import { Box, Button, Typography, OutlinedInput } from '@mui/material';
import AuthLayout from './AuthLayout';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';



function handleBackToLogin(navigate: NavigateFunction) {
  navigate('/login');
}

const OTPVerification = () => {
  const [otp, setOtp] = React.useState(['', '', '', '', '', '']);
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';
  React.useEffect(function() {
    if (!email) {
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, idx: number) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (!value) return;
    const newOtp = [...otp];
    newOtp[idx] = value[value.length - 1];
    setOtp(newOtp);
    if (idx < 5 && value) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>, idx: number) => {
      if (e.key === 'Backspace') {
        if (otp[idx]) {
          const newOtp = [...otp];
          newOtp[idx] = '';
          setOtp(newOtp);
        } else if (idx > 0) {
          inputsRef.current[idx - 1]?.focus();
        }
      }
    };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (paste.length === 6) {
      setOtp(paste.split(''));
      inputsRef.current[5]?.focus();
      e.preventDefault();
    }
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (otp.join('').length !== 6) {
      alert('Please enter the 6-digit OTP.');
      return;
    }
    // Add OTP verification logic here
    navigate('/change-password');
  }

  return (
    <AuthLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 420, width: '100%' }}>
        <Typography variant="h4" align="center" fontWeight={700} color="#fff" gutterBottom sx={{ mb: 2, letterSpacing: 0.5 }}>
          Enter OTP
        </Typography>
        <Typography align="center" color="#fff" fontSize={15} sx={{ mb: 2, opacity: 0.8 }}>
          We have share a code of your registered email address
        </Typography>
        {email && (
          <Typography align="center" color="#fff" fontSize={15} sx={{ mb: 2, opacity: 0.8 }}>
            {email}
          </Typography>
        )}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.2, mb: 3 }}>
            {otp.map(function(digit, idx) {
              return (
                <OutlinedInput
                  key={idx}
                  inputRef={function(el) {
                    if (el && 'focus' in el) {
                      inputsRef.current[idx] = el;
                    } else {
                      inputsRef.current[idx] = null;
                    }
                  }}
                  value={digit}
                  onChange={function(e) { handleChange(e, idx); }}
                  onKeyDown={function(e) { handleKeyDown(e, idx); }}
                  onPaste={function(e) { handlePaste(e as React.ClipboardEvent<HTMLInputElement>); }}
                  inputProps={{
                    maxLength: 1,
                    style: {
                      textAlign: 'center',
                      fontSize: 17,
                      width: 36,
                      height: 36,
                      background: '#fff',
                      borderRadius: 4,
                      color: '#222',
                      fontWeight: 600,
                      border: '1.2px solid #e0e0e0',
                      outline: 'none',
                      boxShadow: '0 1px 4px #0001',
                      transition: 'border 0.2s, box-shadow 0.2s',
                    },
                  }}
                  sx={{
                    bgcolor: '#fff',
                    borderRadius: 1,
                    boxShadow: '0 1px 4px #0001',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e0e0e0',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ff5722',
                      boxShadow: '0 0 0 2px #ff572233',
                    },
                  }}
                  autoFocus={idx === 0}
                  type="text"
                />
              );
            })}
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              py: 1.1,
              fontWeight: 700,
              fontSize: 18,
              borderRadius: 2,
              mb: 2,
              mt: 2,
              background: '#ff5722',
              color: '#fff',
              boxShadow: '0 2px 8px #ff572233',
              textTransform: 'none',
              letterSpacing: 0.5,
              '&:hover': {
                background: '#e64a19',
                boxShadow: '0 4px 16px #ff572244',
              },
            }}
          >
            Enter OTP
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="text"
              color="secondary"
              startIcon={<span style={{ fontSize: 20, marginRight: 4 }}>&#8592;</span>}
              sx={{ textTransform: 'none', fontWeight: 600, fontSize: 16, color: '#ff5722' }}
              onClick={function() { handleBackToLogin(navigate); }}
            >
              Back To Login
            </Button>
          </Box>
        </form>
      </Box>
    </AuthLayout>
  );
};

export default OTPVerification;