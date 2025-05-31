import React from 'react';
import { Box, Typography, Container, Button, TextField, Paper, TextareaAutosize as MuiTextareaAutosize } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';

const TextareaAutosize = styled(MuiTextareaAutosize)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1.5),
  border: `1px solid ${theme.palette.divider}`, // Use theme divider color
  borderRadius: theme.shape.borderRadius,
  fontSize: '1rem',
  fontFamily: theme.typography.fontFamily,
  '&:focus': {
    borderColor: theme.palette.primary.main, // Highlight on focus
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
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      alert('Message sent (simulated).');
    },
  });

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 6 }}>
        Contact Us
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        {/* Contact Information */}
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 40%' } }}>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              Get in Touch
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              We'd love to hear from you! Please fill out the form or use the contact information below.
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary"><Box component="strong" sx={{ color: '#333' }}>Address:</Box> A108 Adam Street, New York, NY 535022</Typography>
              <Typography variant="body2" color="text.secondary"><Box component="strong" sx={{ color: '#333' }}>Phone:</Box> +1 5589 55488 55</Typography>
              <Typography variant="body2" color="text.secondary"><Box component="strong" sx={{ color: '#333' }}>Email:</Box> info@example.com</Typography>
            </Box>
            {/* Placeholder Map (can be replaced with an actual map embed) */}
            <Box
              sx={{
                width: '100%',
                height: 250,
                backgroundImage: 'url(https://via.placeholder.com/600x250?text=Map+Placeholder)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 1,
                mt: 3,
              }}
            />
          </Paper>
        </Box>

        {/* Contact Form */}
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 60%' } }}>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h6" component="h3" gutterBottom>
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

              <Button color="primary" variant="contained" size="large" fullWidth type="submit">
                Send Message
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default ContactPage; 