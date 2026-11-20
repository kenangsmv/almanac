import { Box, Card, CardContent, Link, Skeleton, Typography } from '@mui/material';
import { AsyncState } from '../AsyncState';
import { useApod } from '../useApod';

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
          {(apod) => (
            <Box>
              {apod.mediaType === 'image' && apod.imageUrl ? (
                <Box
                  component="img"
                  src={apod.imageUrl}
                  alt={apod.alt ?? apod.title}
                  sx={{ width: '100%', borderRadius: 1, display: 'block' }}
                />
              ) : (
                <Link href={apod.sourceUrl} target="_blank" rel="noopener noreferrer">
                  View this day&apos;s astronomy media
                </Link>
              )}
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                {apod.title}
              </Typography>
              {(apod.credit ?? apod.copyright) && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block' }}
                >
                  {apod.credit ?? apod.copyright}
                </Typography>
              )}
              <Typography variant="body2" sx={{ mt: 1 }}>
                {apod.explanation}
              </Typography>
            </Box>
          )}
        </AsyncState>
      </CardContent>
    </Card>
  );
}
