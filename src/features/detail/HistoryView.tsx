import { Skeleton } from '@mui/material';
import type { OnThisDay } from '../../api/wikipedia';
import { AsyncState } from '../../components/AsyncState';
import { useOnThisDay } from '../briefing/useOnThisDay';
import { useSelectedDate } from '../date/useSelectedDate';
import { HistoryContent } from './HistoryContent';

const loading = (
  <>
    <Skeleton height={60} />
    <Skeleton />
    <Skeleton />
    <Skeleton />
  </>
);

function hasNoEntries(data: OnThisDay): boolean {
  return (
    data.selected.length + data.events.length + data.births.length + data.deaths.length === 0
  );
}

export function HistoryView() {
  const { selectedDate } = useSelectedDate();
  const query = useOnThisDay(selectedDate);

  return (
    <AsyncState query={query} loading={loading} isEmpty={hasNoEntries}>
      {(data) => <HistoryContent data={data} date={selectedDate} />}
    </AsyncState>
  );
}
