import { createTheme } from '@mui/material/styles';

const colors = {
  bg: '#080B14',
  surface: '#101827',
  accent: '#7CA8FF',
  accent2: '#A78BFA',
  text: '#F5F5F5',
  muted: '#9CA3AF',
  border: 'rgba(245, 245, 245, 0.12)',
};

const serif = '"Instrument Serif", Georgia, serif';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: colors.accent },
    secondary: { main: colors.accent2 },
    background: { default: colors.bg, paper: colors.surface },
    text: { primary: colors.text, secondary: colors.muted },
    divider: colors.border,
  },
  typography: {
    fontFamily: '"Archivo", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: serif, fontWeight: 400 },
    h2: { fontFamily: serif, fontWeight: 400 },
    h3: { fontFamily: serif, fontWeight: 400 },
    h4: { fontFamily: serif, fontWeight: 400 },
    h5: { fontFamily: serif, fontWeight: 400 },
    h6: { fontFamily: serif, fontWeight: 400 },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          '--bg': colors.bg,
          '--surface': colors.surface,
          '--accent': colors.accent,
          '--accent-2': colors.accent2,
          '--text': colors.text,
          '--muted': colors.muted,
          '--border': colors.border,
        },
        body: {
          backgroundColor: colors.bg,
          backgroundImage:
            'radial-gradient(1200px 600px at 80% -10%, rgba(124, 168, 255, 0.1), transparent 60%), radial-gradient(900px 500px at -10% 20%, rgba(167, 139, 250, 0.08), transparent 60%)',
          backgroundRepeat: 'no-repeat',
        },
      },
    },
  },
});
