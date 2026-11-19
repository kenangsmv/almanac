import { Box, Paper, Typography } from '@mui/material';
import { useBookmarksStore } from '../store/bookmarksStore';

/**
 * Placeholder for the saved-discoveries view. Reads from the persisted
 * bookmarks store; browse/manage UI is added in the feature phase.
 */
export function BookmarksPage() {
  const count = useBookmarksStore((state) => state.bookmarks.length);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Bookmarks
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Discoveries you save will appear here and persist across sessions.
      </Typography>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography color="text.secondary">
          {count === 0 ? 'No bookmarks yet.' : `${count} bookmark(s) saved.`}
        </Typography>
      </Paper>
    </Box>
  );
}
