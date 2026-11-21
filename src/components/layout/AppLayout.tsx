import { useCallback, useState } from 'react';
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';
import { MobileNav } from './MobileNav';
import {
  PRIMARY_LINKS,
  SECTION_LINKS,
  isLinkActive,
  linkTarget,
  type NavItem,
} from './navConfig';
import styles from './AppLayout.module.css';

export function AppLayout() {
  const { pathname, search } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const renderLinks = (links: NavItem[]) =>
    links.map((link) => (
      <RouterLink
        key={link.to}
        to={linkTarget(link.to, search)}
        className={
          isLinkActive(pathname, link.to)
            ? `${styles.navLink} ${styles.navLinkActive}`
            : styles.navLink
        }
        aria-current={isLinkActive(pathname, link.to) ? 'page' : undefined}
      >
        {link.label}
      </RouterLink>
    ));

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
            {renderLinks(SECTION_LINKS)}
          </nav>
          <nav className={styles.nav} aria-label="Primary">
            {renderLinks(PRIMARY_LINKS)}
          </nav>
          <button
            type="button"
            className={styles.hamburger}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={openMenu}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={closeMenu} pathname={pathname} search={search} />

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
