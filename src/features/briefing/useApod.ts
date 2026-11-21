import { queryOptions, useQuery } from '@tanstack/react-query';
import { fetchApod } from '../../api/nasa';

export function apodQuery(date: string) {
  return queryOptions({
    queryKey: ['apod', date],
    queryFn: ({ signal }) => fetchApod(date, signal),
  });
}

export function useApod(date: string) {
  return useQuery(apodQuery(date));
}
