import { Button, IconButton, Stack } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { toISODate, todayISO } from '../../lib/date';
import { useSelectedDate } from './useSelectedDate';

export function DateNavigator() {
  const { selectedDate, setDate, goToPrevious, goToNext, goToToday } =
    useSelectedDate();

  return (
    <Stack
      direction="row"
      spacing={1}
      useFlexGap
      sx={{ alignItems: 'center', flexWrap: 'wrap' }}
    >
      <IconButton onClick={goToPrevious} aria-label="Previous day">
        <ChevronLeftIcon />
      </IconButton>

      <DatePicker
        label="Date"
        value={dayjs(selectedDate)}
        onChange={(value) => {
          if (value && value.isValid()) setDate(toISODate(value.toDate()));
        }}
        slotProps={{ textField: { size: 'small' } }}
      />

      <IconButton onClick={goToNext} aria-label="Next day">
        <ChevronRightIcon />
      </IconButton>

      <Button onClick={goToToday} disabled={selectedDate === todayISO()}>
        Today
      </Button>
    </Stack>
  );
}
