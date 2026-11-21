import { queryOptions, useQuery } from '@tanstack/react-query';
import { fetchOnThisDaySelected } from '../../api/wikipedia';
import { getMonthDay } from '../../lib/date';

export function onThisDaySelectedQuery(date: string) {
  const { month, day } = getMonthDay(date);
  return queryOptions({
    queryKey: ['onThisDay', 'selected', month, day],
    queryFn: ({ signal }) => fetchOnThisDaySelected(month, day, signal),
  });
}

export function useOnThisDaySelected(date: string) {
  return useQuery(onThisDaySelectedQuery(date));
}
