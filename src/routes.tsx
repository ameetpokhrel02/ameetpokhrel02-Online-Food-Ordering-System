import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useAppSelector } from './hooks/useAppSelector';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SubscribeSection from './components/layout/SubscribeSection';

// Lazy-loaded pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ProductsPage = React.lazy(() => import('./pages/ProductsPage'));
const GalleryPage = React.lazy(() => import('./pages/GalleryPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const LoginPage = React.lazy(() => import('./components/auth/LoginPage'));
const SignupPage = React.lazy(() => import('./components/auth/SignupPage'));
const PaymentPage = React.lazy(() => import('./pages/PaymentPage'));
const MenuPage = React.lazy(() => import('./pages/MenuPage'));
const BlogPage = React.lazy(() => import('./pages/BlogPage'));

const AppRoutes: React.FC = () => {
  const { search } = useAppSelector((state) => state.ui);

  return (
    <>
      <Header />
      <Suspense
        fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </Box>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/gallery" element={<GalleryPage/>} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
      </Suspense>
      <SubscribeSection />
      <Footer />
    </>
  );
};

export default AppRoutes; 