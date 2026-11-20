import { useQuery } from '@tanstack/react-query';
import { fetchOnThisDay } from '../../api/wikipedia';
import { getMonthDay } from '../../lib/date';

export function useOnThisDay(date: string) {
  const { month, day } = getMonthDay(date);
  return useQuery({
    queryKey: ['onThisDay', month, day],
    queryFn: ({ signal }) => fetchOnThisDay(month, day, signal),
  });
}
