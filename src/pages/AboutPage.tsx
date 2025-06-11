import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Button, Fade, IconButton, Dialog } from '@mui/material';
import vegetableGirl2 from '../assets/vegetable girl 2.jpg';
import vegetableGirl4 from '../assets/vegetable girl 4.jpg';
import { Link as RouterLink } from 'react-router-dom';
import AboutQualitySection from '../components/AboutQualitySection';
import FoodDeliverySection from '../components/FoodDeliverySection';
import { GitHub, Instagram, LinkedIn, Chat } from '@mui/icons-material';
import amitImg from '../assets/amit.jpg';
import ameetImg from '../assets/ameet.jpg';
import himaniImg from '../assets/vegetable girl 2.jpg';

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
  const [chatOpen, setChatOpen] = useState(false);

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

      <AboutQualitySection />
      <FoodDeliverySection sx={{ bgcolor: '#fff' }} />

      {/* Our Talented Team Section */}
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
          {/* Team Member 1 */}
          <Box
            sx={{
              position: 'relative',
              flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)', md: '1 1 calc(25% - 18px)' },
              maxWidth: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(25% - 18px)' },
              textAlign: 'center',
              p: 3,
              borderRadius: 4,
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              bgcolor: '#fff',
              '&:hover': {
                transform: 'translateY(-10px) scale(1.04)',
                boxShadow: '0 8px 32px #00bcd433',
              },
            }}
          >
            <Box
              component="img"
              src={amitImg}
              alt="Amit Kumar"
              sx={{
                width: 140,
                height: 140,
                objectFit: 'cover',
                borderRadius: '50%',
                mx: 'auto',
                mb: 2,
                border: '4px solid #00bcd4',
                transition: 'border-color 0.3s',
                boxShadow: '0 2px 12px #00bcd422',
              }}
            />
            <Typography variant="h6" component="h3" gutterBottom>
              Amit Kumar
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Full Stack Developer
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Amit leads our backend and infrastructure, ensuring robust and scalable systems.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
              <IconButton component="a" href="https://github.com/amit" target="_blank" rel="noopener" sx={{ color: '#333', transition: 'color 0.3s', '&:hover': { color: '#24292e', bgcolor: '#e3e3e3' } }}><GitHub /></IconButton>
              <IconButton component="a" href="https://instagram.com/amit" target="_blank" rel="noopener" sx={{ color: '#E4405F', transition: 'color 0.3s', '&:hover': { color: '#C13584', bgcolor: '#fce4ec' } }}><Instagram /></IconButton>
              <IconButton component="a" href="https://linkedin.com/in/amit" target="_blank" rel="noopener" sx={{ color: '#0A66C2', transition: 'color 0.3s', '&:hover': { color: '#004182', bgcolor: '#e3f2fd' } }}><LinkedIn /></IconButton>
            </Box>
          </Box>
          {/* Team Member 2 */}
          <Box
            sx={{
              position: 'relative',
              flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)', md: '1 1 calc(25% - 18px)' },
              maxWidth: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(25% - 18px)' },
              textAlign: 'center',
              p: 3,
              borderRadius: 4,
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              bgcolor: '#fff',
              '&:hover': {
                transform: 'translateY(-10px) scale(1.04)',
                boxShadow: '0 8px 32px #00bcd433',
              },
            }}
          >
            <Box
              component="img"
              src={ameetImg}
              alt="Ameet Pokhrel"
              sx={{
                width: 140,
                height: 140,
                objectFit: 'cover',
                borderRadius: '50%',
                mx: 'auto',
                mb: 2,
                border: '4px solid #00bcd4',
                transition: 'border-color 0.3s',
                boxShadow: '0 2px 12px #00bcd422',
              }}
            />
            <Typography variant="h6" component="h3" gutterBottom>
              Ameet Pokhrel
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Frontend Designer
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Ameet specializes in UI/UX prototyping and comprehensive documentation.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
              <IconButton component="a" href="https://github.com/ameet" target="_blank" rel="noopener" sx={{ color: '#333', transition: 'color 0.3s', '&:hover': { color: '#24292e', bgcolor: '#e3e3e3' } }}><GitHub /></IconButton>
              <IconButton component="a" href="https://instagram.com/ameet" target="_blank" rel="noopener" sx={{ color: '#E4405F', transition: 'color 0.3s', '&:hover': { color: '#C13584', bgcolor: '#fce4ec' } }}><Instagram /></IconButton>
              <IconButton component="a" href="https://linkedin.com/in/ameet" target="_blank" rel="noopener" sx={{ color: '#0A66C2', transition: 'color 0.3s', '&:hover': { color: '#004182', bgcolor: '#e3f2fd' } }}><LinkedIn /></IconButton>
            </Box>
          </Box>
          {/* Team Member 3 */}
          <Box
            sx={{
              position: 'relative',
              flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)', md: '1 1 calc(25% - 18px)' },
              maxWidth: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(25% - 18px)' },
              textAlign: 'center',
              p: 3,
              borderRadius: 4,
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              bgcolor: '#fff',
              '&:hover': {
                transform: 'translateY(-10px) scale(1.04)',
                boxShadow: '0 8px 32px #00bcd433',
              },
            }}
          >
            <Box
              component="img"
              src={himaniImg}
              alt="Himani Ghimire"
              sx={{
                width: 140,
                height: 140,
                objectFit: 'cover',
                borderRadius: '50%',
                mx: 'auto',
                mb: 2,
                border: '4px solid #00bcd4',
                transition: 'border-color 0.3s',
                boxShadow: '0 2px 12px #00bcd422',
              }}
            />
            <Typography variant="h6" component="h3" gutterBottom>
              Himani Ghimire
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Marketing Specialist
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Himani excels in digital marketing and customer engagement strategies.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
              <IconButton component="a" href="https://github.com/himani" target="_blank" rel="noopener" sx={{ color: '#333', transition: 'color 0.3s', '&:hover': { color: '#24292e', bgcolor: '#e3e3e3' } }}><GitHub /></IconButton>
              <IconButton component="a" href="https://instagram.com/himani" target="_blank" rel="noopener" sx={{ color: '#E4405F', transition: 'color 0.3s', '&:hover': { color: '#C13584', bgcolor: '#fce4ec' } }}><Instagram /></IconButton>
              <IconButton component="a" href="https://linkedin.com/in/himani" target="_blank" rel="noopener" sx={{ color: '#0A66C2', transition: 'color 0.3s', '&:hover': { color: '#004182', bgcolor: '#e3f2fd' } }}><LinkedIn /></IconButton>
            </Box>
          </Box>
        </Box>
        {/* Floating Chat Button */}
        <Box sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1300 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Chat />}
            sx={{ borderRadius: '50%', minWidth: 64, minHeight: 64, width: 64, height: 64, boxShadow: '0 2px 8px #00bcd422', transition: 'box-shadow 0.3s', '&:hover': { boxShadow: '0 6px 24px #00bcd444', bgcolor: 'primary.dark' }, fontSize: 32, p: 0 }}
            onClick={() => setChatOpen(true)}
          >
          </Button>
        </Box>
        {/* Chat Modal */}
        <Dialog open={chatOpen} onClose={() => setChatOpen(false)} maxWidth="xs" fullWidth>
          <Box sx={{ p: 3, bgcolor: '#f6fcf7', borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>Chat with our Team</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Ask us anything! Our team will respond as soon as possible.</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <input type="text" placeholder="Type your message..." style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 16 }} />
              <Button variant="contained" color="primary">Send</Button>
            </Box>
          </Box>
        </Dialog>
      </Box>
    </Container>
  );
};

export default AboutPage; 