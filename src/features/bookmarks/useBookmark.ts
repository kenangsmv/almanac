import type { BookmarkInput } from '../../store/bookmarksStore';
import { useBookmarksStore } from '../../store/bookmarksStore';

export function useBookmark(bookmark: BookmarkInput) {
  const saved = useBookmarksStore((state) =>
    state.bookmarks.some((b) => b.id === bookmark.id),
  );
  const addBookmark = useBookmarksStore((state) => state.addBookmark);
  const removeBookmark = useBookmarksStore((state) => state.removeBookmark);

  const toggle = () => {
    if (saved) removeBookmark(bookmark.id);
    else addBookmark(bookmark);
  };

  return { saved, toggle };
}
