import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/** A single saved discovery (history event, image, person, etc.). */
export interface Bookmark {
  /** Stable, source-derived id used for de-duplication. */
  id: string;
  /** Discriminator for how the bookmark should be rendered later. */
  kind: 'event' | 'image' | 'person' | 'weather';
  title: string;
  /** The briefing date this discovery belongs to (YYYY-MM-DD). */
  date: string;
  savedAt: number;
}

interface BookmarksState {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  clear: () => void;
}

/**
 * Global bookmarks store, persisted to localStorage so saved discoveries
 * survive across sessions (assignment requirement). The feature UI will be
 * wired to these actions in a later increment.
 */
export const useBookmarksStore = create<BookmarksState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      addBookmark: (bookmark) =>
        set((state) =>
          state.bookmarks.some((b) => b.id === bookmark.id)
            ? state
            : { bookmarks: [...state.bookmarks, bookmark] },
        ),
      removeBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== id),
        })),
      isBookmarked: (id) => get().bookmarks.some((b) => b.id === id),
      clear: () => set({ bookmarks: [] }),
    }),
    { name: 'almanac-bookmarks' },
  ),
);
