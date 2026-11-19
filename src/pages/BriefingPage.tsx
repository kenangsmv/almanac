import { Box, Paper, Typography } from '@mui/material';

/**
 * Placeholder for the date briefing. Date navigation and the multi-source
 * briefing (NASA APOD, Wikipedia On This Day, Open-Meteo, ...) land here.
 */
export function BriefingPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Daily Briefing
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Pick a date to assemble a briefing: history, the sky, the weather and
        who was born.
      </Typography>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography color="text.secondary">
          Date navigation and data sources are coming next.
        </Typography>
      </Paper>
    </Box>
  );
}
