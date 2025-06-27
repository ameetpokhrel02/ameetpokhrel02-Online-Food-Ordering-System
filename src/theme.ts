import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ff3b00',
    },
    secondary: {
      main: '#ff9900',
    },
    text: {
      primary: '#333',
      secondary: '#555',
    },
  },
  typography: {
    fontFamily: [
      'Nunito',
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
          borderRadius: 25,
          padding: '10px 30px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          color: '#333',
        },
      },
    },
  },
}); 