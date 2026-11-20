import { Box, Typography } from '@mui/material';
import { DateNavigator } from '../features/date/DateNavigator';
import { useSelectedDate } from '../features/date/useSelectedDate';
import { ApodPanel } from '../features/briefing/panels/ApodPanel';
import { formatHuman } from '../lib/date';

export function BriefingPage() {
  const { selectedDate } = useSelectedDate();

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {formatHuman(selectedDate)}
      </Typography>
      <DateNavigator />
      <Box sx={{ mt: 3 }}>
        <ApodPanel date={selectedDate} />
      </Box>
    </Box>
  );
}
