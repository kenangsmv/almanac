import type { ReactNode } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import { AlmanacError } from '../api/http';
import styles from './AsyncState.module.css';

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
  const empty = <p className={styles.empty}>{emptyMessage}</p>;

  if (query.isPending) return <>{loading}</>;

  if (query.isError) {
    const notFound =
      query.error instanceof AlmanacError && query.error.kind === 'not-found';
    return notFound ? (
      empty
    ) : (
      <div role="alert" className={styles.error}>
        {query.error.message}
      </div>
    );
  }

  if (isEmpty?.(query.data)) return empty;

  return <>{children(query.data)}</>;
}
