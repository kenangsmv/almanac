import { IconButton } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import type { BookmarkInput } from '../../store/bookmarksStore';
import { useBookmark } from './useBookmark';

interface BookmarkButtonProps {
  bookmark: BookmarkInput;
}

export function BookmarkButton({ bookmark }: BookmarkButtonProps) {
  const { saved, toggle } = useBookmark(bookmark);

  return (
    <IconButton
      onClick={toggle}
      aria-label={saved ? 'Remove bookmark' : 'Save bookmark'}
      color={saved ? 'secondary' : 'default'}
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
