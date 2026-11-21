import { memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import { Eyebrow } from '../../components/Eyebrow';
import styles from './TeaserCard.module.css';

export interface TeaserCardProps {
  to: string;
  index: string;
  pill: string;
  eyebrow: string;
  headline: string;
  description: string;
  background: string;
  image?: string;
  loading?: boolean;
}

function TeaserCardComponent({
  to,
  index,
  pill,
  eyebrow,
  headline,
  description,
  background,
  image,
  loading,
}: TeaserCardProps) {
  return (
    <RouterLink to={to} className={styles.card}>
      <div className={styles.layer} style={{ background }} />
      {image && (
        <div className={styles.image} style={{ backgroundImage: `url("${image}")` }} />
      )}
      {loading && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ position: 'absolute', inset: 0, height: '100%', bgcolor: 'rgba(255, 255, 255, 0.06)' }}
        />
      )}
      <div className={styles.gradient} />
      <div className={styles.content}>
        <div className={styles.topRow}>
          <span>{index}</span>
          <span className={styles.pill}>{pill}</span>
        </div>
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h3 className={styles.headline}>{headline}</h3>
          <p className={styles.description}>{description}</p>
          <div className={styles.exploreRow}>
            EXPLORE MORE
            <span className={styles.arrow}>→</span>
          </div>
        </div>
      </div>
    </RouterLink>
  );
}

export const TeaserCard = memo(TeaserCardComponent);
