import { createTheme } from '@mui/material/styles';

/**
 * Central MUI theme. Kept intentionally small for the foundation;
 * palette/typography will grow alongside the briefing UI.
 */
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#3a4a6b' },
    secondary: { main: '#c58b4f' },
    background: { default: '#f6f7fb' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: { borderRadius: 10 },
});
