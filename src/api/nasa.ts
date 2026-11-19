import { fetchJson } from './http';

export interface Apod {
  title: string;
  date: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: 'image' | 'video';
  copyright?: string;
}

const API_KEY = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';

export function fetchApod(date: string, signal?: AbortSignal): Promise<Apod> {
  const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`;
  return fetchJson<Apod>(url, 'NASA APOD', signal);
}
