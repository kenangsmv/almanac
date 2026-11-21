import { Box, Link, Typography } from '@mui/material';
import type { Apod } from '../../api/nasa';
import { Eyebrow } from '../../components/Eyebrow';
import { RichText } from '../../components/RichText';
import { formatHuman } from '../../lib/date';
import { BookmarkButton } from '../bookmarks/BookmarkButton';

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
    <Box>
      {imageUrl ? (
        <Box
          component="img"
          src={imageUrl}
          alt={imageAlt}
          sx={{
            width: '400px',
            height: '400px',
            borderRadius: 3,
            display: 'block',
            boxShadow: '0 30px 70px rgba(0, 0, 0, 0.5)',
            objectFit: 'cover',
          }}
        />
      ) : (
        <Link href={apod.sourceUrl} target="_blank" rel="noopener noreferrer">
          View this day&apos;s astronomy media
        </Link>
      )}

      <Box sx={{ mt: 3, display: 'flex', alignItems: 'flex-start', gap: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Eyebrow>NASA · {formatHuman(apod.date)}</Eyebrow>
          <Typography
            variant="h2"
            sx={{ mt: 1, fontSize: 'clamp(2rem, 4.5vw, 3.75rem)', lineHeight: 1 }}
          >
            {apod.title}
          </Typography>
        </Box>
        <BookmarkButton bookmark={bookmark} />
      </Box>

      <Typography
        sx={{ mt: 3, color: 'text.secondary', fontSize: 17, lineHeight: 1.75, maxWidth: '70ch' }}
      >
        {apod.explanation}
      </Typography>

      <Box
        sx={{
          mt: 4,
          pt: 2,
          borderTop: 2,
          borderColor: 'divider',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
        }}
      >
        {credit && (
          <Box>
            <Eyebrow>Credit</Eyebrow>
            <Typography sx={{ mt: 0.5, fontSize: 14 }}>
              <RichText html={credit} />
            </Typography>
          </Box>
        )}
        <Box>
          <Eyebrow>Source</Eyebrow>
          <Link
            href={apod.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: 'inline-block', mt: 0.5, fontSize: 14 }}
          >
            NASA ↗
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
