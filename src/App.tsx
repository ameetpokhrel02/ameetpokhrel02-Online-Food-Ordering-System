import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, CircularProgress, Box } from '@mui/material';
// Import placeholder pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import PaymentPage from './pages/PaymentPage';
import MenuPage from './pages/MenuPage';
import BlogPage from './pages/BlogPage';

// Import Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { CartProvider } from './context/CartContext';
import LoginSignupModal from './components/auth/LoginSignupModal';
import SubscribeSection from './components/layout/SubscribeSection';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff3b00', // A red/orange color similar to the template
    },
    secondary: {
      main: '#ff9900', // A complementary orange/yellow
    },
    text: {
      primary: '#333',
      secondary: '#555',
    }
  },
  typography: {
    fontFamily: [
      'Nunito', // A clean sans-serif font, common in modern designs
      'sans-serif',
    ].join(','),
    h1: { fontSize: '3rem', fontWeight: 700 },
    h2: { fontSize: '2.5rem', fontWeight: 700 },
    h3: { fontSize: '2rem', fontWeight: 700 },
    h4: { fontSize: '1.8rem', fontWeight: 700 },
    h5: { fontSize: '1.5rem', fontWeight: 700 },
    h6: { fontSize: '1.2rem', fontWeight: 700 },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    body2: { fontSize: '0.9rem', lineHeight: 1.6 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 25, // Rounded corners for buttons
          padding: '10px 30px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff', // White background for header
          color: '#333', // Dark text for header
        },
      },
    },
  },
});

interface AppRoutesProps {
  search: string;
  setSearch: (query: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

function AppRoutes({ search, setSearch, isLoggedIn, setIsLoggedIn }: AppRoutesProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn || localStorage.getItem('bitebazaar_modal_dismissed')) return;
    const timer = setTimeout(() => {
      setModalOpen(true);
    }, 10000); // 10 seconds
    return () => clearTimeout(timer);
  }, [isLoggedIn]);

  const handleCloseModal = () => setModalOpen(false);
  const handleLogin = () => {
    setModalOpen(false);
    localStorage.setItem('bitebazaar_modal_dismissed', '1');
    navigate('/login');
  };
  const handleSignup = () => {
    setModalOpen(false);
    localStorage.setItem('bitebazaar_modal_dismissed', '1');
    navigate('/signup');
  };

  return (
    <>
      <Header onSearch={setSearch} />
      <Suspense fallback={
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      }>
        <Routes>
          <Route path="/" element={<HomePage search={search} setSearch={setSearch} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage search={search} setSearch={setSearch} />} />
          <Route path="/gallery" element={<GalleryPage search={search} setSearch={setSearch} />} />
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
      <LoginSignupModal open={modalOpen} onClose={handleCloseModal} onLogin={handleLogin} onSignup={handleSignup} />
    </>
  );
}

function App() {
  const [search, setSearch] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate auth
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <AppRoutes search={search} setSearch={setSearch} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
