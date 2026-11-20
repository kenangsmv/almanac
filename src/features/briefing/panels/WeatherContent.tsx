import { Box, Chip, Typography } from '@mui/material';
import type { City, Weather } from '../../../api/openMeteo';
import { describeWeatherCode } from './weatherCodes';

interface WeatherContentProps {
  city: City;
  weather: Weather;
}

function formatTemp(value: number | null): string {
  return value != null ? `${Math.round(value)}°C` : '—';
}

export function WeatherContent({ city, weather }: WeatherContentProps) {
  const location = city.country ? `${city.name}, ${city.country}` : city.name;
  const condition = describeWeatherCode(weather.weatherCode);
  const sourceLabel = weather.source === 'archive' ? 'Historical' : 'Forecast';
  const high = formatTemp(weather.tempMax);
  const low = formatTemp(weather.tempMin);
  const precipitation =
    weather.precipitation != null ? `${weather.precipitation} mm` : '—';

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Typography variant="subtitle1">{location}</Typography>
        <Chip label={sourceLabel} size="small" />
      </Box>
      <Typography variant="body1">{condition}</Typography>
      <Typography variant="h5" sx={{ mt: 1 }}>
        {high}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Low {low} · Precipitation {precipitation}
      </Typography>
    </Box>
  );
}
