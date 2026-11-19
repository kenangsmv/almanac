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
  weatherCode: number | null;
  source: 'archive' | 'forecast';
}

interface OpenMeteoResponse {
  daily?: {
    temperature_2m_max: (number | null)[];
    temperature_2m_min: (number | null)[];
    precipitation_sum: (number | null)[];
    weather_code: (number | null)[];
  };
}

interface GeocodingResponse {
  results?: City[];
}

const DAILY_PARAMS =
  'temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code';

// Open-Meteo's archive dataset lags a few days behind; recent dates must use
// the forecast endpoint, which also serves the last days and the near future.
const ARCHIVE_LAG_DAYS = 5;

function toLocalISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function shouldUseArchive(date: string): boolean {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - ARCHIVE_LAG_DAYS);
  return date <= toLocalISODate(cutoff);
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
    weatherCode: daily?.weather_code[0] ?? null,
  };
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
    timezone: 'auto',
  });

  return fetchJson<OpenMeteoResponse>(`${base}?${params}`, 'Open-Meteo', signal).then(
    (response) => toWeather(response, date, archive ? 'archive' : 'forecast'),
  );
}

export function searchCities(query: string, signal?: AbortSignal): Promise<City[]> {
  const params = new URLSearchParams({
    name: query,
    count: '5',
    language: 'en',
    format: 'json',
  });

  return fetchJson<GeocodingResponse>(
    `https://geocoding-api.open-meteo.com/v1/search?${params}`,
    'Open-Meteo geocoding',
    signal,
  ).then((response) => response.results ?? []);
}
