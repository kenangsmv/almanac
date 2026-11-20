import type { ReactNode } from 'react';
import { Typography } from '@mui/material';

interface EyebrowProps {
  children: ReactNode;
}

export function Eyebrow({ children }: EyebrowProps) {
  return (
    <Typography
      component="p"
      sx={{
        color: 'primary.main',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </Typography>
  );
}
