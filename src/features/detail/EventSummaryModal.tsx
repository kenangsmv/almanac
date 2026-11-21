import { Link, Modal, Skeleton } from '@mui/material';
import type { WikiPage } from '../../api/wikipedia';
import type { BookmarkInput } from '../../store/bookmarksStore';
import { AsyncState } from '../../components/AsyncState';
import { usePageSummary } from '../briefing/usePageSummary';
import { useSelectedDate } from '../date/useSelectedDate';
import { BookmarkButton } from '../bookmarks/BookmarkButton';
import styles from './EventSummaryModal.module.css';

interface EventSummaryModalProps {
  title: string | null;
  onClose: () => void;
}

const loadingNode = (
  <div className={styles.loading}>
    <Skeleton variant="rounded" height={180} />
    <Skeleton variant="text" width="60%" sx={{ fontSize: 28 }} />
    <Skeleton variant="text" />
    <Skeleton variant="text" />
    <Skeleton variant="text" width="80%" />
  </div>
);

function bookmarkFor(page: WikiPage, date: string): BookmarkInput {
  return {
    id: `history:${date}:${page.title}`,
    kind: 'history',
    title: page.title,
    subtitle: page.description,
    imageUrl: page.thumbnail?.source,
    url: page.content_urls.desktop.page,
    date,
  };
}

function SummaryBody({ title }: { title: string }) {
  const { selectedDate } = useSelectedDate();
  const query = usePageSummary(title);

  return (
    <AsyncState query={query} loading={loadingNode}>
      {(page) => (
        <>
          {page.thumbnail && (
            <img className={styles.image} src={page.thumbnail.source} alt="" />
          )}
          <h2 id="summary-title" className={styles.title}>
            {page.title}
          </h2>
          {page.description && (
            <p className={styles.description}>{page.description}</p>
          )}
          <p className={styles.extract}>{page.extract}</p>
          <div className={styles.actions}>
            <BookmarkButton bookmark={bookmarkFor(page, selectedDate)} />
            <Link
              href={page.content_urls.desktop.page}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ fontSize: 14 }}
            >
              Read full article ↗
            </Link>
          </div>
        </>
      )}
    </AsyncState>
  );
}

export function EventSummaryModal({ title, onClose }: EventSummaryModalProps) {
  return (
    <Modal
      open={title !== null}
      onClose={onClose}
      aria-labelledby="summary-title"
    >
      <div className={styles.panel} tabIndex={-1}>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close summary"
        >
          ✕
        </button>
        {title !== null && <SummaryBody title={title} />}
      </div>
    </Modal>
  );
}
