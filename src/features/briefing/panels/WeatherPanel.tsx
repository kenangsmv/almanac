import { Box, Card, CardContent, Skeleton, Typography } from '@mui/material';
import type { Weather } from '../../../api/openMeteo';
import { CitySearch } from '../../location/CitySearch';
import { useLocationStore } from '../../location/locationStore';
import { AsyncState } from '../../../components/AsyncState';
import { useWeather } from '../useWeather';
import { WeatherContent } from './WeatherContent';

interface WeatherPanelProps {
  date: string;
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

export function WeatherPanel({ date }: WeatherPanelProps) {
  const city = useLocationStore((state) => state.selectedCity);
  const query = useWeather(city.latitude, city.longitude, date);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Weather
        </Typography>
        <Box sx={{ mb: 2 }}>
          <CitySearch />
        </Box>
        <AsyncState query={query} loading={loading} isEmpty={hasNoReading}>
          {(weather) => <WeatherContent city={city} weather={weather} />}
        </AsyncState>
      </CardContent>
    </Card>
  );
}
