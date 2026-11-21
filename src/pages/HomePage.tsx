import { Box, Button, Typography } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { type Dayjs } from 'dayjs';
import { Eyebrow } from '../components/Eyebrow';
import { useSelectedDate } from '../features/date/useSelectedDate';
import { TeaserCard } from '../features/home/TeaserCard';
import { useDetectedCity } from '../features/location/useDetectedCity';
import { useHomePrefetch } from '../features/home/useHomePrefetch';
import { useHomeTeasers } from '../features/home/useHomeTeasers';
import { formatHuman, todayISO, toISODate } from '../lib/date';

export function HomePage() {
  const { selectedDate, setDate, goToToday } = useSelectedDate();
  useDetectedCity();
  const teasers = useHomeTeasers(selectedDate);
  useHomePrefetch(selectedDate);

  const handleCalendar = (next: Dayjs | null) => {
    if (next && next.isValid()) setDate(toISODate(next.toDate()));
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          alignItems: 'start',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Eyebrow>A digital time capsule</Eyebrow>
          <Typography
            variant="h1"
            sx={{
              fontFamily: '"Bricolage Grotesque", sans-serif',
              fontSize: 'clamp(3rem, 9vw, 8rem)',
              lineHeight: 0.95,
              mt: 2,
              maxWidth: '11ch',
            }}
          >
            Every Date Has a{' '}
            <Box component="em" sx={{ color: 'secondary.main', fontStyle: 'italic' }}>
              Story.
            </Box>
          </Typography>
        </Box>

        <Box>
          <Eyebrow>Choose a date</Eyebrow>
          <Typography variant="h5" sx={{ mt: 1 }}>
            {formatHuman(selectedDate)}
          </Typography>
          <Box sx={{ width: 'fit-content', mt: 1 }}>
            <DateCalendar
              value={dayjs(selectedDate)}
              onChange={handleCalendar}
              minDate={dayjs('1940-01-01')}
              disableFuture
              sx={{
                bgcolor: 'transparent',
                border: 1,
                borderColor: '#a78bfa59',
                borderRadius: 2,
                '& .MuiPickerDay-root.Mui-selected, & .MuiPickersDay-root.Mui-selected': {
                  backgroundColor: 'secondary.main',
                  color: 'secondary.contrastText',
                  '&:hover, &:focus': { backgroundColor: 'secondary.dark' },
                },
                '& .MuiPickerDay-today':{
                  borderColor: 'secondary.main',
                }
              }}
            />
            <Button
              onClick={goToToday}
              disabled={selectedDate === todayISO()}
              variant="text"
              color="secondary"
              fullWidth
              disableElevation
              sx={{ mt: 1,  }}
            >
              Today
            </Button>
          </Box>
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
