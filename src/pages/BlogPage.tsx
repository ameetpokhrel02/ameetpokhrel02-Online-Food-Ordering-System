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
import technologyInFood from '../assets/technology in food.jpg';
import technologyInFood2 from '../assets/technology in food2.jpg';
import { BlogPost } from '../types/blog';
import { ArrowBack } from '@mui/icons-material';

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
  {
    id: 5,
    title: 'How Technology is Impacting Food',
    imageUrl: technologyInFood,
    category: 'TECHNOLOGY',
    readingTime: '15 MINUTES',
    difficulty: 'Medium',
    author: 'AI Assistant',
    date: 'June 10, 2024',
    content: [
      { type: 'paragraph', text: 'Technology is rapidly transforming the food industry, from farm to fork. Innovations in agricultural technology, such as precision farming and vertical farms, are increasing efficiency and sustainability in food production.' },
      { type: 'image', src: technologyInFood, alt: 'Technology in food' },
      { type: 'paragraph', text: 'Supply chain management is also being revolutionized by blockchain, ensuring transparency and traceability of food products.' },
      { type: 'paragraph', text: 'In the culinary world, AI-powered kitchen robots and smart appliances are changing how food is prepared and consumed. Online food delivery platforms, supported by advanced logistics, have made food more accessible than ever before.' },
      { type: 'image', src: technologyInFood2, alt: 'Technology in food 2' },
      { type: 'paragraph', text: 'Furthermore, personalized nutrition through data analytics is becoming a reality, tailoring dietary recommendations to individual needs.' },
      { type: 'paragraph', text: 'While these advancements offer numerous benefits, including reduced waste and improved food safety, they also raise questions about job displacement and the digital divide. The future of food will undoubtedly be shaped by how we integrate technology responsibly to address global food challenges.' },
    ],
  },
];

const BlogPage = () => {
  const theme = useTheme();
  const [selectedPost, setSelectedPost] = React.useState<BlogPost | null>(null);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
  };

  // Hero section is removed as per new design

  return (
    <Box sx={{ bgcolor: '#fff' }}>
      {selectedPost ? (
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Button 
            startIcon={<ArrowBack />} 
            onClick={() => setSelectedPost(null)} 
            sx={{ mb: 4, color: '#333', textTransform: 'none' }}
          >
            Back to Blog Posts
          </Button>
          <Paper elevation={0} sx={{ borderRadius: '0px', overflow: 'hidden', border: '1px solid #eee' }}>
            <Box sx={{ height: 400, overflow: 'hidden' }}>
              <img src={selectedPost.imageUrl} alt={selectedPost.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
            <Box sx={{ p: 4 }}>
              <Typography variant="overline" sx={{ display: 'block', mb: 1, fontSize: '0.8rem', fontWeight: 600, color: '#666' }}>
                {selectedPost.category} / {selectedPost.date}
              </Typography>
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontFamily: 'serif', fontSize: '2.5rem', fontWeight: 700, color: '#333' }}>
                {selectedPost.title}
              </Typography>
              {selectedPost.content?.map((block, index) => (
                <React.Fragment key={index}>
                  {block.type === 'paragraph' && (
                    <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.8, mb: 2 }}>
                      {block.text}
                    </Typography>
                  )}
                  {block.type === 'image' && (
                    <Box sx={{ my: 3, textAlign: 'center' }}>
                      <img src={block.src} alt={block.alt} style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                      {block.alt && (
                        <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#888' }}>
                          {block.alt}
                        </Typography>
                      )}
                    </Box>
                  )}
                </React.Fragment>
              ))}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 4 }}>
                <Avatar src={blogAuthor} alt="Author" />
                <Typography variant="body2" sx={{ color: '#777', fontWeight: 600 }}>
                  {selectedPost.author}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      ) : (
        <>
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
                    boxShadow: 'none',
                    '&::placeholder': { color: '#999' },
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
                    boxShadow: 'none',
                    '&::placeholder': { color: '#999' },
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
                  border: '1px solid #eee',
                  transition: 'none',
                  '&:hover': {
                    boxShadow: 'none',
                    transform: 'none',
                  },
                }} onClick={() => handlePostClick(post)}>
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
        </>
      )}
    </Box>
  );
};

export default BlogPage; 