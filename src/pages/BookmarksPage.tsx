import { Eyebrow } from '../components/Eyebrow';
import { BookmarksView } from '../features/bookmarks/BookmarksView';
import styles from './BookmarksPage.module.css';

export function BookmarksPage() {
  return (
    <div>
      <Eyebrow>Saved</Eyebrow>
      <h1 className={styles.title}>My Bookmarks</h1>
      <BookmarksView />
    </div>
  );
}
