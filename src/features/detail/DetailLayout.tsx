import type { ReactNode } from 'react';
import { DateExplorer } from './DateExplorer';
import styles from './DetailLayout.module.css';

interface DetailLayoutProps {
  children: ReactNode;
}

export function DetailLayout({ children }: DetailLayoutProps) {
  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <DateExplorer />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
