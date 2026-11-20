import { Link as RouterLink } from 'react-router-dom';
import { Box } from '@mui/material';
import { useSelectedDate } from '../date/useSelectedDate';
import type { DetailView } from './views';

const TABS: { view: DetailView; label: string; to: string }[] = [
  { view: 'sky', label: 'The Sky', to: '/sky' },
  { view: 'weather', label: 'The Weather', to: '/weather' },
  { view: 'history', label: 'History', to: '/history' },
];

interface DetailTabsProps {
  view: DetailView;
}

export function DetailTabs({ view }: DetailTabsProps) {
  const { selectedDate } = useSelectedDate();
  const search = `?date=${selectedDate}`;

  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', borderBottom: 2, borderColor: 'divider' }}>
      {TABS.map((tab) => {
        const active = tab.view === view;
        return (
          <Box
            key={tab.view}
            component={RouterLink}
            to={{ pathname: tab.to, search }}
            sx={{
              px: 2.25,
              py: 1.5,
              mb: '-2px',
              color: active ? 'text.primary' : 'text.secondary',
              textDecoration: 'none',
              borderBottom: '3px solid',
              borderColor: active ? 'primary.main' : 'transparent',
              fontWeight: 600,
              letterSpacing: '0.1em',
              fontSize: 14,
            }}
          >
            {tab.label}
          </Box>
        );
      })}
    </Box>
  );
}
