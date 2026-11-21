import { Box, Link, Skeleton, Typography } from '@mui/material';
import type { OnThisDayItem } from '../../api/wikipedia';
import { BookmarkButton } from '../bookmarks/BookmarkButton';

// Mirrors the real item's grid and dimensions so the loading state doesn't shift
// the layout when data arrives. Kept beside HistoryEvent to stay in sync with it.
const rowSx = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: '120px 1fr' },
  gap: { xs: 1.5, sm: 4 },
  py: 4,
  borderTop: 2,
  borderColor: 'divider',
} as const;

export function HistoryEventSkeleton() {
  return (
    <Box sx={rowSx}>
      <Box>
        <Skeleton variant="text" width={90} sx={{ fontSize: 48, lineHeight: 0.95 }} />
      </Box>
      <Box>
        <Skeleton variant="text" sx={{ fontSize: 16 }} />
        <Skeleton variant="text" width="85%" sx={{ fontSize: 16, mb: 2 }} />
        <Skeleton
          variant="rounded"
          sx={{ width: '100%', maxWidth: 420, height: 220, borderRadius: 2, mb: 2 }}
        />
        <Skeleton variant="text" width={160} sx={{ fontSize: 13 }} />
      </Box>
    </Box>
  );
}

interface HistoryEventProps {
  item: OnThisDayItem;
  date: string;
}

export function HistoryEvent({ item, date }: HistoryEventProps) {
  const year = Number(date.slice(0, 4));
  const page = item.pages[0];
  const image = page?.thumbnail?.source;
  const link = page?.content_urls.desktop.page;
  const ago =
    item.year != null && year - item.year > 0 ? `${year - item.year} years before ${year}` : '';
  const title = item.text.length > 110 ? `${item.text.slice(0, 110)}…` : item.text;
  const bookmark = {
    id: `history:${date}:${item.year ?? ''}:${item.text}`,
    kind: 'history' as const,
    title,
    subtitle: item.year != null ? String(item.year) : undefined,
    imageUrl: image,
    url: link,
    date,
  };

  return (
    <Box sx={rowSx}>
      <Box>
        <Typography variant="h3" sx={{ fontSize: 48, lineHeight: 0.95 }}>
          {item.year ?? '—'}
        </Typography>
        {ago && (
          <Typography color="text.secondary" sx={{ fontSize: 12, mt: 0.5 }}>
            {ago}
          </Typography>
        )}
      </Box>
      <Box>
        <Typography sx={{ fontSize: 16, lineHeight: 1.55, color: '#e3e5e9', mb: 2 }}>
          {item.text}
        </Typography>
        {image && (
          <Box
            component="img"
            src={image}
            alt=""
            loading="lazy"
            sx={{
              display: 'block',
              width: '100%',
              maxWidth: 420,
              maxHeight: 300,
              objectFit: 'cover',
              borderRadius: 2,
              mb: 2,
            }}
          />
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <BookmarkButton bookmark={bookmark} />
          {link && (
            <Link href={link} target="_blank" rel="noopener noreferrer" sx={{ fontSize: 13 }}>
              Read on Wikipedia ↗
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  );
}
