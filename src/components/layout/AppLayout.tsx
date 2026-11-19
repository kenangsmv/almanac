import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';
import styles from './AppLayout.module.css';

const NAV_ITEMS = [
  { to: '/', label: 'Briefing' },
  { to: '/bookmarks', label: 'Bookmarks' },
] as const;

/**
 * Application shell: header + nav, routed content area, footer.
 *
 * Styled deliberately with CSS Modules (standard CSS) rather than MUI's styling
 * system, to satisfy the assignment's "at least one significant part styled with
 * standard CSS / CSS Modules" constraint.
 */
export function AppLayout() {
  const { pathname } = useLocation();

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.logo} aria-hidden="true">
            📅
          </span>
          <span className={styles.title}>Almanac</span>
        </div>
        <nav className={styles.nav} aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.to;
            return (
              <RouterLink
                key={item.to}
                to={item.to}
                className={
                  isActive
                    ? `${styles.navLink} ${styles.navLinkActive}`
                    : styles.navLink
                }
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </RouterLink>
            );
          })}
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
