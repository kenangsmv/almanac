import { useQuery } from '@tanstack/react-query';
import { fetchWeather } from '../../api/openMeteo';

export function useWeather(latitude: number, longitude: number, date: string) {
  return useQuery({
    queryKey: ['weather', latitude, longitude, date],
    queryFn: ({ signal }) => fetchWeather(latitude, longitude, date, signal),
  });
}
