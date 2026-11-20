import { Card, CardContent, Skeleton, Typography } from '@mui/material';
import type { OnThisDay } from '../../../api/wikipedia';
import { AsyncState } from '../../../components/AsyncState';
import { useOnThisDay } from '../useOnThisDay';
import { OnThisDayContent } from './OnThisDayContent';

interface OnThisDayPanelProps {
  date: string;
}

const loading = (
  <>
    <Skeleton width="40%" />
    <Skeleton />
    <Skeleton />
    <Skeleton />
  </>
);

function hasNoEntries(data: OnThisDay): boolean {
  return data.events.length + data.births.length + data.deaths.length === 0;
}

export function OnThisDayPanel({ date }: OnThisDayPanelProps) {
  const query = useOnThisDay(date);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          On This Day
        </Typography>
        <AsyncState query={query} loading={loading} isEmpty={hasNoEntries}>
          {(data) => <OnThisDayContent data={data} date={date} />}
        </AsyncState>
      </CardContent>
    </Card>
  );
}
