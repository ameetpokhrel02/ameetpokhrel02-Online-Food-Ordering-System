import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Button, Fade } from '@mui/material';
import vegetableGirl2 from '../assets/vegetable girl 2.jpg';
import vegetableGirl4 from '../assets/vegetable girl 4.jpg';
import { Link as RouterLink } from 'react-router-dom';
import AboutQualitySection from '../components/AboutQualitySection';

const aboutSlides = [
  {
    image: vegetableGirl2,
    title: 'Empowering Women Farmers',
    subtitle: 'Fresh from the Fields',
    pills: [
      { color: '#e8f5e9', textColor: '#388e3c', icon: '👩‍🌾', label: 'Women-led farms' },
      { color: '#fffde7', textColor: '#fbc02d', icon: '🥕', label: 'Organic vegetables' },
    ],
    desc: 'We support women farmers by bringing their fresh, organic produce directly to your table. Every purchase helps empower local communities.',
    info: 'Sustainably grown, hand-picked, and delivered with care.',
    button: 'Meet Our Farmers',
    buttonLink: '/about#farmers',
  },
  {
    image: vegetableGirl4,
    title: 'Healthy Eating, Happy Living',
    subtitle: 'Eat Well, Live Well',
    pills: [
      { color: '#e3f2fd', textColor: '#1976d2', icon: '🥗', label: 'Nutritious meals' },
      { color: '#fce4ec', textColor: '#d81b60', icon: '🍅', label: 'Farm to table' },
    ],
    desc: 'Discover the joy of healthy eating with our range of fresh, seasonal vegetables. Perfect for every meal and every lifestyle.',
    info: 'Freshness guaranteed, taste the difference every day.',
    button: 'Explore Recipes',
    buttonLink: '/about#recipes',
  },
];

const AboutPage = () => {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % aboutSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const current = aboutSlides[slide];

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        About Us
      </Typography>
      {/* Animated About Section */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 6, bgcolor: '#f6fcf7', borderRadius: 4, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', px: { xs: 2, md: 6 }, py: { xs: 4, md: 6 }, mb: 8 }}>
        {/* Left: Animated Text */}
        <Box sx={{ flex: 2, pr: { md: 6 }, textAlign: { xs: 'center', md: 'left' } }}>
          <Fade in timeout={600} key={slide}>
            <Box>
              <Typography variant="subtitle1" sx={{ color: '#4caf50', fontWeight: 600, mb: 1 }}>
                {current.subtitle}
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: '#222' }}>
                {current.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                {current.pills.map((pill, i) => (
                  <Box key={i} sx={{ bgcolor: pill.color, color: pill.textColor, px: 2.5, py: 1, borderRadius: 99, fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', boxShadow: 1 }}>
                    <span role="img" aria-label="icon" style={{ marginRight: 8 }}>{pill.icon}</span> {pill.label}
                  </Box>
                ))}
              </Box>
              <Typography variant="body1" sx={{ mb: 2, color: '#555' }}>{current.desc}</Typography>
              <Box sx={{ bgcolor: '#e0f7fa', color: '#00796b', px: 3, py: 2, borderRadius: 2, mb: 3, fontWeight: 500, fontSize: '1.1rem', display: 'inline-block' }}>{current.info}</Box>
              <br />
              <Button variant="contained" color="primary" size="large" component={RouterLink} to={current.buttonLink} sx={{ mt: 2, borderRadius: 25, px: 5, py: 1.5, fontWeight: 600, fontSize: '1.1rem', bgcolor: '#ff3b00', '&:hover': { bgcolor: '#c1452b' } }}>{current.button}</Button>
            </Box>
          </Fade>
        </Box>
        {/* Right: Animated Image */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', mt: { xs: 4, md: 0 } }}>
          <Fade in timeout={600} key={slide + '-img'}>
            <Box
              component="img"
              src={current.image}
              alt={current.title}
              sx={{ width: { xs: '80%', md: 340 }, maxWidth: 400, borderRadius: '24px', boxShadow: '0 8px 32px rgba(0,0,0,0.10)', objectFit: 'cover', background: '#fff' }}
            />
          </Fade>
        </Box>
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
      <AboutQualitySection />
    </Container>
  );
};

export default AboutPage; 