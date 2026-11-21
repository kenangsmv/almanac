export const EXPLORE_PATHS = ['/', '/sky', '/weather', '/history'];

export interface NavItem {
  to: string;
  label: string;
}

export const SECTION_LINKS: NavItem[] = [
  { to: '/sky', label: 'NASA' },
  { to: '/weather', label: 'Weather' },
  { to: '/history', label: 'On This Day' },
];

export const PRIMARY_LINKS: NavItem[] = [
  { to: '/', label: 'Explore' },
  { to: '/bookmarks', label: 'My Bookmarks' },
];

export function isLinkActive(pathname: string, to: string): boolean {
  return to === '/' ? EXPLORE_PATHS.includes(pathname) : pathname === to;
}

export function linkTarget(to: string, search: string) {
  return to === '/bookmarks' ? to : { pathname: to, search };
}
