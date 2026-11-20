import type { Bookmark, BookmarkKind } from '../../store/bookmarksStore';

export interface BookmarkGroup {
  kind: BookmarkKind;
  name: string;
  items: Bookmark[];
}

const GROUPS: { kind: BookmarkKind; name: string }[] = [
  { kind: 'date', name: 'Saved dates' },
  { kind: 'sky', name: 'The Sky' },
  { kind: 'weather', name: 'The Weather' },
  { kind: 'history', name: 'History' },
];

export function groupByType(bookmarks: Bookmark[]): BookmarkGroup[] {
  return GROUPS.map(({ kind, name }) => ({
    kind,
    name,
    items: bookmarks
      .filter((bookmark) => bookmark.kind === kind)
      .sort((a, b) => b.savedAt - a.savedAt),
  })).filter((group) => group.items.length > 0);
}
