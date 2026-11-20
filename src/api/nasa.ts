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

function toApod(response: ApodResponse): Apod {
  return {
    date: response.date,
    title: response.title,
    explanation: stripHtml(response.explanation),
    mediaType: response.media_type,
    imageUrl: response.hdurl,
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
