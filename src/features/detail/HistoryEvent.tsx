import { Link, Skeleton } from '@mui/material';
import type { OnThisDayItem } from '../../api/wikipedia';
import { BookmarkButton } from '../bookmarks/BookmarkButton';
import styles from './HistoryEvent.module.css';

export function HistoryEventSkeleton() {
  return (
    <div className={styles.row}>
      <div>
        <Skeleton variant="text" width={90} sx={{ fontSize: 48, lineHeight: 0.95 }} />
      </div>
      <div>
        <Skeleton variant="text" sx={{ fontSize: 16 }} />
        <Skeleton variant="text" width="85%" sx={{ fontSize: 16, mb: 2 }} />
        <Skeleton
          variant="rounded"
          sx={{ width: '100%', maxWidth: 420, height: 220, borderRadius: 2, mb: 2 }}
        />
        <Skeleton variant="text" width={160} sx={{ fontSize: 13 }} />
      </div>
    </div>
  );
}

interface HistoryEventProps {
  item: OnThisDayItem;
  date: string;
}

export function HistoryEvent({ item, date }: HistoryEventProps) {
  const year = Number(date.slice(0, 4));
  const page = item.pages[0];
  const image = page?.thumbnail?.source;
  const link = page?.content_urls.desktop.page;
  const ago =
    item.year != null && year - item.year > 0 ? `${year - item.year} years before ${year}` : '';
  const title = item.text.length > 110 ? `${item.text.slice(0, 110)}…` : item.text;
  const bookmark = {
    id: `history:${date}:${item.year ?? ''}:${item.text}`,
    kind: 'history' as const,
    title,
    subtitle: item.year != null ? String(item.year) : undefined,
    imageUrl: image,
    url: link,
    date,
  };

  return (
    <div className={styles.row}>
      <div>
        <h3 className={styles.year}>{item.year ?? '—'}</h3>
        {ago && <p className={styles.ago}>{ago}</p>}
      </div>
      <div>
        <p className={styles.text}>{item.text}</p>
        {image && (
          <img className={styles.image} src={image} alt="" loading="lazy" />
        )}
        <div className={styles.actions}>
          <BookmarkButton bookmark={bookmark} />
          {link && (
            <Link href={link} target="_blank" rel="noopener noreferrer" sx={{ fontSize: 13 }}>
              Read on Wikipedia ↗
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
