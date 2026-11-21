import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import type { Bookmark, BookmarkKind } from '../../store/bookmarksStore';
import { useBookmarksStore } from '../../store/bookmarksStore';
import { formatHuman } from '../../lib/date';
import styles from './BookmarksView.module.css';

const KIND_PATH: Record<BookmarkKind, string> = {
  date: '/sky',
  sky: '/sky',
  weather: '/weather',
  history: '/history',
};

interface BookmarkItemProps {
  bookmark: Bookmark;
}

export function BookmarkItem({ bookmark }: BookmarkItemProps) {
  const removeBookmark = useBookmarksStore((state) => state.removeBookmark);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const params = new URLSearchParams({ date: bookmark.date });
  if (bookmark.city) {
    params.set('lat', String(bookmark.city.latitude));
    params.set('lon', String(bookmark.city.longitude));
    params.set('cityId', String(bookmark.city.id));
    params.set('cityName', bookmark.city.name);
  }
  const to = {
    pathname: KIND_PATH[bookmark.kind],
    search: `?${params.toString()}`,
  };

  const body = (
    <>
      <span className={styles.date}>{formatHuman(bookmark.date)}</span>
      <p className={styles.title}>{bookmark.title}</p>
      {bookmark.subtitle && (
        <p className={styles.subtitle}>{bookmark.subtitle}</p>
      )}
    </>
  );

  return (
    <li className={styles.card}>
      {bookmark.imageUrl && (
        <img className={styles.cardImage} src={bookmark.imageUrl} alt="" />
      )}
      {bookmark.url ? (
        <a
          className={styles.cardBody}
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {body}
        </a>
      ) : (
        <RouterLink className={styles.cardBody} to={to}>
          {body}
        </RouterLink>
      )}
      <button
        type="button"
        className={styles.remove}
        onClick={() => setConfirmOpen(true)}
        aria-label={`Remove ${bookmark.title}`}
      >
        ✕
      </button>
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        slotProps={{ paper: { className: styles.dialogPaper } }}
      >
        <DialogTitle>Remove bookmark?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            “{bookmark.title}” will be removed from your bookmarks. This can’t
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button color="error" onClick={() => removeBookmark(bookmark.id)}>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </li>
  );
}
