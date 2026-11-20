import type { OnThisDayItem } from '../../api/wikipedia';
import { useApod } from '../briefing/useApod';
import { useOnThisDay } from '../briefing/useOnThisDay';
import { useWeather } from '../briefing/useWeather';
import { describeWeatherCode, weatherGradient } from '../briefing/panels/weatherCodes';
import { useLocationStore } from '../location/locationStore';
import type { TeaserCardProps } from './TeaserCard';

const FALLBACK = {
  sky: 'radial-gradient(circle at 30% 30%, #2a2150, #101827 70%)',
  weather: 'linear-gradient(180deg, #101827, #1d2a3d)',
  history: 'linear-gradient(160deg, #241c3d, #101827)',
};

function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

function featuredEvent(items: OnThisDayItem[], year: number): OnThisDayItem | null {
  let best: OnThisDayItem | null = null;
  for (const item of items) {
    if (!item.pages[0]?.thumbnail || item.year == null) continue;
    if (!best || Math.abs(item.year - year) < Math.abs((best.year ?? 0) - year)) {
      best = item;
    }
  }
  return best;
}

export function useHomeTeasers(date: string): TeaserCardProps[] {
  const city = useLocationStore((state) => state.selectedCity);
  const apod = useApod(date);
  const weather = useWeather(city.latitude, city.longitude, date);
  const history = useOnThisDay(date);

  const year = Number(date.slice(0, 4));
  const search = `?date=${date}`;

  const sky = apod.data;
  const skyHeadline = apod.isPending
    ? 'Scanning the archive…'
    : sky
      ? sky.title
      : 'Sky unavailable for this date';
  const skyBg = sky?.imageUrl ? `url("${sky.imageUrl}")` : FALLBACK.sky;

  const wx = weather.data;
  const wxTemp = wx?.tempMax != null ? Math.round(wx.tempMax) : '—';
  const wxHeadline = weather.isPending
    ? 'Reading the barometer…'
    : wx
      ? `${wxTemp}° · ${describeWeatherCode(wx.weatherCode)}`
      : 'No record for this date';
  const wxBg = wx ? weatherGradient(wx.weatherCode) : FALLBACK.weather;

  const events = history.data?.events ?? [];
  const feat = featuredEvent(events, year);
  const histHeadline = history.isPending
    ? 'Opening the archive…'
    : history.data
      ? feat
        ? truncate(feat.text, 120)
        : 'Events recorded'
      : 'Events unavailable';
  const histBg = feat?.pages[0]?.thumbnail
    ? `url("${feat.pages[0].thumbnail.source}")`
    : FALLBACK.history;

  return [
    {
      to: `/sky${search}`,
      index: '01',
      pill: 'NASA',
      eyebrow: 'The sky above',
      headline: skyHeadline,
      description: 'Discover the universe as captured on this day.',
      background: skyBg,
    },
    {
      to: `/weather${search}`,
      index: '02',
      pill: city.name,
      eyebrow: 'The weather then',
      headline: wxHeadline,
      description: 'What did the world feel like on this day?',
      background: wxBg,
    },
    {
      to: `/history${search}`,
      index: '03',
      pill: 'Historical record',
      eyebrow: 'History in motion',
      headline: histHeadline,
      description: history.data
        ? `${events.length} events on this day.`
        : 'Discover the moments that changed history.',
      background: histBg,
    },
  ];
}
