import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { todayISO } from '../../lib/date';
import { useSelectedDate } from './useSelectedDate';

function wrapper(entries: string[]) {
  return ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={entries}>{children}</MemoryRouter>
  );
}

function render(entries: string[]) {
  return renderHook(() => useSelectedDate(), { wrapper: wrapper(entries) });
}

describe('useSelectedDate', () => {
  it('reads a valid date from the URL', () => {
    const { result } = render(['/?date=2024-07-04']);
    expect(result.current.selectedDate).toBe('2024-07-04');
  });

  it('falls back to today when the param is missing', () => {
    const { result } = render(['/']);
    expect(result.current.selectedDate).toBe(todayISO());
  });

  it('falls back to today when the param is invalid', () => {
    const { result } = render(['/?date=2024-13-99']);
    expect(result.current.selectedDate).toBe(todayISO());
  });

  it('updates the selected date via setDate', () => {
    const { result } = render(['/?date=2024-07-04']);
    act(() => result.current.setDate('2024-01-01'));
    expect(result.current.selectedDate).toBe('2024-01-01');
  });

  it('steps one day forward with goToNext', () => {
    const { result } = render(['/?date=2024-07-04']);
    act(() => result.current.goToNext());
    expect(result.current.selectedDate).toBe('2024-07-05');
  });

  it('steps one day backward with goToPrevious', () => {
    const { result } = render(['/?date=2024-07-04']);
    act(() => result.current.goToPrevious());
    expect(result.current.selectedDate).toBe('2024-07-03');
  });

  it('jumps to today with goToToday', () => {
    const { result } = render(['/?date=2024-07-04']);
    act(() => result.current.goToToday());
    expect(result.current.selectedDate).toBe(todayISO());
  });
});
