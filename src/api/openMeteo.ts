import { addDays, todayISO } from '../lib/date';
import { fetchJson } from './http';

export interface City {
  id: number;
  name: string;
  country?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

export interface Weather {
  date: string;
  tempMax: number | null;
  tempMin: number | null;
  precipitation: number | null;
  snowfall: number | null;
  wind: number | null;
  humidity: number | null;
  weatherCode: number | null;
  source: 'archive' | 'forecast';
}

interface OpenMeteoResponse {
  daily?: {
    temperature_2m_max: (number | null)[];
    temperature_2m_min: (number | null)[];
    precipitation_sum: (number | null)[];
    snowfall_sum: (number | null)[];
    wind_speed_10m_max: (number | null)[];
    weather_code: (number | null)[];
  };
  hourly?: {
    relative_humidity_2m: (number | null)[];
  };
}

export const PRESET_CITIES: City[] = [
  {
    id: 5128581,
    name: 'New York',
    country: 'United States',
    latitude: 40.71,
    longitude: -74.01,
  },
  {
    id: 2643743,
    name: 'London',
    country: 'United Kingdom',
    latitude: 51.51,
    longitude: -0.13,
  },
  {
    id: 1850147,
    name: 'Tokyo',
    country: 'Japan',
    latitude: 35.68,
    longitude: 139.69,
  },
  {
    id: 2147714,
    name: 'Sydney',
    country: 'Australia',
    latitude: -33.87,
    longitude: 151.21,
  },
  {
    id: 1275339,
    name: 'Mumbai',
    country: 'India',
    latitude: 19.08,
    longitude: 72.88,
  },
  {
    id: 3448439,
    name: 'São Paulo',
    country: 'Brazil',
    latitude: -23.55,
    longitude: -46.63,
  },
  {
    id: 360630,
    name: 'Cairo',
    country: 'Egypt',
    latitude: 30.04,
    longitude: 31.24,
  },
  {
    id: 3413829,
    name: 'Reykjavik',
    country: 'Iceland',
    latitude: 64.15,
    longitude: -21.94,
  },
];

const DAILY_PARAMS =
  'temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum,wind_speed_10m_max,weather_code';

const ARCHIVE_LAG_DAYS = 5;

function shouldUseArchive(date: string): boolean {
  return date <= addDays(todayISO(), -ARCHIVE_LAG_DAYS);
}

function roundOrNull(value: number | null | undefined): number | null {
  return value != null ? Math.round(value) : null;
}

function average(values: (number | null)[] | undefined): number | null {
  const nums = (values ?? []).filter((v): v is number => v != null);
  if (nums.length === 0) return null;
  return Math.round(nums.reduce((sum, v) => sum + v, 0) / nums.length);
}

function toWeather(
  response: OpenMeteoResponse,
  date: string,
  source: Weather['source'],
): Weather {
  const daily = response.daily;
  return {
    date,
    source,
    tempMax: daily?.temperature_2m_max[0] ?? null,
    tempMin: daily?.temperature_2m_min[0] ?? null,
    precipitation: daily?.precipitation_sum[0] ?? null,
    snowfall: daily?.snowfall_sum[0] ?? null,
    wind: roundOrNull(daily?.wind_speed_10m_max[0]),
    humidity: average(response.hourly?.relative_humidity_2m),
    weatherCode: daily?.weather_code[0] ?? null,
  };
}

interface GeocodingResponse {
  results?: City[];
}

export function searchCities(
  query: string,
  signal?: AbortSignal,
): Promise<City[]> {
  const params = new URLSearchParams({
    name: query,
    count: '8',
    language: 'en',
    format: 'json',
  });
  return fetchJson<GeocodingResponse>(
    `https://geocoding-api.open-meteo.com/v1/search?${params}`,
    'Open-Meteo',
    signal,
  ).then((response) => response.results ?? []);
}

export function fetchWeather(
  latitude: number,
  longitude: number,
  date: string,
  signal?: AbortSignal,
): Promise<Weather> {
  const archive = shouldUseArchive(date);
  const base = archive
    ? 'https://archive-api.open-meteo.com/v1/archive'
    : 'https://api.open-meteo.com/v1/forecast';

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    start_date: date,
    end_date: date,
    daily: DAILY_PARAMS,
    hourly: 'relative_humidity_2m',
    timezone: 'auto',
  });

  return fetchJson<OpenMeteoResponse>(
    `${base}?${params}`,
    'Open-Meteo',
    signal,
  ).then((response) =>
    toWeather(response, date, archive ? 'archive' : 'forecast'),
  );
}
