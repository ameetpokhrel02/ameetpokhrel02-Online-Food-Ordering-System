
import React, { useRef } from 'react';
import { Box, Button, Typography, OutlinedInput } from '@mui/material';
import AuthLayout from './AuthLayout';


const OTPVerification = () => {
  const [otp, setOtp] = React.useState(['', '', '', '', '', '']);
  const inputsRef = Array.from({ length: 6 }, () => useRef());

  const handleChange = (e, idx) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (!value) return;
    const newOtp = [...otp];
    newOtp[idx] = value[value.length - 1];
    setOtp(newOtp);
    if (idx < 5 && value) {
      // @ts-ignore
      inputsRef[idx + 1].current.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace') {
      if (otp[idx]) {
        const newOtp = [...otp];
        newOtp[idx] = '';
        setOtp(newOtp);
      } else if (idx > 0) {
        // @ts-ignore
        inputsRef[idx - 1].current.focus();
      }
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (paste.length === 6) {
      setOtp(paste.split(''));
      // @ts-ignore
      inputsRef[5].current.focus();
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add OTP verification logic here
  };

  return (
    <AuthLayout>
      <Typography variant="h4" align="center" fontWeight={700} color="#fff" gutterBottom sx={{ mb: 3 }}>
        Verify Your Email
      </Typography>
      <Typography align="center" color="#fff" fontSize={15} sx={{ mb: 2, opacity: 0.8 }}>
        Please enter the verification code sent to your email
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
          {otp.map((digit, idx) => (
            <OutlinedInput
              key={idx}
              inputRef={inputsRef[idx]}
              value={digit}
              onChange={e => handleChange(e, idx)}
              onKeyDown={e => handleKeyDown(e, idx)}
              onPaste={handlePaste}
              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: 'center',
                  fontSize: 22,
                  width: 44,
                  height: 56,
                  background: 'rgba(255,255,255,0.12)',
                  borderRadius: 3,
                  color: '#222',
                  fontWeight: 600,
                  border: '1.5px solid #d1d5db',
                  outline: 'none',
                  boxShadow: '0 1px 4px #0001',
                },
              }}
              sx={{
                bgcolor: 'rgba(255,255,255,0.12)',
                borderRadius: 1,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#d1d5db',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              }}
              autoFocus={idx === 0}
              type="text"
            />
          ))}
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ py: 1.2, fontWeight: 700, fontSize: 18, borderRadius: 2, mb: 2, mt: 2 }}
        >
          Verify
        </Button>
      </form>
    </AuthLayout>
  );
};

export default OTPVerification;