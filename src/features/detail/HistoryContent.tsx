import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import type { OnThisDay } from '../../api/wikipedia';
import { HistoryEvent } from './HistoryEvent';

interface HistoryContentProps {
  data: OnThisDay;
  date: string;
}

const MAX_ITEMS = 40;

export function HistoryContent({ data, date }: HistoryContentProps) {
  const [tab, setTab] = useState(0);
  const categories = [
    { label: 'Events', items: data.events },
    { label: 'Births', items: data.births },
    { label: 'Deaths', items: data.deaths },
  ];
  const items = [...categories[tab].items]
    .sort((a, b) => (a.year ?? 0) - (b.year ?? 0))
    .slice(0, MAX_ITEMS);

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={(_, value) => setTab(value)}
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 1, borderBottom: 1, borderColor: 'divider' }}
      >
        {categories.map((category) => (
          <Tab
            key={category.label}
            label={category.label}
            sx={{ letterSpacing: '0.08em', fontWeight: 600 }}
          />
        ))}
      </Tabs>
      {items.map((item, index) => (
        <HistoryEvent key={`${item.year}-${index}`} item={item} date={date} />
      ))}
    </Box>
  );
}
