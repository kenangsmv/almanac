import { Skeleton } from '@mui/material';
import { AsyncState } from '../../components/AsyncState';
import { useApod } from '../briefing/useApod';
import { useSelectedDate } from '../date/useSelectedDate';
import { SkyContent } from './SkyContent';

const loading = (
  <>
    <Skeleton variant="rectangular" height={360} sx={{ borderRadius: 3 }} />
    <Skeleton width="50%" height={60} sx={{ mt: 3 }} />
    <Skeleton />
    <Skeleton />
  </>
);

export function SkyView() {
  const { selectedDate } = useSelectedDate();
  const query = useApod(selectedDate);

  return (
    <AsyncState query={query} loading={loading}>
      {(apod) => <SkyContent apod={apod} />}
    </AsyncState>
  );
}
