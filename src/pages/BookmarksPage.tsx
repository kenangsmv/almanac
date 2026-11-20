import { Box, Typography } from '@mui/material';
import { Eyebrow } from '../components/Eyebrow';
import { BookmarksView } from '../features/bookmarks/BookmarksView';

export function BookmarksPage() {
  return (
    <Box>
      <Eyebrow>Saved</Eyebrow>
      <Typography
        variant="h1"
        component="h1"
        sx={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', lineHeight: 0.95, mt: 2, mb: 4 }}
      >
        My Bookmarks
      </Typography>
      <BookmarksView />
    </Box>
  );
}
