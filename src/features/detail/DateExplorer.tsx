import { Box, Button, Stack, Typography } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { type Dayjs } from 'dayjs';
import { Eyebrow } from '../../components/Eyebrow';
import { toISODate, todayISO } from '../../lib/date';
import { useSelectedDate } from '../date/useSelectedDate';

export function DateExplorer() {
  const { selectedDate, setDate, goToPrevious, goToNext, goToToday } = useSelectedDate();
  const value = dayjs(selectedDate);

  const handleCalendar = (next: Dayjs | null) => {
    if (next && next.isValid()) setDate(toISODate(next.toDate()));
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        borderRadius: 3,
        p: 3,
        position: { md: 'sticky' },
        top: 88,
      }}
    >
      <Eyebrow>Date explorer</Eyebrow>
      <Box sx={{ display: 'flex', alignItems: 'start', gap: 1.5, mt: 1.5 }}>
        <Typography variant="h1" sx={{ fontSize: 88, lineHeight: 0.9 }}>
          {value.date()}
        </Typography>
        <Box>
          <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
            {value.format('MMMM')}
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: 14 }}>
            {value.year()} · {value.format('dddd')}
          </Typography>
        </Box>
      </Box>

      <Stack direction="row" spacing={1} sx={{ my: 2 }}>
        <Button onClick={goToPrevious} variant="outlined" sx={{ flex: 1 }}>
          ← Prev
        </Button>
        <Button
          onClick={goToToday}
          variant="contained"
          disableElevation
          disabled={selectedDate === todayISO()}
        >
          Today
        </Button>
        <Button onClick={goToNext} variant="outlined" sx={{ flex: 1 }}>
          Next →
        </Button>
      </Stack>

      <DateCalendar
        value={value}
        onChange={handleCalendar}
        disableFuture
        minDate={dayjs('1940-01-01')}
        sx={{ width: '100%' }}
      />
    </Box>
  );
}
