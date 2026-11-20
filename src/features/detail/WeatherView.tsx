import { Skeleton } from '@mui/material';
import type { Weather } from '../../api/openMeteo';
import { AsyncState } from '../../components/AsyncState';
import { useWeather } from '../briefing/useWeather';
import { useSelectedDate } from '../date/useSelectedDate';
import { useLocationStore } from '../location/locationStore';
import { WeatherContent } from './WeatherContent';

const loading = (
  <>
    <Skeleton width="70%" />
    <Skeleton width="40%" height={120} sx={{ mt: 2 }} />
    <Skeleton width="50%" />
  </>
);

function hasNoReading(weather: Weather): boolean {
  return (
    weather.tempMax == null &&
    weather.tempMin == null &&
    weather.weatherCode == null &&
    weather.precipitation == null &&
    weather.humidity == null &&
    weather.wind == null &&
    weather.snowfall == null
  );
}

export function WeatherView() {
  const { selectedDate } = useSelectedDate();
  const city = useLocationStore((state) => state.selectedCity);
  const query = useWeather(city.latitude, city.longitude, selectedDate);

  return (
    <AsyncState query={query} loading={loading} isEmpty={hasNoReading}>
      {(weather) => <WeatherContent weather={weather} />}
    </AsyncState>
  );
}
