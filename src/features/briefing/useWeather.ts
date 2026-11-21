import { queryOptions, useQuery } from '@tanstack/react-query';
import { fetchWeather } from '../../api/openMeteo';

export function weatherQuery(latitude: number, longitude: number, date: string) {
  return queryOptions({
    queryKey: ['weather', latitude, longitude, date],
    queryFn: ({ signal }) => fetchWeather(latitude, longitude, date, signal),
  });
}

export function useWeather(latitude: number, longitude: number, date: string) {
  return useQuery(weatherQuery(latitude, longitude, date));
}
