import { beforeEach, describe, expect, it } from 'vitest';
import { useBookmarksStore, type BookmarkInput } from './bookmarksStore';

function mk(id: string): BookmarkInput {
  return { id, kind: 'history', title: id, date: '2024-07-04' };
}

const store = () => useBookmarksStore.getState();

beforeEach(() => {
  useBookmarksStore.setState({ bookmarks: [] });
});

describe('bookmarksStore', () => {
  it('adds a bookmark with a savedAt timestamp', () => {
    store().addBookmark(mk('a'));
    const [bookmark] = store().bookmarks;
    expect(bookmark.id).toBe('a');
    expect(typeof bookmark.savedAt).toBe('number');
  });

  it('ignores a duplicate id', () => {
    store().addBookmark(mk('a'));
    store().addBookmark(mk('a'));
    expect(store().bookmarks).toHaveLength(1);
  });

  it('removes a bookmark by id, leaving the others', () => {
    store().addBookmark(mk('a'));
    store().addBookmark(mk('b'));
    store().removeBookmark('a');
    expect(store().bookmarks.map((b) => b.id)).toEqual(['b']);
  });

  it('clears all bookmarks', () => {
    store().addBookmark(mk('a'));
    store().addBookmark(mk('b'));
    store().clear();
    expect(store().bookmarks).toEqual([]);
  });

  it('persists bookmarks to localStorage', () => {
    store().addBookmark(mk('a'));
    const raw = localStorage.getItem('almanac-bookmarks');
    expect(raw).not.toBeNull();
    const persisted = JSON.parse(raw ?? '{}');
    expect(persisted.state.bookmarks.map((b: { id: string }) => b.id)).toEqual([
      'a',
    ]);
  });
});
