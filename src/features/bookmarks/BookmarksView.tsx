import { useBookmarksStore } from '../../store/bookmarksStore';
import { BookmarkItem } from './BookmarkItem';
import { groupByType } from './groupByType';
import styles from './BookmarksView.module.css';

export function BookmarksView() {
  const bookmarks = useBookmarksStore((state) => state.bookmarks);

  if (bookmarks.length === 0) {
    return (
      <p className={styles.empty}>
        Nothing saved yet. Use the bookmark icon on a date, image, weather
        summary or historical event to keep it here.
      </p>
    );
  }

  const groups = groupByType(bookmarks);

  return (
    <div className={styles.view}>
      {groups.map((group) => (
        <section key={group.kind} className={styles.group}>
          <h2 className={styles.groupHeading}>{group.name}</h2>
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
