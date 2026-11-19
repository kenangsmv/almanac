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

export interface OnThisDay {
  selected: OnThisDayItem[];
  events: OnThisDayItem[];
  births: OnThisDayItem[];
  deaths: OnThisDayItem[];
  holidays: OnThisDayItem[];
}

const REST_BASE = 'https://en.wikipedia.org/api/rest_v1';

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

export function fetchOnThisDay(
  month: number,
  day: number,
  signal?: AbortSignal,
): Promise<OnThisDay> {
  const url = `${REST_BASE}/feed/onthisday/all/${pad(month)}/${pad(day)}`;
  return fetchJson<OnThisDay>(url, 'Wikipedia On This Day', signal);
}

export function fetchPageSummary(title: string, signal?: AbortSignal): Promise<WikiPage> {
  const url = `${REST_BASE}/page/summary/${encodeURIComponent(title)}`;
  return fetchJson<WikiPage>(url, 'Wikipedia', signal);
}
