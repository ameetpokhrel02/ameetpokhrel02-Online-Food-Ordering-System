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

  // No hero section as per new design

  return (
    <Box sx={{ bgcolor: '#fff' }}> {/* Changed background to white for the whole page */}

      {/* Subscribe Section */}
      <Box sx={{ bgcolor: '#fff', py: 6, textAlign: 'center', boxShadow: 'none', borderBottom: '1px solid #eee' }}> {/* Removed shadow, added bottom border */}
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom fontWeight={600} color="#333" sx={{ fontFamily: 'serif', fontSize: '2.2rem' }}>
            Get My Free Cookbook Today!
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3, flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Your Name*"
              style={{
                padding: '12px 16px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                width: '250px', // Fixed width for input fields
                flex: 'none',
                minWidth: 'unset',
                color: '#333',
              }}
            />
            <input
              type="email"
              placeholder="Your Email*"
              style={{
                padding: '12px 16px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                width: '250px', // Fixed width for input fields
                flex: 'none',
                minWidth: 'unset',
                color: '#333',
              }}
            />
            <Button variant="contained" sx={{
              bgcolor: '#000', // Black background
              color: '#fff', // White text
              '&:hover': { bgcolor: '#333' },
              px: 4,
              py: 1.5,
              borderRadius: '4px',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}>
              Subscribe
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Blog Posts Grid */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" fontWeight={600} color="#333" mb={6} sx={{ fontFamily: 'serif', fontSize: '2.5rem' }}>
          Latest Blog Posts
        </Typography>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, // 4 columns on larger screens
          gap: 4,
        }}>
          {blogPosts.map((post) => (
            <Paper key={post.id} elevation={0} sx={{
              borderRadius: 0,
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'none', // Removed transition
              '&:hover': {
                transform: 'none', // Removed transform on hover
                boxShadow: 'none', // Removed box shadow on hover
              },
              border: '1px solid #eee', // Subtle border
            }}>
              <Box sx={{ height: 200, overflow: 'hidden' }}>
                <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'none' }} />
              </Box>
              <Box sx={{ p: 2 }}> {/* Reduced padding */}
                <Typography variant="overline" color="#777" sx={{ display: 'block', mb: 0.5, fontSize: '0.75rem', fontWeight: 600 }}> {/* Adjusted color, font size, and margin */}
                  {post.category}
                </Typography>
                <Typography variant="h6" component="h3" fontWeight={600} gutterBottom sx={{ color: '#333', lineHeight: 1.3, fontSize: '1.2rem' }}> {/* Adjusted variant, font size, and line height */}
                  {post.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}> {/* Adjusted gap and margin */}
                  <Typography variant="body2" color="#777" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.8rem' }}> {/* Adjusted color and font size */}
                    <span style={{ color: '#ff3b00' }}>&#9200;</span> {post.readingTime}
                  </Typography>
                  <Typography variant="body2" color="#777" sx={{ fontSize: '0.8rem' }}>{post.difficulty}</Typography> {/* Adjusted color and font size */}
                  {post.isPopular && (
                    <Typography variant="body2" sx={{ bgcolor: '#fef0d2', color: '#e0a800', px: 0.8, py: 0.3, borderRadius: 1, fontWeight: 600, fontSize: '0.7rem' }}>
                      POPULAR
                    </Typography>
                  )}
                  {post.isOrganic && (
                    <Typography variant="body2" sx={{ bgcolor: '#dff0d8', color: '#5cb85c', px: 0.8, py: 0.3, borderRadius: 1, fontWeight: 600, fontSize: '0.7rem' }}>
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