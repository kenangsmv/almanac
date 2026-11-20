import { Box, Link, Typography } from '@mui/material';
import type { Apod } from '../../../api/nasa';

interface ApodContentProps {
  apod: Apod;
}

export function ApodContent({ apod }: ApodContentProps) {
  const imageUrl = apod.mediaType === 'image' ? apod.imageUrl : undefined;
  const imageAlt = apod.alt ?? apod.title;
  const credit = apod.credit ?? apod.copyright;

  return (
    <Box>
      {imageUrl ? (
        <Box
          component="img"
          src={imageUrl}
          alt={imageAlt}
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
      {credit && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
          {credit}
        </Typography>
      )}
      <Typography variant="body2" sx={{ mt: 1 }}>
        {apod.explanation}
      </Typography>
    </Box>
  );
}
