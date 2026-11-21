import { Box, Typography } from '@mui/material';
import type { Weather } from '../../api/openMeteo';
import { Eyebrow } from '../../components/Eyebrow';
import { BookmarkButton } from '../bookmarks/BookmarkButton';
import { describeWeatherCode } from '../briefing/panels/weatherCodes';
import { useLocationStore } from '../location/locationStore';

interface WeatherContentProps {
  weather: Weather;
}

function formatTemp(value: number | null): string {
  return value != null ? `${Math.round(value)}°C` : '—';
}

export function WeatherContent({ weather }: WeatherContentProps) {
  const selectedCity = useLocationStore((state) => state.selectedCity);

  const condition = describeWeatherCode(weather.weatherCode);
  const bigTemp = weather.tempMax != null ? `${Math.round(weather.tempMax)}°` : '—';
  const bookmark = {
    id: `weather:${weather.date}:${selectedCity.id}`,
    kind: 'weather' as const,
    title: `${bigTemp}C · ${condition}`,
    subtitle: selectedCity.name,
    city: selectedCity,
    date: weather.date,
  };
  const stats = [
    { label: 'Humidity', value: weather.humidity ?? '—', unit: '%' },
    { label: 'Wind (max)', value: weather.wind ?? '—', unit: 'km/h' },
    { label: 'Precipitation', value: weather.precipitation ?? '—', unit: 'mm' },
    { label: 'Snowfall', value: weather.snowfall ?? '—', unit: 'cm' },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography
            variant="h2"
            sx={{ fontSize: 'clamp(4rem, 14vw, 10rem)', lineHeight: 0.85 }}
          >
            {bigTemp}
          </Typography>
          <Typography variant="h4" sx={{ mt: 1 }}>
            {condition}
          </Typography>
        </Box>
        <BookmarkButton bookmark={bookmark} />
      </Box>

      <Box sx={{ mt: 3, maxWidth: 420 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, fontSize: 13 }}>
          <span>Low {formatTemp(weather.tempMin)}</span>
          <span>High {formatTemp(weather.tempMax)}</span>
        </Box>
        <Box
          sx={{
            height: 4,
            borderRadius: 2,
            background:
              'linear-gradient(90deg, var(--accent), var(--accent-2), var(--text))',
          }}
        />
      </Box>

      <Box
        sx={{
          mt: 4,
          pt: 2,
          borderTop: 2,
          borderColor: 'divider',
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
          gap: 2,
        }}
      >
        {stats.map((stat) => (
          <Box key={stat.label}>
            <Eyebrow>{stat.label}</Eyebrow>
            <Typography variant="h4" sx={{ mt: 0.5 }}>
              {stat.value}
              <Typography component="span" color="text.secondary" sx={{ fontSize: 16, ml: 0.5 }}>
                {stat.unit}
              </Typography>
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
