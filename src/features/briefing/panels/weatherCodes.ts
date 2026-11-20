export type WeatherCategory = 'sun' | 'cloud' | 'fog' | 'rain' | 'snow' | 'storm';

interface WeatherInfo {
  label: string;
  category: WeatherCategory;
}

const WEATHER: Record<number, WeatherInfo> = {
  0: { label: 'Clear sky', category: 'sun' },
  1: { label: 'Mainly clear', category: 'sun' },
  2: { label: 'Partly cloudy', category: 'cloud' },
  3: { label: 'Overcast', category: 'cloud' },
  45: { label: 'Fog', category: 'fog' },
  48: { label: 'Rime fog', category: 'fog' },
  51: { label: 'Light drizzle', category: 'rain' },
  53: { label: 'Drizzle', category: 'rain' },
  55: { label: 'Dense drizzle', category: 'rain' },
  56: { label: 'Light freezing drizzle', category: 'rain' },
  57: { label: 'Freezing drizzle', category: 'rain' },
  61: { label: 'Light rain', category: 'rain' },
  63: { label: 'Rain', category: 'rain' },
  65: { label: 'Heavy rain', category: 'rain' },
  66: { label: 'Light freezing rain', category: 'rain' },
  67: { label: 'Freezing rain', category: 'rain' },
  71: { label: 'Light snow', category: 'snow' },
  73: { label: 'Snow', category: 'snow' },
  75: { label: 'Heavy snow', category: 'snow' },
  77: { label: 'Snow grains', category: 'snow' },
  80: { label: 'Light rain showers', category: 'rain' },
  81: { label: 'Rain showers', category: 'rain' },
  82: { label: 'Violent rain showers', category: 'rain' },
  85: { label: 'Light snow showers', category: 'snow' },
  86: { label: 'Snow showers', category: 'snow' },
  95: { label: 'Thunderstorm', category: 'storm' },
  96: { label: 'Thunderstorm with hail', category: 'storm' },
  99: { label: 'Severe thunderstorm with hail', category: 'storm' },
};

const GRADIENTS: Record<WeatherCategory, string> = {
  sun: 'radial-gradient(circle at 75% 20%, rgba(255,214,140,.9), rgba(255,160,90,.35) 28%, transparent 55%), linear-gradient(180deg, #2f6fb8, #7fb2e0 60%, #d9b98a)',
  cloud:
    'repeating-radial-gradient(ellipse at 30% 20%, rgba(255,255,255,.10) 0 40px, transparent 40px 90px), linear-gradient(180deg, #4a5a70, #8794a6 70%, #aab4c1)',
  fog: 'linear-gradient(180deg, #6e7a86, #a9b2b9 60%, #c4cacf)',
  rain: 'repeating-linear-gradient(105deg, rgba(200,220,255,.18) 0 1px, transparent 1px 14px), linear-gradient(180deg, #1d2a3d, #3b4d66 70%, #51657f)',
  snow: 'radial-gradient(circle, rgba(255,255,255,.55) 1.5px, transparent 2px) 0 0/34px 34px, radial-gradient(circle, rgba(255,255,255,.35) 1px, transparent 1.5px) 12px 18px/22px 22px, linear-gradient(180deg, #5d7088, #a9b9ca 80%, #d7e0ea)',
  storm:
    'repeating-linear-gradient(105deg, rgba(190,200,255,.15) 0 1px, transparent 1px 12px), radial-gradient(circle at 60% 25%, rgba(167,139,250,.55), transparent 35%), linear-gradient(180deg, #0e1220, #2a2f4a 70%, #3a3f5c)',
};

export function describeWeatherCode(code: number | null): string {
  if (code == null) return 'Unknown';
  return WEATHER[code]?.label ?? 'Unknown';
}

export function weatherGradient(code: number | null): string {
  const category = code != null ? WEATHER[code]?.category : undefined;
  return GRADIENTS[category ?? 'cloud'];
}
