import { Button, IconButton, Stack } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { type Dayjs } from 'dayjs';
import { toISODate, todayISO } from '../../lib/date';
import { useSelectedDate } from './useSelectedDate';

export function DateNavigator() {
  const { selectedDate, setDate, goToPrevious, goToNext, goToToday } =
    useSelectedDate();

  const handleDateChange = (value: Dayjs | null) => {
    if (value && value.isValid()) setDate(toISODate(value.toDate()));
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      useFlexGap
      sx={{ alignItems: 'center', flexWrap: 'wrap' }}
    >
      <IconButton
        onClick={goToPrevious}
        aria-label="Previous day"
        sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}
      >
        <ChevronLeftIcon />
      </IconButton>

      <DatePicker
        value={dayjs(selectedDate)}
        onChange={handleDateChange}
        slotProps={{ textField: { size: 'small' } }}
      />

      <IconButton
        onClick={goToNext}
        aria-label="Next day"
        sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}
      >
        <ChevronRightIcon />
      </IconButton>

      <Button
        onClick={goToToday}
        disabled={selectedDate === todayISO()}
        variant="contained"
        disableElevation
      >
        Today
      </Button>
    </Stack>
  );
}
