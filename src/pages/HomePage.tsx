import { Eyebrow } from '../components/Eyebrow';
import { DatePicker } from '../features/date/DatePicker';
import { useSelectedDate } from '../features/date/useSelectedDate';
import { TeaserCard } from '../features/home/TeaserCard';
import { useDetectedCity } from '../features/location/useDetectedCity';
import { useHomePrefetch } from '../features/home/useHomePrefetch';
import { useHomeTeasers } from '../features/home/useHomeTeasers';
import { formatHuman } from '../lib/date';
import styles from './HomePage.module.css';

export function HomePage() {
  const { selectedDate } = useSelectedDate();
  useDetectedCity();
  const teasers = useHomeTeasers(selectedDate);
  useHomePrefetch(selectedDate);

  return (
    <div>
      <div className={styles.hero}>
        <div>
          <Eyebrow>A digital time capsule</Eyebrow>
          <h1 className={styles.heroTitle}>
            Every Date Has a{' '}
            <em className={styles.accentEm}>Story.</em>
          </h1>
        </div>

        <div>
          <Eyebrow>Choose a date</Eyebrow>
          <p className={styles.chosenDate}>{formatHuman(selectedDate)}</p>
          <div className={styles.calendarWrap}>
            <DatePicker />
          </div>
        </div>
      </div>

      <div className={styles.teaserGrid}>
        {teasers.map((teaser) => (
          <TeaserCard key={teaser.to} {...teaser} />
        ))}
      </div>
    </div>
  );
}
