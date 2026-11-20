import { useBookmarksStore } from '../../store/bookmarksStore';
import { formatHuman } from '../../lib/date';
import { BookmarkItem } from './BookmarkItem';
import { groupByDate } from './groupByDate';
import styles from './BookmarksView.module.css';

export function BookmarksView() {
  const bookmarks = useBookmarksStore((state) => state.bookmarks);

  if (bookmarks.length === 0) {
    return (
      <p className={styles.empty}>
        No bookmarks yet. Save discoveries from the briefing to see them here.
      </p>
    );
  }

  const groups = groupByDate(bookmarks);

  return (
    <div className={styles.view}>
      {groups.map((group) => (
        <section key={group.date} className={styles.group}>
          <h2 className={styles.groupHeading}>{formatHuman(group.date)}</h2>
          <ul className={styles.items}>
            {group.items.map((bookmark) => (
              <BookmarkItem key={bookmark.id} bookmark={bookmark} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
