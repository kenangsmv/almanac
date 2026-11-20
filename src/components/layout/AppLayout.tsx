import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';
import styles from './AppLayout.module.css';

const EXPLORE_PATHS = ['/', '/sky', '/weather', '/history'];

export function AppLayout() {
  const { pathname, search } = useLocation();
  const exploreActive = EXPLORE_PATHS.includes(pathname);
  const bookmarksActive = pathname === '/bookmarks';

  const linkClass = (active: boolean) =>
    active ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.title}>Almanac</span>
        </div>
        <nav className={styles.nav} aria-label="Primary">
          <RouterLink
            to={{ pathname: '/', search }}
            className={linkClass(exploreActive)}
            aria-current={exploreActive ? 'page' : undefined}
          >
            Explore
          </RouterLink>
          <RouterLink
            to="/bookmarks"
            className={linkClass(bookmarksActive)}
            aria-current={bookmarksActive ? 'page' : undefined}
          >
            My Bookmarks
          </RouterLink>
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <span>Almanac — a date-driven discovery app</span>
      </footer>
    </div>
  );
}
