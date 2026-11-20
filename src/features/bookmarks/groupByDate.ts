import type { Bookmark } from '../../store/bookmarksStore';

export interface BookmarkGroup {
  date: string;
  items: Bookmark[];
}

export function groupByDate(bookmarks: Bookmark[]): BookmarkGroup[] {
  const byDate = new Map<string, Bookmark[]>();
  for (const bookmark of bookmarks) {
    const group = byDate.get(bookmark.date);
    if (group) group.push(bookmark);
    else byDate.set(bookmark.date, [bookmark]);
  }

  return [...byDate.entries()]
    .map(([date, items]) => ({
      date,
      items: [...items].sort((a, b) => b.savedAt - a.savedAt),
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}
