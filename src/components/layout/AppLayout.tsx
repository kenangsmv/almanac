import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';
import styles from './AppLayout.module.css';

const EXPLORE_PATHS = ['/', '/sky', '/weather', '/history'];

export function AppLayout() {
  const { pathname, search } = useLocation();
  const exploreActive = EXPLORE_PATHS.includes(pathname);
  const bookmarksActive = pathname === '/bookmarks';
  const skyActive = pathname === '/sky';
  const weatherActive = pathname === '/weather';
  const historyActive = pathname === '/history';

  const linkClass = (active: boolean) =>
    active ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <RouterLink to="/" className={styles.title}>
              Almanac
            </RouterLink>
          </div>
          <nav className={styles.sectionNav} aria-label="Sections">
            <RouterLink
              to={{ pathname: '/sky', search }}
              className={linkClass(skyActive)}
              aria-current={skyActive ? 'page' : undefined}
            >
              NASA
            </RouterLink>
            <RouterLink
              to={{ pathname: '/weather', search }}
              className={linkClass(weatherActive)}
              aria-current={weatherActive ? 'page' : undefined}
            >
              Weather
            </RouterLink>
            <RouterLink
              to={{ pathname: '/history', search }}
              className={linkClass(historyActive)}
              aria-current={historyActive ? 'page' : undefined}
            >
              On This Day
            </RouterLink>
          </nav>
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
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span>Almanac — a date-driven discovery app</span>
        </div>
      </footer>
    </div>
  );
}
