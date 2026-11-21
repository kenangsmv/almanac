import type { ReactNode } from 'react';
import { Box } from '@mui/material';
import { DateExplorer } from './DateExplorer';

interface DetailLayoutProps {
  children: ReactNode;
}

export function DetailLayout({ children }: DetailLayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'flex-start' }}>
      <Box sx={{ flex: '1 1 320px', maxWidth: { md: 380 } }}>
        <DateExplorer />
      </Box>
      <Box sx={{ flex: '3 1 520px', minWidth: 0 }}>{children}</Box>
    </Box>
  );
}
