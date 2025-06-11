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
import foodTechno from '../assets/food techno.jpg';
import aiFarming from '../assets/ai farming.jpg';
import framAi from '../assets/fram ai.jpg';
import aiVideo from '../assets/ai vide.mp4';
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
      { type: 'image', src: technologyInFood2, alt: 'Technology in food 2 additional' },
    ],
  },
  {
    id: 6,
    title: 'How AI is Revolutionizing Food Creation',
    imageUrl: foodTechno,
    category: 'TECHNOLOGY',
    readingTime: '12 MINUTES',
    difficulty: 'Medium',
    author: 'AI Assistant',
    date: 'June 15, 2024',
    content: [
      { type: 'paragraph', text: 'Artificial Intelligence is transforming the way we create, prepare, and experience food. From recipe development to automated cooking systems, AI is becoming an integral part of the culinary world.' },
      { type: 'image', src: foodTechno, alt: 'AI in Food Technology' },
      { type: 'paragraph', text: 'One of the most exciting developments is AI-powered recipe creation. Advanced algorithms can analyze thousands of recipes, understand flavor combinations, and generate new, innovative dishes that maintain perfect balance and taste. These AI chefs can consider dietary restrictions, nutritional requirements, and even cultural preferences to create personalized recipes.' },
      { type: 'paragraph', text: 'Smart kitchen appliances equipped with AI are making professional-level cooking accessible to everyone. These devices can monitor cooking temperatures, adjust cooking times, and even suggest modifications based on the ingredients available. Some advanced systems can even learn from your preferences and adapt recipes to your taste.' },
      { type: 'paragraph', text: 'Food safety and quality control have also been enhanced through AI. Computer vision systems can detect defects in produce, monitor food freshness, and ensure consistent quality across production lines. This technology helps reduce food waste and ensures that only the best quality products reach consumers.' },
      { type: 'paragraph', text: 'The future of AI in food creation looks even more promising. We\'re seeing the development of fully automated restaurants where AI systems handle everything from order taking to food preparation. These innovations are not just about automation; they\'re about creating better, more consistent, and more personalized food experiences for everyone.' },
    ],
  },
  {
    id: 7,
    title: 'The Future of Farming: AI-Powered Agriculture',
    imageUrl: aiFarming,
    category: 'TECHNOLOGY',
    readingTime: '15 MINUTES',
    difficulty: 'Medium',
    author: 'AI Assistant',
    date: 'June 20, 2024',
    content: [
      { type: 'paragraph', text: 'Artificial Intelligence is revolutionizing agriculture, making farming more efficient, sustainable, and productive than ever before. From precision farming to automated harvesting, AI is transforming every aspect of modern agriculture.' },
      { type: 'image', src: aiFarming, alt: 'AI in Modern Farming' },
      { type: 'paragraph', text: 'One of the most significant impacts of AI in farming is precision agriculture. Using sensors, drones, and machine learning algorithms, farmers can now monitor crop health, soil conditions, and weather patterns in real-time. This data-driven approach allows for precise application of water, fertilizers, and pesticides, reducing waste and environmental impact while maximizing yields.' },
      { type: 'paragraph', text: 'Automated farming equipment, guided by AI, is another game-changing development. Smart tractors and harvesters can operate autonomously, following optimized routes and performing tasks with incredible precision. These machines can work around the clock, increasing productivity while reducing labor costs.' },
      { type: 'image', src: framAi, alt: 'AI-Powered Farm Equipment' },
      { type: 'paragraph', text: 'Predictive analytics powered by AI is helping farmers make better decisions. By analyzing historical data and current conditions, AI systems can predict crop yields, identify potential disease outbreaks, and suggest optimal planting and harvesting times. This foresight helps farmers plan better and reduce risks.' },
      { type: 'paragraph', text: 'Vertical farming and controlled environment agriculture are also benefiting from AI integration. Automated systems can monitor and adjust lighting, temperature, humidity, and nutrient levels to create optimal growing conditions. This technology is particularly valuable in urban areas where space is limited and in regions with challenging climates.' },
      { type: 'paragraph', text: 'The future of AI in farming looks even more promising. We\'re seeing the development of robotic systems that can perform delicate tasks like fruit picking, and AI-powered systems that can identify and remove weeds without harming crops. These innovations are making farming more sustainable and efficient while helping to feed a growing global population.' },
    ],
  },
  {
    id: 8,
    title: 'From Farm to Kitchen: How AI is Revolutionizing Food Production',
    imageUrl: foodTechno,
    category: 'TECHNOLOGY',
    readingTime: '20 MINUTES',
    difficulty: 'Medium',
    author: 'AI Assistant',
    date: 'June 25, 2024',
    content: [
      { type: 'paragraph', text: 'The integration of Artificial Intelligence in both farming and food preparation is creating a seamless, efficient, and sustainable food production chain. From the moment seeds are planted to when dishes are served, AI is transforming every step of the process.' },
      { type: 'image', src: foodTechno, alt: 'AI in Food Production' },
      { type: 'paragraph', text: 'In modern farming, AI-powered systems are revolutionizing traditional agricultural practices. Smart sensors embedded in soil monitor moisture levels, nutrient content, and pH balance in real-time. Drones equipped with advanced imaging technology scan fields to detect early signs of disease or pest infestation, allowing farmers to take preventive measures before crops are affected. Machine learning algorithms analyze weather patterns and historical data to predict optimal planting and harvesting times, maximizing yield while minimizing resource usage.' },
      { type: 'paragraph', text: 'The impact of AI extends beyond the fields. In food processing facilities, computer vision systems ensure consistent quality by detecting defects and sorting produce with incredible accuracy. Automated systems can process thousands of items per hour, reducing waste and maintaining high standards. AI-powered logistics optimize delivery routes, ensuring fresh produce reaches markets and restaurants at peak quality.' },
      { type: 'paragraph', text: 'In professional kitchens, AI is becoming an indispensable tool for chefs and food makers. Smart kitchen appliances can now monitor cooking temperatures, adjust cooking times, and even suggest modifications based on ingredient availability. Recipe management systems powered by AI can analyze thousands of recipes, understand flavor combinations, and help chefs create innovative dishes while maintaining perfect balance and taste.' },
      { type: 'paragraph', text: 'One of the most exciting developments is the emergence of AI-powered cooking assistants. These systems can analyze a chef\'s cooking style, learn from their preferences, and suggest improvements or variations to recipes. They can also help with inventory management, predicting ingredient needs based on historical usage patterns and upcoming menu items.' },
      { type: 'paragraph', text: 'Food safety has been significantly enhanced through AI integration. Smart sensors in storage areas monitor temperature and humidity levels, alerting staff to potential issues before they affect food quality. AI systems can track the entire journey of ingredients from farm to plate, ensuring transparency and traceability in the food supply chain.' },
      { type: 'paragraph', text: 'The benefits of AI in food production extend to sustainability and resource management. Smart irrigation systems use AI to optimize water usage, reducing waste while maintaining crop health. In kitchens, AI can help reduce food waste by predicting demand and optimizing portion sizes. Energy management systems can adjust cooking equipment usage based on real-time demand, reducing energy consumption.' },
      { type: 'paragraph', text: 'Looking to the future, we\'re seeing the development of fully automated vertical farms that use AI to create optimal growing conditions. These facilities can produce food year-round in urban areas, reducing transportation costs and environmental impact. In professional kitchens, we\'re moving toward fully automated cooking systems that can prepare complex dishes with minimal human intervention.' },
      { type: 'paragraph', text: 'The integration of AI in food production is not just about automation; it\'s about creating a more efficient, sustainable, and innovative food system. By combining the precision of AI with human expertise, we\'re creating a future where food is produced more efficiently, with less waste, and with greater attention to quality and sustainability. This technological revolution is not just changing how we grow and prepare food; it\'s transforming our entire relationship with what we eat.' },
    ],
  },
];

const BlogPage = () => {
  const theme = useTheme();
  const [selectedPost, setSelectedPost] = React.useState<BlogPost | null>(null);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
  };

  return (
    <Box sx={{ bgcolor: '#fff' }}>
      {/* Hero Section with Video */}
      <Box sx={{ position: 'relative', height: '80vh', overflow: 'hidden' }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0
          }}
        >
          <source src={aiVideo} type="video/mp4" />
        </video>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            textAlign: 'center',
            px: 2
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 700,
              mb: 2,
              fontFamily: 'serif'
            }}
          >
            Technology & Food Blog
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              maxWidth: '800px',
              mb: 4
            }}
          >
            Exploring the intersection of technology, AI, and the future of food
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#fff',
              color: '#000',
              '&:hover': {
                bgcolor: '#f0f0f0'
              },
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              textTransform: 'none'
            }}
          >
            Read Latest Articles
          </Button>
        </Box>
      </Box>

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