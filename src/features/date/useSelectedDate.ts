import { useSearchParams } from 'react-router-dom';
import { addDays, isValidISODate, todayISO } from '../../lib/date';

const DATE_PARAM = 'date';

export function useSelectedDate() {
  const [searchParams, setSearchParams] = useSearchParams();

  const param = searchParams.get(DATE_PARAM);
  const selectedDate = param && isValidISODate(param) ? param : todayISO();

  const setDate = (date: string) => {
    setSearchParams({ [DATE_PARAM]: date });
  };

  return {
    selectedDate,
    setDate,
    goToPrevious: () => setDate(addDays(selectedDate, -1)),
    goToNext: () => setDate(addDays(selectedDate, 1)),
    goToToday: () => setDate(todayISO()),
  };
}
