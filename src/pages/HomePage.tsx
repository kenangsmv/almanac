import { Box, Divider, Typography } from '@mui/material';
import { Eyebrow } from '../components/Eyebrow';
import { DateNavigator } from '../features/date/DateNavigator';
import { useSelectedDate } from '../features/date/useSelectedDate';
import { TeaserCard } from '../features/home/TeaserCard';
import { useHomeTeasers } from '../features/home/useHomeTeasers';
import { formatHuman } from '../lib/date';

export function HomePage() {
  const { selectedDate } = useSelectedDate();
  const teasers = useHomeTeasers(selectedDate);

  return (
    <Box>
      <Eyebrow>A digital time capsule</Eyebrow>
      <Typography
        variant="h1"
        sx={{ fontSize: 'clamp(3rem, 9vw, 8rem)', lineHeight: 0.95, mt: 2, maxWidth: '11ch' }}
      >
        Every Date Has a{' '}
        <Box component="em" sx={{ color: 'secondary.main', fontStyle: 'italic' }}>
          Story.
        </Box>
      </Typography>

      <Divider sx={{ my: 4 }} />

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, alignItems: 'flex-end' }}>
        <Typography
          sx={{
            flex: '1 1 320px',
            maxWidth: 520,
            color: 'text.secondary',
            fontSize: 18,
            lineHeight: 1.6,
          }}
        >
          Travel back in time and discover the sky, the weather, and the moments that
          shaped the world on any day you choose.
        </Typography>
        <Box sx={{ flex: '1 1 380px' }}>
          <Eyebrow>Choose a date</Eyebrow>
          <Box sx={{ mt: 1.5 }}>
            <DateNavigator />
          </Box>
          <Typography variant="h5" sx={{ mt: 1.5 }}>
            {formatHuman(selectedDate)}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          mt: 6,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 3,
        }}
      >
        {teasers.map((teaser) => (
          <TeaserCard key={teaser.to} {...teaser} />
        ))}
      </Box>
    </Box>
  );
}
