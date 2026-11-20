import type { ReactNode } from 'react';
import { Box } from '@mui/material';
import { DateExplorer } from './DateExplorer';
import { DetailTabs } from './DetailTabs';
import type { DetailView } from './views';

interface DetailLayoutProps {
  view: DetailView;
  children: ReactNode;
}

export function DetailLayout({ view, children }: DetailLayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'flex-start' }}>
      <Box sx={{ flex: '1 1 320px', maxWidth: { md: 380 } }}>
        <DateExplorer />
      </Box>
      <Box sx={{ flex: '3 1 520px', minWidth: 0 }}>
        <DetailTabs view={view} />
        <Box sx={{ mt: 4 }}>{children}</Box>
      </Box>
    </Box>
  );
}
