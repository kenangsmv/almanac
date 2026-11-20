import { IconButton } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import type { BookmarkInput } from '../../store/bookmarksStore';
import { useBookmarksStore } from '../../store/bookmarksStore';

interface BookmarkButtonProps {
  bookmark: BookmarkInput;
}

export function BookmarkButton({ bookmark }: BookmarkButtonProps) {
  const saved = useBookmarksStore((state) =>
    state.bookmarks.some((b) => b.id === bookmark.id),
  );
  const addBookmark = useBookmarksStore((state) => state.addBookmark);
  const removeBookmark = useBookmarksStore((state) => state.removeBookmark);

  const toggle = () => {
    if (saved) removeBookmark(bookmark.id);
    else addBookmark(bookmark);
  };

  return (
    <IconButton
      onClick={toggle}
      aria-label={saved ? 'Remove bookmark' : 'Save bookmark'}
      size="small"
    >
      {saved ? (
        <BookmarkIcon fontSize="small" />
      ) : (
        <BookmarkBorderIcon fontSize="small" />
      )}
    </IconButton>
  );
}
