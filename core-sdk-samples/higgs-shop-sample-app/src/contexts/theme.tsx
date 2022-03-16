import { createTheme } from '@mui/material/styles';
import '@fontsource/lato';

const fontFamily = 'Lato, Arial, sans-serif';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#4079FE', contrastText: '#FFFFFF' },
        secondary: { main: '#7EF7D9', contrastText: '#00FF00' },
        background: {
            default: '#0E1014',
            paper: '#121212',
        },
    },
    typography: {
        fontFamily,
        button: {
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: 15,
            textTransform: 'none',
        },
        h3: {
            color: '#FFFFFF',
            fontFamily,
            fontStyle: 'normal',
            fontWeight: 900,
            fontSize: '48px',
            lineHeight: '56px',
            textAlign: 'center',
        },
        h5: {
            color: '#FFFFFF',
            fontFamily,
            fontStyle: 'normal',
            fontWeight: 800,
            fontSize: '24px',
            lineHeight: '24px',
            letterSpacing: '0.15px',
        },
        h6: {
            color: '#FFFFFF',
            fontFamily,
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '20px',
            lineHeight: '24px',
            letterSpacing: '0.15px',
        },
        body1: {
            color: '#FFFFFF',
            fontFamily,
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '0.15px',
        },
        body2: {
            color: 'rgba(255, 255, 255, 0.6)',
            fontFamily,
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '0.15px',
        },
        caption: {
            color: 'rgba(255, 255, 255, 0.6)',
            fontFamily,
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '12px',
            lineHeight: '16px',
            letterSpacing: '0.2px',
        },
    },
});

export default theme;
