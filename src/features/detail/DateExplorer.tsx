import dayjs from 'dayjs';
import { Eyebrow } from '../../components/Eyebrow';
import { DatePicker } from '../date/DatePicker';
import { useSelectedDate } from '../date/useSelectedDate';
import styles from './DateExplorer.module.css';

export function DateExplorer() {
  const { selectedDate } = useSelectedDate();
  const value = dayjs(selectedDate);

  return (
    <div className={styles.panel}>
      <Eyebrow>Date explorer</Eyebrow>
      <div className={styles.dateRow}>
        <span className={styles.dayNumber}>{value.date()}</span>
        <div>
          <span className={styles.month}>{value.format('MMMM')}</span>
          <span className={styles.sub}>
            {value.year()} · {value.format('dddd')}
          </span>
        </div>
      </div>

      <DatePicker />
    </div>
  );
}
