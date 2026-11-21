import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  addDays,
  formatHuman,
  getMonthDay,
  isValidISODate,
  toISODate,
  todayISO,
} from './date';

describe('toISODate', () => {
  it('formats a date as YYYY-MM-DD', () => {
    expect(toISODate(new Date(2024, 6, 4))).toBe('2024-07-04');
  });

  it('zero-pads single-digit months and days', () => {
    expect(toISODate(new Date(2024, 2, 5))).toBe('2024-03-05');
  });
});

describe('addDays', () => {
  it('adds and subtracts a single day', () => {
    expect(addDays('2024-07-04', 1)).toBe('2024-07-05');
    expect(addDays('2024-07-04', -1)).toBe('2024-07-03');
  });

  it('rolls over to the next month', () => {
    expect(addDays('2024-01-31', 1)).toBe('2024-02-01');
  });

  it('rolls over to the next year', () => {
    expect(addDays('2024-12-31', 1)).toBe('2025-01-01');
  });

  it('lands on Feb 29 in a leap year', () => {
    expect(addDays('2024-02-28', 1)).toBe('2024-02-29');
  });

  it('skips Feb 29 in a non-leap year', () => {
    expect(addDays('2023-02-28', 1)).toBe('2023-03-01');
  });

  it('rolls backwards across a month into a leap day', () => {
    expect(addDays('2024-03-01', -1)).toBe('2024-02-29');
  });
});

describe('isValidISODate', () => {
  it('accepts a valid date', () => {
    expect(isValidISODate('2024-07-04')).toBe(true);
  });

  it('rejects malformed strings', () => {
    expect(isValidISODate('2024-1-1')).toBe(false);
    expect(isValidISODate('2024/01/01')).toBe(false);
    expect(isValidISODate('abc')).toBe(false);
    expect(isValidISODate('')).toBe(false);
  });

  it('rejects well-formed but impossible dates', () => {
    expect(isValidISODate('2024-13-01')).toBe(false);
    expect(isValidISODate('2024-02-30')).toBe(false);
    expect(isValidISODate('2023-02-29')).toBe(false);
  });
});

describe('getMonthDay', () => {
  it('extracts the month and day as numbers', () => {
    expect(getMonthDay('2024-07-04')).toEqual({ month: 7, day: 4 });
  });
});

describe('formatHuman', () => {
  it('renders a human-readable en-US date', () => {
    expect(formatHuman('2024-07-04')).toBe('Thursday, July 4, 2024');
  });
});

describe('todayISO', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 6, 4, 12, 0, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns today's date in ISO form", () => {
    expect(todayISO()).toBe('2024-07-04');
  });
});
