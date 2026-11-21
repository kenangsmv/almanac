import { Button } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { type Dayjs } from 'dayjs';
import { toISODate, todayISO } from '../../lib/date';
import { useSelectedDate } from './useSelectedDate';
import styles from './DatePicker.module.css';

/** Shared date control: prev/next/today navigation plus the calendar. */
export function DatePicker() {
  const { selectedDate, setDate, goToPrevious, goToNext, goToToday } = useSelectedDate();
  const value = dayjs(selectedDate);

  const handleCalendar = (next: Dayjs | null) => {
    if (next && next.isValid()) setDate(toISODate(next.toDate()));
  };

  return (
    <div className={styles.picker}>
      <div className={styles.nav}>
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
      </div>
      <DateCalendar
        value={value}
        onChange={handleCalendar}
        minDate={dayjs('1940-01-01')}
        disableFuture
        sx={{
          bgcolor: 'transparent',
          border: 1,
          borderColor: '#a78bfa59',
          borderRadius: 2,
          width: '100%',
          '& .MuiPickerDay-root.Mui-selected, & .MuiPickersDay-root.Mui-selected': {
            backgroundColor: 'secondary.main',
            color: 'secondary.contrastText',
            '&:hover, &:focus': { backgroundColor: 'secondary.dark' },
          },
          '& .MuiPickerDay-today': {
            borderColor: 'secondary.main',
          },
        }}
      />
    </div>
  );
}
