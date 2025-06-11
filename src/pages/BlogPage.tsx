import React from 'react';
import { Box, Typography, Container, Paper, Avatar, Divider, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import pizza from '../assets/pizza.jpg';
import foodDeliveryBoy from '../assets/food delivery boy.jpg';
import vegetable from '../assets/vegetable.jpg';
import blogAuthor from '../assets/amit.jpg';
import bakedSweetPotatoes from '../assets/buff-keema-noodles.jpg';
import creamyAvocadoPumpkin from '../assets/momo.jpeg';
import honeyFrenchToast from '../assets/lolipop.jpg';
import beetrootSmoothie from '../assets/chicken.jpg';
import { BlogPost } from '../types/blog';

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Baked sweet potatoes with creamy avocado & pumpkin',
    imageUrl: bakedSweetPotatoes,
    category: 'TIPS & TRICKS',
    readingTime: '30 MINUTES',
    difficulty: 'Super Easy',
    isPopular: true,
    author: 'Maggy Dawson',
    date: 'May 13, 2019',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 2,
    title: 'Baked sweet potatoes with creamy avocado & pumpkin',
    imageUrl: creamyAvocadoPumpkin,
    category: 'TIPS & TRICKS',
    readingTime: '30 MINUTES',
    difficulty: 'Super Easy',
    author: 'Maggy Dawson',
    date: 'May 13, 2019',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 3,
    title: 'Baked sweet potatoes with creamy avocado & pumpkin',
    imageUrl: honeyFrenchToast,
    category: 'TIPS & TRICKS',
    readingTime: '30 MINUTES',
    difficulty: 'Super Easy',
    author: 'Maggy Dawson',
    date: 'May 13, 2019',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 4,
    title: 'Baked sweet potatoes with creamy avocado & pumpkin',
    imageUrl: beetrootSmoothie,
    category: 'TIPS & TRICKS',
    readingTime: '30 MINUTES',
    difficulty: 'Super Easy',
    isOrganic: true,
    author: 'Maggy Dawson',
    date: 'May 13, 2019',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

const BlogPage = () => {
  const theme = useTheme();

  const [currentHeroSlide, setCurrentHeroSlide] = React.useState(0);
  const featuredPost = blogPosts[currentHeroSlide];

  const handleHeroSlideChange = (index: number) => {
    setCurrentHeroSlide(index);
  };

  return (
    <Box sx={{ bgcolor: '#f7f7f7' }}>
      {/* Hero Section */}
      <Box sx={{
        position: 'relative',
        height: { xs: 400, md: 600 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        overflow: 'hidden',
        backgroundImage: `url(${featuredPost.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0,0,0,0.2)',
        },
      }}>
        <Container maxWidth="lg" sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          p: { xs: 2, md: 0 },
        }}>
          {/* Left: Numbered Navigation */}
          <Box sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            alignItems: 'flex-start',
            mr: { md: 8, lg: 12 },
            gap: 2,
            color: 'rgba(255,255,255,0.7)',
            fontSize: '1.2rem',
            fontWeight: 500,
          }}>
            {blogPosts.slice(0, 3).map((_, index) => (
              <Typography 
                key={index}
                variant="body1"
                sx={{
                  cursor: 'pointer',
                  transition: 'color 0.3s',
                  color: currentHeroSlide === index ? '#fff' : 'rgba(255,255,255,0.7)',
                  textDecoration: currentHeroSlide === index ? 'underline' : 'none',
                  '&:hover': { color: '#fff' },
                }}
                onClick={() => handleHeroSlideChange(index)}
              >
                {`0${index + 1}`}
              </Typography>
            ))}
          </Box>

          {/* Right: Content for Featured Post */}
          <Box sx={{ flex: 1, maxWidth: { xs: '100%', md: 600 } }}>
            <Typography variant="subtitle1" color="#fff" sx={{ mb: 1, textTransform: 'uppercase', letterSpacing: 2 }}>
              {featuredPost.category}
            </Typography>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '2.5rem', md: '4rem' }, fontFamily: 'serif' }}>
              {featuredPost.title}
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 600, mx: { xs: 'auto', md: 0 }, color: 'rgba(255,255,255,0.9)' }}>
              {featuredPost.description}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Avatar src={blogAuthor} sx={{ width: 40, height: 40, mr: 2, border: '1px solid #fff' }} />
              <Box>
                <Typography variant="subtitle2" fontWeight={600} color="#fff">{featuredPost.author}</Typography>
                <Typography variant="caption" color="rgba(255,255,255,0.7)">{featuredPost.date}</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Subscribe Section */}
      <Box sx={{ bgcolor: '#fff', py: 6, textAlign: 'center', boxShadow: '0 -4px 12px rgba(0,0,0,0.05)' }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom fontWeight={600} color="#333">
            Get My Free Cookbook Today!
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3, flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Your Name*"
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                width: { xs: '100%', sm: 'auto' },
                flex: 1,
                minWidth: 200,
              }}
            />
            <input
              type="email"
              placeholder="Your Email*"
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                width: { xs: '100%', sm: 'auto' },
                flex: 1,
                minWidth: 200,
              }}
            />
            <Button variant="contained" sx={{ bgcolor: '#333', color: '#fff', '&:hover': { bgcolor: '#555' }, px: 4, py: 1.5, borderRadius: '8px', textTransform: 'uppercase', fontWeight: 600 }}>
              Subscribe
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Blog Posts Grid */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" fontWeight={600} color="#333" mb={6}>
          Latest Blog Posts
        </Typography>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 4,
        }}>
          {blogPosts.map((post) => (
            <Paper key={post.id} elevation={2} sx={{
              borderRadius: 4,
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
              },
            }}>
              <Box sx={{ height: 200, overflow: 'hidden' }}>
                <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }} />
              </Box>
              <Box sx={{ p: 3 }}>
                <Typography variant="overline" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                  {post.category}
                </Typography>
                <Typography variant="h5" component="h3" fontWeight={600} gutterBottom sx={{ color: '#333' }}>
                  {post.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <span style={{ color: '#ff3b00' }}>&#9200;</span> {post.readingTime}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">{post.difficulty}</Typography>
                  {post.isPopular && (
                    <Typography variant="body2" sx={{ bgcolor: '#ffc107', color: '#333', px: 1, py: 0.5, borderRadius: 1, fontWeight: 600, fontSize: '0.7rem' }}>
                      POPULAR
                    </Typography>
                  )}
                  {post.isOrganic && (
                    <Typography variant="body2" sx={{ bgcolor: '#a8e063', color: '#333', px: 1, py: 0.5, borderRadius: 1, fontWeight: 600, fontSize: '0.7rem' }}>
                      100% ORGANIC
                    </Typography>
                  )}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {post.description}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default BlogPage; 