import { queryOptions, useQuery } from '@tanstack/react-query';
import {
  fetchOnThisDayCategory,
  type OnThisDayType,
} from '../../api/wikipedia';
import { getMonthDay } from '../../lib/date';

export function onThisDayCategoryQuery(type: OnThisDayType, date: string) {
  const { month, day } = getMonthDay(date);
  return queryOptions({
    queryKey: ['onThisDay', type, month, day],
    queryFn: ({ signal }) => fetchOnThisDayCategory(type, month, day, signal),
  });
}

export function useOnThisDayCategory(type: OnThisDayType, date: string) {
  return useQuery(onThisDayCategoryQuery(type, date));
}
