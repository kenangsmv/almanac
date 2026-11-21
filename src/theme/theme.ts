import { createTheme } from '@mui/material/styles';

const colors = {
  bg: '#080B14',
  surface: '#101827',
  accent: '#A78BFA',
  accent2: '#A78BFA',
  text: '#F5F5F5',
  muted: '#9CA3AF',
  border: 'rgba(245, 245, 245, 0.12)',
};

const serif = '"Fraunces", Georgia, serif';

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
    fontFamily: '"DM Sans", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: serif, fontWeight: 400 },
    h2: { fontFamily: serif, fontWeight: 400 },
    h3: { fontFamily: serif, fontWeight: 400 },
    h4: { fontFamily: serif, fontWeight: 400 },
    h5: { fontFamily: serif, fontWeight: 400 },
    h6: { fontFamily: serif, fontWeight: 400 },
  },
  shape: { borderRadius: 14 },
});
