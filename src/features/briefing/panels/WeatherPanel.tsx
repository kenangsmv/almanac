import { Card, CardContent, Skeleton, Typography } from '@mui/material';
import type { City, Weather } from '../../../api/openMeteo';
import { AsyncState } from '../AsyncState';
import { useWeather } from '../useWeather';
import { WeatherContent } from './WeatherContent';

interface WeatherPanelProps {
  date: string;
  city: City;
}

const loading = (
  <>
    <Skeleton width="50%" />
    <Skeleton width="30%" height={40} />
    <Skeleton width="40%" />
  </>
);

function hasNoReading(weather: Weather): boolean {
  return (
    weather.tempMax == null &&
    weather.tempMin == null &&
    weather.weatherCode == null &&
    weather.precipitation == null
  );
}

export function WeatherPanel({ date, city }: WeatherPanelProps) {
  const query = useWeather(city.latitude, city.longitude, date);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Weather
        </Typography>
        <AsyncState query={query} loading={loading} isEmpty={hasNoReading}>
          {(weather) => <WeatherContent city={city} weather={weather} />}
        </AsyncState>
      </CardContent>
    </Card>
  );
}
