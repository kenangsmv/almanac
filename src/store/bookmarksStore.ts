import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BookmarkKind = 'date' | 'sky' | 'weather' | 'history';

export interface Bookmark {
  id: string;
  kind: BookmarkKind;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  url?: string;
  date: string;
  savedAt: number;
}

export type BookmarkInput = Omit<Bookmark, 'savedAt'>;

interface BookmarksState {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: BookmarkInput) => void;
  removeBookmark: (id: string) => void;
  clear: () => void;
}

export const useBookmarksStore = create<BookmarksState>()(
  persist(
    (set) => ({
      bookmarks: [],
      addBookmark: (bookmark) =>
        set((state) =>
          state.bookmarks.some((b) => b.id === bookmark.id)
            ? state
            : {
                bookmarks: [...state.bookmarks, { ...bookmark, savedAt: Date.now() }],
              },
        ),
      removeBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== id),
        })),
      clear: () => set({ bookmarks: [] }),
    }),
    {
      name: 'almanac-bookmarks',
      version: 3,
      partialize: (state) => ({ bookmarks: state.bookmarks }),
      migrate: (persisted, version) => {
        let bookmarks = (persisted as { bookmarks?: Bookmark[] } | undefined)?.bookmarks ?? [];
        if (version < 2) bookmarks = [];
        if (version < 3) bookmarks = bookmarks.filter((b) => b.kind !== 'history' || b.url != null);
        return { bookmarks };
      },
    },
  ),
);
