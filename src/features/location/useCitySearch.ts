import { useQuery } from '@tanstack/react-query';
import { searchCities } from '../../api/openMeteo';

export function useCitySearch(query: string) {
  return useQuery({
    queryKey: ['cities', query],
    queryFn: ({ signal }) => searchCities(query, signal),
    enabled: query.trim().length >= 2,
  });
}
