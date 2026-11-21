import { describe, expect, it } from 'vitest';
import { stripHtml } from './html';

describe('stripHtml', () => {
  it('removes tags and keeps the text', () => {
    expect(stripHtml('<p>Hello <b>world</b></p>')).toBe('Hello world');
  });

  it('decodes HTML entities', () => {
    expect(stripHtml('Tom &amp; Jerry')).toBe('Tom & Jerry');
    expect(stripHtml('&lt;code&gt;')).toBe('<code>');
  });

  it('trims surrounding whitespace', () => {
    expect(stripHtml('  <p> hi </p>  ')).toBe('hi');
  });

  it('returns an empty string for empty or tag-only input', () => {
    expect(stripHtml('')).toBe('');
    expect(stripHtml('<br/>')).toBe('');
  });

  it('passes plain text through unchanged', () => {
    expect(stripHtml('plain text')).toBe('plain text');
  });

  it('concatenates adjacent block tags without inserting a space', () => {
    expect(stripHtml('<p>a</p><p>b</p>')).toBe('ab');
  });
});
