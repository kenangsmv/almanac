import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { server } from '../test/server';
import { fetchApod } from './nasa';

const APOD_URL = 'https://science.nasa.gov/wp-json/wp/v2/apod-basic/240704';

describe('fetchApod', () => {
  it('maps the snake_case response onto the Apod shape', async () => {
    server.use(
      http.get(APOD_URL, () =>
        HttpResponse.json({
          date: '2024-07-04',
          title: 'A Galaxy',
          explanation: '<p>A <b>distant</b> galaxy.</p>',
          media_type: 'image',
          hdurl: 'https://img.test/galaxy.jpg',
          permalink: 'https://apod.test/240704',
          copyright: 'A. Stronomer',
        }),
      ),
    );

    await expect(fetchApod('2024-07-04')).resolves.toEqual({
      date: '2024-07-04',
      title: 'A Galaxy',
      explanation: 'A distant galaxy.',
      mediaType: 'image',
      imageUrl: 'https://img.test/galaxy.jpg',
      alt: undefined,
      credit: undefined,
      copyright: 'A. Stronomer',
      sourceUrl: 'https://apod.test/240704',
    });
  });
});
