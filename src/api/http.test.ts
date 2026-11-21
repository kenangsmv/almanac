import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { server } from '../test/server';
import { AlmanacError, fetchJson } from './http';

const URL = 'https://api.test/resource';

describe('fetchJson', () => {
  it('returns the parsed JSON on a 200 response', async () => {
    server.use(http.get(URL, () => HttpResponse.json({ id: 1 })));
    await expect(fetchJson(URL, 'Test')).resolves.toEqual({ id: 1 });
  });

  it('throws a not-found AlmanacError on 404', async () => {
    server.use(http.get(URL, () => new HttpResponse(null, { status: 404 })));
    const err = await fetchJson(URL, 'Test').catch((e) => e);
    expect(err).toBeInstanceOf(AlmanacError);
    expect(err).toMatchObject({
      kind: 'not-found',
      status: 404,
      source: 'Test',
    });
  });

  it('throws an http AlmanacError on other error statuses', async () => {
    server.use(http.get(URL, () => new HttpResponse(null, { status: 500 })));
    const err = await fetchJson(URL, 'Test').catch((e) => e);
    expect(err).toBeInstanceOf(AlmanacError);
    expect(err).toMatchObject({ kind: 'http', status: 500 });
  });

  it('throws a network AlmanacError when the request fails', async () => {
    server.use(http.get(URL, () => HttpResponse.error()));
    const err = await fetchJson(URL, 'Test').catch((e) => e);
    expect(err).toBeInstanceOf(AlmanacError);
    expect(err).toMatchObject({ kind: 'network' });
  });

  it('re-throws an AbortError without wrapping it', async () => {
    server.use(http.get(URL, () => HttpResponse.json({ id: 1 })));
    const controller = new AbortController();
    controller.abort();
    const err = await fetchJson(URL, 'Test', controller.signal).catch((e) => e);
    expect(err).not.toBeInstanceOf(AlmanacError);
    expect((err as Error).name).toBe('AbortError');
  });
});
