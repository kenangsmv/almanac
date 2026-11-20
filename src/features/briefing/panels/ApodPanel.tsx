import { Card, CardContent, Skeleton, Typography } from '@mui/material';
import { AsyncState } from '../AsyncState';
import { useApod } from '../useApod';
import { ApodContent } from './ApodContent';

interface ApodPanelProps {
  date: string;
}

const loading = (
  <>
    <Skeleton variant="rectangular" height={240} />
    <Skeleton width="60%" />
    <Skeleton />
    <Skeleton />
  </>
);

export function ApodPanel({ date }: ApodPanelProps) {
  const query = useApod(date);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Astronomy Picture of the Day
        </Typography>
        <AsyncState query={query} loading={loading}>
          {(apod) => <ApodContent apod={apod} />}
        </AsyncState>
      </CardContent>
    </Card>
  );
}
