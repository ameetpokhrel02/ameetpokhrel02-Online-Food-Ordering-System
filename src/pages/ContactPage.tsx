import React from 'react';
import { Box, Typography, Container, Button, TextField, Paper, TextareaAutosize as MuiTextareaAutosize } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import deliveryGif from '../assets/delivery.gif';

const TextareaAutosize = styled(MuiTextareaAutosize)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1.5),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  fontSize: '1rem',
  fontFamily: theme.typography.fontFamily,
  '&:focus': {
    borderColor: theme.palette.primary.main,
    outline: 'none',
  },
}));

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required'),
});

const ContactPage = () => {
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setSubmitStatus('idle');
      setSubmitError(null);
      try {
        const response = await fetch('/api/contact/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          setSubmitStatus('success');
          resetForm();
        } else {
          const data = await response.json();
          setSubmitStatus('error');
          setSubmitError(data?.message || 'Failed to send message.');
        }
      } catch (err) {
        setSubmitStatus('error');
        setSubmitError('Failed to send message. Please try again.');
      }
    },
  });

  return (
    <Box sx={{
      py: 8,
      bgcolor: 'linear-gradient(135deg, #fff8f5 0%, #ffe0d9 100%)',
      minHeight: '100vh',
    }}>
      <Container>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 6, color: '#ff3b00', fontWeight: 700 }}>
          Contact Us
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 6, alignItems: 'stretch', justifyContent: 'center' }}>
          {/* Contact Information + Delivery Image */}
          <Paper elevation={6} sx={{
            flex: { xs: '1 1 100%', md: '1 1 40%' },
            p: { xs: 3, md: 5 },
            borderRadius: 5,
            bgcolor: '#fff8f5',
            position: 'relative',
            overflow: 'visible',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: { xs: 6, md: 0 },
            boxShadow: '0 8px 32px rgba(255,59,0,0.08)',
          }}>
            <Box sx={{ mt: 10, textAlign: 'center', width: '100%' }}>
              <Typography variant="h6" component="h3" gutterBottom sx={{ color: '#ff3b00', fontWeight: 700 }}>
                Get in Touch
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                We'd love to hear from you! Please fill out the form or use the contact information below.
              </Typography>
              <Box sx={{ mb: 2, textAlign: 'left' }}>
                <Typography variant="body2" color="text.secondary"><Box component="strong" sx={{ color: '#333' }}>Address:</Box> A108 Adam Street, New York, NY 535022</Typography>
                <Typography variant="body2" color="text.secondary"><Box component="strong" sx={{ color: '#333' }}>Phone:</Box> +1 5589 55488 55</Typography>
                <Typography variant="body2" color="text.secondary"><Box component="strong" sx={{ color: '#333' }}>Email:</Box> info@example.com</Typography>
              </Box>
              {/* Delivery GIF below contact info */}
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 4,
              }}>
                <Box sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(255,59,0,0.10)',
                  bgcolor: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <img src={deliveryGif} alt="Delivery Animation" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* Contact Form */}
          <Paper elevation={3} sx={{
            flex: { xs: '1 1 100%', md: '1 1 60%' },
            p: { xs: 3, md: 5 },
            borderRadius: 5,
            bgcolor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(255,59,0,0.08)',
          }}>
            <Typography variant="h6" component="h3" gutterBottom sx={{ color: '#ff3b00', fontWeight: 700 }}>
              Send us a message
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Your Name"
                variant="outlined"
                sx={{ mb: 3 }}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Your Email"
                variant="outlined"
                sx={{ mb: 3 }}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                id="subject"
                name="subject"
                label="Subject"
                variant="outlined"
                sx={{ mb: 3 }}
                value={formik.values.subject}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.subject && Boolean(formik.errors.subject)}
                helperText={formik.touched.subject && formik.errors.subject}
              />
              <TextareaAutosize
                aria-label="message"
                minRows={6}
                placeholder="Your Message"
                name="message"
                id="message"
                style={{ width: '100%', marginBottom: '24px' }}
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.message && formik.errors.message && (
                <Typography variant="caption" color="error" sx={{ mt: -2, mb: 2, display: 'block' }}>
                  {formik.errors.message}
                </Typography>
              )}

              <Button color="primary" variant="contained" size="large" fullWidth type="submit" sx={{ borderRadius: 3, fontWeight: 700, fontSize: 18, py: 1.5, mt: 1 }} disabled={formik.isSubmitting}>
                {formik.isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
              {submitStatus === 'success' && (
                <Typography color="success.main" sx={{ mt: 2 }}>
                  Message sent successfully!
                </Typography>
              )}
              {submitStatus === 'error' && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {submitError || 'Failed to send message.'}
                </Typography>
              )}
            </Box>
          </Paper>
        </Box>

        {/* Google Maps Embed */}
        <Box sx={{ mt: 8, width: '100%' }}>
          <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 4, color: '#ff3b00', fontWeight: 700 }}>
            Find Us on the Map
          </Typography>
          <Box sx={{
            width: '100%',
            height: 400, // Adjust height as needed
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
          }}>
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src="https://www.google.com/maps?q=Kathmandu,+Nepal&hl=en&z=14&output=embed"
              allowFullScreen
            >
            </iframe>
          </Box>
        </Box>

      </Container>
    </Box>
  );
};

export default ContactPage; 