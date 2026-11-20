import { useQuery } from '@tanstack/react-query';
import { fetchApod } from '../../api/nasa';

export function useApod(date: string) {
  return useQuery({
    queryKey: ['apod', date],
    queryFn: ({ signal }) => fetchApod(date, signal),
  });
}
