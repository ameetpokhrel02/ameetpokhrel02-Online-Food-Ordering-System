import React from 'react';
import { Box, Typography, Container, Button, Link as MuiLink } from '@mui/material';

const AboutPage = () => {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        About Us
      </Typography>

      {/* About Section */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center', mb: 8 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Learn More About Amyths
          </Typography>
          <Typography variant="body1" paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
          <Typography variant="body1" paragraph>
            Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            backgroundImage: 'url(https://via.placeholder.com/600x400)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: 300,
            borderRadius: 2,
          }}
        />
      </Box>

      {/* Our Team Section */}
      <Box sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
          Our Talented Team
        </Typography>
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          justifyContent: 'center',
        }}>
          {/* Placeholder Team Member 1 */}
          <Box sx={{
            flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)', md: '1 1 calc(33.333% - 22px)' },
            maxWidth: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.333% - 22px)' },
            textAlign: 'center'
          }}>
            <Box
              sx={{
                backgroundImage: 'url(https://lh3.googleusercontent.com/a/ACg8ocJD7tq2kPo5jX4gNsvwV6zVJZ7Ma5_obXOuZnBgxLaXUm7M4xhB=s360-c-no)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: 200,
                width: 200,
                borderRadius: '50%',
                mx: 'auto',
                mb: 2,
              }}
            />
            <Typography variant="h6" component="h3" gutterBottom>
              Team Member Name 1
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Role 1
            </Typography>
          </Box>
          {/* Placeholder Team Member 2 */}
          <Box sx={{
            flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)', md: '1 1 calc(33.333% - 22px)' },
            maxWidth: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.333% - 22px)' },
            textAlign: 'center'
          }}>
            <Box
              sx={{
                backgroundImage: 'url(https://lh3.googleusercontent.com/a/ACg8ocLHBH8JEQ1oG9NSNE-EGPF84ln-qk5-1s5J44yQ2krQ5x0JUCU=s360-c-no)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: 200,
                width: 200,
                borderRadius: '50%',
                mx: 'auto',
                mb: 2,
              }}
            />
            <Typography variant="h6" component="h3" gutterBottom>
              Team Member Name 2
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Role 2
            </Typography>
          </Box>
          {/* Placeholder Team Member 3 */}
          <Box sx={{
            flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)', md: '1 1 calc(33.333% - 22px)' },
            maxWidth: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.333% - 22px)' },
            textAlign: 'center'
          }}>
            <Box
              sx={{
                backgroundImage: 'url(https://media.istockphoto.com/id/1165399909/photo/delicious-meal-on-a-black-plate-top-view-copy-space.jpg?s=612x612&w=0&k=20&c=vrMzS4pY_QjiDtCzpVE3ClKqbU636fb4CKH0nlsduC4=)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: 200,
                width: 200,
                borderRadius: '50%',
                mx: 'auto',
                mb: 2,
              }}
            />
            <Typography variant="h6" component="h3" gutterBottom>
              Team Member Name 3
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Role 3
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AboutPage; 