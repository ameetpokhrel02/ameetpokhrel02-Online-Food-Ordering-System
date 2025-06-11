import React from 'react';
import { Box, Typography, Container, Paper, Avatar, Button } from '@mui/material';
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
  },
];

const BlogPage = () => {
  const theme = useTheme();

  // Hero section is removed as per new design

  return (
    <Box sx={{ bgcolor: '#fff' }}>

      {/* Subscribe Section */}
      <Box sx={{ bgcolor: '#fff', py: 8, textAlign: 'center', boxShadow: 'none', borderBottom: '1px solid #eee' }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontFamily: 'serif', fontSize: '2.2rem', fontWeight: 600, color: '#333' }}>
            Get My Free Cookbook Today!
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4, flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Your Name*"
              style={{
                padding: '14px 20px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                width: '220px',
                flex: 'none',
                minWidth: 'unset',
                color: '#333',
                outline: 'none',
                '&::placeholder': { color: '#aaa' },
              }}
            />
            <input
              type="email"
              placeholder="Your Email*"
              style={{
                padding: '14px 20px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                width: '220px',
                flex: 'none',
                minWidth: 'unset',
                color: '#333',
                outline: 'none',
                '&::placeholder': { color: '#aaa' },
              }}
            />
            <Button variant="contained" sx={{
              bgcolor: '#000',
              color: '#fff',
              '&:hover': { bgcolor: '#333' },
              px: 4,
              py: 1.5,
              borderRadius: '4px',
              textTransform: 'uppercase',
              fontWeight: 600,
              fontSize: '1rem',
            }}>
              Subscribe
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Blog Posts Grid */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ fontFamily: 'serif', fontSize: '2.5rem', fontWeight: 600, color: '#333' }} mb={6}>
          Latest Blog Posts
        </Typography>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
          gap: 4,
        }}>
          {blogPosts.map((post) => (
            <Paper key={post.id} elevation={0} sx={{
              borderRadius: '0px',
              overflow: 'hidden',
              cursor: 'pointer',
              border: '1px solid #eee',
              transition: 'none',
              '&:hover': {
                boxShadow: 'none',
                transform: 'none',
              },
            }}>
              <Box sx={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'none' }} />
                <Box sx={{
                  position: 'absolute',
                  inset: 0,
                  bgcolor: 'rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s ease-in-out',
                  '&:hover': {
                    opacity: 1,
                  },
                }}>
                  <Typography variant="button" sx={{ color: '#fff', fontWeight: 700, letterSpacing: 1 }}>
                    Quick Look
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ p: 2 }}>
                <Typography variant="overline" sx={{ display: 'block', mb: 0.5, fontSize: '0.75rem', fontWeight: 600, color: '#666' }}>
                  {post.category}
                </Typography>
                <Typography variant="h6" component="h3" gutterBottom sx={{ lineHeight: 1.3, fontSize: '1.2rem', fontWeight: 600, color: '#333' }}>
                  {post.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 0 }}>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.8rem', color: '#777' }}>
                    <span style={{ color: '#444' }}>&#9200;</span> {post.readingTime}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.8rem', color: '#777' }}>{post.difficulty}</Typography>
                  {post.isPopular && (
                    <Typography variant="body2" sx={{ bgcolor: '#fef0d2', color: '#e0a800', px: 0.8, py: 0.3, borderRadius: '4px', fontWeight: 600, fontSize: '0.7rem' }}>
                      POPULAR
                    </Typography>
                  )}
                  {post.isOrganic && (
                    <Typography variant="body2" sx={{ bgcolor: '#dff0d8', color: '#5cb85c', px: 0.8, py: 0.3, borderRadius: '4px', fontWeight: 600, fontSize: '0.7rem' }}>
                      100% ORGANIC
                    </Typography>
                  )}
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default BlogPage; 