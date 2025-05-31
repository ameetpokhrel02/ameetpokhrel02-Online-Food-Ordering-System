import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff3b00', // Your primary color (orange)
    },
    secondary: {
      main: '#668B52', // Your secondary color (green)
    },
     background: {
       default: '#f8f8f8', // Light grey background
     },
  },
  typography: {
    fontFamily: 'Nunito, sans-serif', // Your preferred font family
  },
   components: {
     MuiButton: {
       styleOverrides: {
         root: {
           textTransform: 'none', // Prevent uppercase text on buttons
         },
       },
     },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)', // Default shadow for Paper
            borderRadius: 8,
          },
        },
      },
   },
});

export default theme; 