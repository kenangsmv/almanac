import type { UseQueryResult } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AlmanacError } from '../api/http';
import { AsyncState } from './AsyncState';

function q<T>(partial: Partial<UseQueryResult<T>>): UseQueryResult<T> {
  return partial as UseQueryResult<T>;
}

function renderState<T>(query: UseQueryResult<T>, props?: Partial<Parameters<typeof AsyncState<T>>[0]>) {
  return render(
    <AsyncState
      query={query}
      loading={<p>Loading…</p>}
      {...props}
    >
      {(data) => <p>Data: {String(data)}</p>}
    </AsyncState>,
  );
}

describe('AsyncState', () => {
  it('renders the loading node while pending', () => {
    renderState(q({ isPending: true, isError: false }));
    expect(screen.getByText('Loading…')).toBeInTheDocument();
  });

  it('renders an alert for a generic error', () => {
    renderState(q({ isPending: false, isError: true, error: new Error('boom') }));
    expect(screen.getByRole('alert')).toHaveTextContent('boom');
  });

  it('renders the empty message for a not-found error', () => {
    const error = new AlmanacError('Test', 'not-found', 'missing', 404);
    renderState(q({ isPending: false, isError: true, error }));
    expect(screen.getByText('No data for this date.')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('renders the empty message when isEmpty returns true', () => {
    renderState(q({ isPending: false, isError: false, data: '' }), {
      isEmpty: (data) => data === '',
      emptyMessage: 'Nothing here.',
    });
    expect(screen.getByText('Nothing here.')).toBeInTheDocument();
  });

  it('renders children with the data on success', () => {
    renderState(q({ isPending: false, isError: false, data: 'hello' }));
    expect(screen.getByText('Data: hello')).toBeInTheDocument();
  });
});
