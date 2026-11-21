import { useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { PRIMARY_LINKS, SECTION_LINKS, isLinkActive, linkTarget, type NavItem } from './navConfig';
import styles from './MobileNav.module.css';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  pathname: string;
  search: string;
}

const GROUPS: { label: string; links: NavItem[] }[] = [
  { label: 'Sections', links: SECTION_LINKS },
  { label: 'Primary', links: PRIMARY_LINKS },
];

export function MobileNav({ open, onClose, pathname, search }: MobileNavProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  const itemClass = (to: string) =>
    isLinkActive(pathname, to) ? `${styles.item} ${styles.itemActive}` : styles.item;

  return (
    <div id="mobile-nav" className={`${styles.root} ${open ? styles.open : ''}`} aria-hidden={!open}>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.panel} role="dialog" aria-modal="true" aria-label="Menu">
        <button
          type="button"
          ref={closeRef}
          className={styles.close}
          onClick={onClose}
          aria-label="Close menu"
        >
          ✕
        </button>
        {GROUPS.map((group) => (
          <nav key={group.label} className={styles.group} aria-label={group.label}>
            {group.links.map((link) => (
              <RouterLink
                key={link.to}
                to={linkTarget(link.to, search)}
                className={itemClass(link.to)}
                aria-current={isLinkActive(pathname, link.to) ? 'page' : undefined}
                onClick={onClose}
              >
                {link.label}
              </RouterLink>
            ))}
          </nav>
        ))}
      </div>
    </div>
  );
}
