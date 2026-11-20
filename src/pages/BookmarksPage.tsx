import { Box, Typography } from '@mui/material';
import { BookmarksView } from '../features/bookmarks/BookmarksView';

export function BookmarksPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Bookmarks
      </Typography>
      <Box sx={{ mt: 2 }}>
        <BookmarksView />
      </Box>
    </Box>
  );
}
