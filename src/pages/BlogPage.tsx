import React from 'react';
import { Box, Typography, Container, Paper, Avatar, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import robotChef from '../assets/robot_chef.jpg'; // Assuming you have an image like this
import smartphoneFood from '../assets/smartphone_food.jpg'; // Assuming you have an image like this
import healthyEating from '../assets/healthy_eating.jpg'; // Assuming you have an image like this
import blogAuthor from '../assets/amit.jpg'; // Using Amit's image as a placeholder for author

const BlogPage = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden', mb: 6 }}>
        {/* Blog Post Hero Section */}
        <Box sx={{ position: 'relative', height: { xs: 250, sm: 350, md: 450 }, overflow: 'hidden' }}>
          <img 
            src={robotChef} // Use a relevant asset here
            alt="Technology in Food" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
          <Box sx={{ 
            position: 'absolute', 
            inset: 0, 
            bgcolor: 'rgba(0,0,0,0.4)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#fff',
            textAlign: 'center',
            p: 3
          }}>
            <Box>
              <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
                The Digital Table: How Technology is Reshaping Our Eating Habits
              </Typography>
              <Typography variant="h6" sx={{ mt: 2, fontStyle: 'italic' }}>
                Exploring the evolution of food consumption in the digital age.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Blog Post Content */}
        <Box sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar src={blogAuthor} sx={{ width: 56, height: 56, mr: 2 }} />
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>By Your Website Name Team</Typography>
              <Typography variant="body2" color="text.secondary">Published on October 26, 2023</Typography>
            </Box>
          </Box>

          <Typography variant="body1" paragraph>
            Welcome to the future of food! In an increasingly connected world, technology isn't just changing how we communicate or work; it's profoundly transforming our relationship with food. From farm to fork, digital innovations are making eating healthier, more convenient, and more personalized than ever before.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
            The Rise of Food Delivery Apps
          </Typography>
          <Typography variant="body1" paragraph>
            Gone are the days when ordering food meant flipping through paper menus and making phone calls. Mobile food delivery apps like Uber Eats, DoorDash, and Grubhub have revolutionized convenience, allowing us to get almost any cuisine delivered to our doorstep with a few taps. This ease of access has diversified our eating habits, exposing us to a wider array of culinary experiences from the comfort of our homes.
          </Typography>
          <Box sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
            <img 
              src={smartphoneFood} // Use a relevant asset here
              alt="Food Delivery App" 
              style={{ maxWidth: '100%', height: 'auto', borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
            />
          </Box>
          <Typography variant="body1" paragraph>
            However, this convenience also brings challenges. The reliance on processed foods and the temptation of unhealthy options are growing concerns. Balancing quick access with mindful eating becomes crucial.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
            Personalized Nutrition and Smart Kitchens
          </Typography>
          <Typography variant="body1" paragraph>
            Beyond delivery, technology is enabling a new era of personalized nutrition. Wearable devices track our activity levels and suggest dietary needs, while apps offer tailored meal plans based on our health goals and dietary restrictions. Smart kitchen appliances, from intelligent ovens to automated meal preparers, are making cooking more efficient and less daunting for busy individuals.
          </Typography>
          <Box sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
            <img 
              src={healthyEating} // Use a relevant asset here
              alt="Healthy Eating Tech" 
              style={{ maxWidth: '100%', height: 'auto', borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
            />
          </Box>
          <Typography variant="body1" paragraph>
            These innovations empower us to make more informed choices about what we eat, fostering a proactive approach to health and wellness. They help us understand the nutritional value of our food and can even guide us towards sustainable eating practices.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
            Connecting with Food Sources
          </Typography>
          <Typography variant="body1" paragraph>
            Technology is also bridging the gap between consumers and food producers. Online farmers' markets and direct-from-farm delivery services allow us to access fresh, local produce and support sustainable agriculture. Blockchain technology is even being explored to enhance food traceability, ensuring transparency and safety in the supply chain.
          </Typography>
          
          <Typography variant="body1" paragraph>
            At [Your Website Name], we embrace these technological advancements to bring you the best culinary experience. We believe that technology, when used thoughtfully, can enhance our connection to food, promote healthier habits, and create a more sustainable food system for everyone. Join us on this exciting journey!
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="body2" color="text.secondary" align="center">
            &copy; 2023 Your Website Name. All rights reserved.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default BlogPage; 