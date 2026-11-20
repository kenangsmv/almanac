import type { ReactNode } from 'react';
import styles from './BriefingLayout.module.css';

interface BriefingLayoutProps {
  children: ReactNode;
}

export function BriefingLayout({ children }: BriefingLayoutProps) {
  return <div className={styles.grid}>{children}</div>;
}
