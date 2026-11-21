import { fetchJson } from './http';

export interface WikiPage {
  title: string;
  description?: string;
  extract: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  content_urls: {
    desktop: {
      page: string;
    };
  };
}

export interface OnThisDayItem {
  text: string;
  year?: number;
  pages: WikiPage[];
}

const REST_BASE = 'https://en.wikipedia.org/api/rest_v1';

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

export type OnThisDayType = 'selected' | 'events' | 'births' | 'deaths';

export function fetchOnThisDayCategory(
  type: OnThisDayType,
  month: number,
  day: number,
  signal?: AbortSignal,
): Promise<OnThisDayItem[]> {
  const url = `${REST_BASE}/feed/onthisday/${type}/${pad(month)}/${pad(day)}`;
  return fetchJson<Record<OnThisDayType, OnThisDayItem[]>>(
    url,
    'Wikipedia On This Day',
    signal,
  ).then((data) => data[type]);
}

export function fetchPageSummary(
  title: string,
  signal?: AbortSignal,
): Promise<WikiPage> {
  const url = `${REST_BASE}/page/summary/${encodeURIComponent(title)}`;
  return fetchJson<WikiPage>(url, 'Wikipedia', signal);
}
