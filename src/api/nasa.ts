import { stripHtml } from '../lib/html';
import { fetchJson } from './http';

export interface Apod {
  date: string;
  title: string;
  explanation: string;
  mediaType: 'image' | 'video';
  imageUrl?: string;
  alt?: string;
  credit?: string;
  copyright?: string;
  sourceUrl: string;
}

interface ApodResponse {
  date: string;
  title: string;
  explanation: string;
  media_type: 'image' | 'video';
  hdurl?: string;
  alt?: string;
  credit?: string;
  copyright?: string;
  permalink: string;
}

const BASE = 'https://science.nasa.gov/wp-json/wp/v2/apod-basic';

function toApodId(date: string): string {
  return date.replace(/-/g, '').slice(2);
}

// NASA's hdurl is a dynamic-resize endpoint (…?w=&h=&fit=clip) that defaults to
// the full-resolution image (often multiple MB). Request a display-sized version
// instead, preserving the aspect ratio, so first loads aren't gigantic downloads.
const DISPLAY_WIDTH = 1200;

function toDisplayImage(url: string | undefined): string | undefined {
  if (!url) return url;
  try {
    const parsed = new URL(url);
    const w = Number(parsed.searchParams.get('w'));
    const h = Number(parsed.searchParams.get('h'));
    if (!w || !h || w <= DISPLAY_WIDTH) return url;
    parsed.searchParams.set('w', String(DISPLAY_WIDTH));
    parsed.searchParams.set('h', String(Math.round((DISPLAY_WIDTH * h) / w)));
    return parsed.toString();
  } catch {
    return url;
  }
}

function toApod(response: ApodResponse): Apod {
  return {
    date: response.date,
    title: response.title,
    explanation: stripHtml(response.explanation),
    mediaType: response.media_type,
    imageUrl: toDisplayImage(response.hdurl),
    alt: response.alt,
    credit: response.credit,
    copyright: response.copyright,
    sourceUrl: response.permalink,
  };
}

export function fetchApod(date: string, signal?: AbortSignal): Promise<Apod> {
  return fetchJson<ApodResponse>(
    `${BASE}/${toApodId(date)}`,
    'NASA APOD',
    signal,
  ).then(toApod);
}
