export type ErrorKind = 'network' | 'not-found' | 'http';

export class AlmanacError extends Error {
  readonly source: string;
  readonly kind: ErrorKind;
  readonly status?: number;

  constructor(
    source: string,
    kind: ErrorKind,
    message: string,
    status?: number,
  ) {
    super(message);
    this.name = 'AlmanacError';
    this.source = source;
    this.kind = kind;
    this.status = status;
  }
}

export async function fetchJson<T>(
  url: string,
  source: string,
  signal?: AbortSignal,
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, { signal });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') throw error;
    throw new AlmanacError(source, 'network', `${source} is unreachable`);
  }

  if (!response.ok) {
    const kind: ErrorKind = response.status === 404 ? 'not-found' : 'http';
    throw new AlmanacError(
      source,
      kind,
      `${source} request failed (${response.status})`,
      response.status,
    );
  }

  return (await response.json()) as T;
}
