import { describe, expect, it } from 'vitest';
import { describeWeatherCode, weatherGradient } from './weatherCodes';

describe('describeWeatherCode', () => {
  it('returns the label for a known code', () => {
    expect(describeWeatherCode(0)).toBe('Clear sky');
    expect(describeWeatherCode(75)).toBe('Heavy snow');
  });

  it('returns "Unknown" for null', () => {
    expect(describeWeatherCode(null)).toBe('Unknown');
  });

  it('returns "Unknown" for an unrecognised code', () => {
    expect(describeWeatherCode(7)).toBe('Unknown');
  });
});

describe('weatherGradient', () => {
  it('maps codes of the same category to the same gradient', () => {
    expect(weatherGradient(0)).toBe(weatherGradient(1));
  });

  it('maps codes of different categories to different gradients', () => {
    expect(weatherGradient(0)).not.toBe(weatherGradient(2));
  });

  it('falls back to the cloud gradient for null', () => {
    expect(weatherGradient(null)).toBe(weatherGradient(2));
  });

  it('falls back to the cloud gradient for an unrecognised code', () => {
    expect(weatherGradient(7)).toBe(weatherGradient(null));
  });
});
