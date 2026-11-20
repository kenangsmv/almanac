import { Link as RouterLink } from 'react-router-dom';
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
  const to = { pathname: KIND_PATH[bookmark.kind], search: `?date=${bookmark.date}` };

  return (
    <li className={styles.card}>
      {bookmark.imageUrl && (
        <img className={styles.cardImage} src={bookmark.imageUrl} alt="" />
      )}
      <RouterLink className={styles.cardBody} to={to}>
        <span className={styles.date}>{formatHuman(bookmark.date)}</span>
        <p className={styles.title}>{bookmark.title}</p>
        {bookmark.subtitle && <p className={styles.subtitle}>{bookmark.subtitle}</p>}
      </RouterLink>
      <button
        type="button"
        className={styles.remove}
        onClick={() => removeBookmark(bookmark.id)}
        aria-label={`Remove ${bookmark.title}`}
      >
        ✕
      </button>
    </li>
  );
}
