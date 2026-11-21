import { Link } from '@mui/material';
import type { Apod } from '../../api/nasa';
import { Eyebrow } from '../../components/Eyebrow';
import { RichText } from '../../components/RichText';
import { formatHuman } from '../../lib/date';
import { BookmarkButton } from '../bookmarks/BookmarkButton';
import styles from './SkyContent.module.css';

interface SkyContentProps {
  apod: Apod;
}

export function SkyContent({ apod }: SkyContentProps) {
  const imageUrl = apod.mediaType === 'image' ? apod.imageUrl : undefined;
  const imageAlt = apod.alt ?? apod.title;
  const credit = apod.credit ?? apod.copyright;
  const bookmark = {
    id: `sky:${apod.date}`,
    kind: 'sky' as const,
    title: apod.title,
    subtitle: 'NASA',
    imageUrl: apod.imageUrl,
    date: apod.date,
  };

  return (
    <div>
      {imageUrl ? (
        <img className={styles.image} src={imageUrl} alt={imageAlt} />
      ) : (
        <Link href={apod.sourceUrl} target="_blank" rel="noopener noreferrer">
          View this day&apos;s astronomy media
        </Link>
      )}

      <div className={styles.header}>
        <div className={styles.titleCol}>
          <Eyebrow>NASA · {formatHuman(apod.date)}</Eyebrow>
          <h2 className={styles.title}>{apod.title}</h2>
        </div>
        <BookmarkButton bookmark={bookmark} />
      </div>

      <p className={styles.explanation}>{apod.explanation}</p>

      <div className={styles.footer}>
        {credit && (
          <div>
            <Eyebrow>Credit</Eyebrow>
            <p className={styles.meta}>
              <RichText html={credit} />
            </p>
          </div>
        )}
        <div>
          <Eyebrow>Source</Eyebrow>
          <Link
            href={apod.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: 'inline-block', mt: 0.5, fontSize: 14 }}
          >
            NASA ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
