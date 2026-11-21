import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import {
  useBookmarksStore,
  type BookmarkInput,
} from '../../store/bookmarksStore';
import { useBookmark } from './useBookmark';

const input: BookmarkInput = {
  id: 'a',
  kind: 'history',
  title: 'a',
  date: '2024-07-04',
};

beforeEach(() => {
  useBookmarksStore.setState({ bookmarks: [] });
});

describe('useBookmark', () => {
  it('reports not saved when the bookmark is absent', () => {
    const { result } = renderHook(() => useBookmark(input));
    expect(result.current.saved).toBe(false);
  });

  it('reports saved when the bookmark is already stored', () => {
    useBookmarksStore.getState().addBookmark(input);
    const { result } = renderHook(() => useBookmark(input));
    expect(result.current.saved).toBe(true);
  });

  it('toggles a bookmark on', () => {
    const { result } = renderHook(() => useBookmark(input));
    act(() => result.current.toggle());
    expect(result.current.saved).toBe(true);
    expect(useBookmarksStore.getState().bookmarks).toHaveLength(1);
  });

  it('toggles a bookmark off', () => {
    useBookmarksStore.getState().addBookmark(input);
    const { result } = renderHook(() => useBookmark(input));
    act(() => result.current.toggle());
    expect(result.current.saved).toBe(false);
    expect(useBookmarksStore.getState().bookmarks).toEqual([]);
  });
});
