import { Box, Typography } from '@mui/material';
import { DateNavigator } from '../features/date/DateNavigator';
import { useSelectedDate } from '../features/date/useSelectedDate';
import { BriefingLayout } from '../features/briefing/BriefingLayout';
import { ApodPanel } from '../features/briefing/panels/ApodPanel';
import { OnThisDayPanel } from '../features/briefing/panels/OnThisDayPanel';
import { WeatherPanel } from '../features/briefing/panels/WeatherPanel';
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
        <BriefingLayout>
          <ApodPanel date={selectedDate} />
          <OnThisDayPanel date={selectedDate} />
          <WeatherPanel date={selectedDate} />
        </BriefingLayout>
      </Box>
    </Box>
  );
}
