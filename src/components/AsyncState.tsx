import type { ReactNode } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import { Alert, Typography } from '@mui/material';
import { AlmanacError } from '../api/http';

interface AsyncStateProps<T> {
  query: UseQueryResult<T>;
  loading: ReactNode;
  isEmpty?: (data: T) => boolean;
  emptyMessage?: string;
  children: (data: T) => ReactNode;
}

export function AsyncState<T>({
  query,
  loading,
  isEmpty,
  emptyMessage = 'No data for this date.',
  children,
}: AsyncStateProps<T>) {
  const empty = <Typography color="text.secondary">{emptyMessage}</Typography>;

  if (query.isPending) return <>{loading}</>;

  if (query.isError) {
    const notFound =
      query.error instanceof AlmanacError && query.error.kind === 'not-found';
    return notFound ? empty : <Alert severity="error">{query.error.message}</Alert>;
  }

  if (isEmpty?.(query.data)) return empty;

  return <>{children(query.data)}</>;
}
