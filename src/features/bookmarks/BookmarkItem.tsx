import type { Bookmark } from '../../store/bookmarksStore';
import { useBookmarksStore } from '../../store/bookmarksStore';
import styles from './BookmarksView.module.css';

interface BookmarkItemProps {
  bookmark: Bookmark;
  onSelect: (title: string) => void;
}

function wikiTitleFromUrl(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/\/wiki\/(.+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}

export function BookmarkItem({ bookmark, onSelect }: BookmarkItemProps) {
  const removeBookmark = useBookmarksStore((state) => state.removeBookmark);
  const wikiTitle = wikiTitleFromUrl(bookmark.url);

  return (
    <li className={styles.item}>
      {bookmark.imageUrl && (
        <img className={styles.thumb} src={bookmark.imageUrl} alt="" />
      )}
      <div className={styles.body}>
        <span className={styles.kind}>{bookmark.kind}</span>
        <p className={styles.title}>
          {wikiTitle ? (
            <button
              type="button"
              className={styles.titleButton}
              onClick={() => onSelect(wikiTitle)}
            >
              {bookmark.title}
            </button>
          ) : bookmark.url ? (
            <a
              className={styles.titleLink}
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {bookmark.title}
            </a>
          ) : (
            bookmark.title
          )}
        </p>
        {bookmark.subtitle && <p className={styles.subtitle}>{bookmark.subtitle}</p>}
      </div>
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
