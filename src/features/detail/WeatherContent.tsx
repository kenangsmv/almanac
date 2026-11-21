import type { Weather } from '../../api/openMeteo';
import { Eyebrow } from '../../components/Eyebrow';
import { BookmarkButton } from '../bookmarks/BookmarkButton';
import { describeWeatherCode } from '../briefing/panels/weatherCodes';
import { useLocationStore } from '../location/locationStore';
import styles from './WeatherContent.module.css';

interface WeatherContentProps {
  weather: Weather;
}

function formatTemp(value: number | null): string {
  return value != null ? `${Math.round(value)}°C` : '—';
}

export function WeatherContent({ weather }: WeatherContentProps) {
  const selectedCity = useLocationStore((state) => state.selectedCity);

  const condition = describeWeatherCode(weather.weatherCode);
  const bigTemp =
    weather.tempMax != null ? `${Math.round(weather.tempMax)}°` : '—';
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
    <div>
      <div className={styles.header}>
        <div>
          <p className={styles.bigTemp}>{bigTemp}</p>
          <h2 className={styles.condition}>{condition}</h2>
        </div>
        <BookmarkButton bookmark={bookmark} />
      </div>

      <div className={styles.range}>
        <div className={styles.rangeLabels}>
          <span>Low {formatTemp(weather.tempMin)}</span>
          <span>High {formatTemp(weather.tempMax)}</span>
        </div>
        <div className={styles.rangeBar} />
      </div>

      <div className={styles.stats}>
        {stats.map((stat) => (
          <div key={stat.label}>
            <Eyebrow>{stat.label}</Eyebrow>
            <p className={styles.statValue}>
              {stat.value}
              <span className={styles.statUnit}>{stat.unit}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
