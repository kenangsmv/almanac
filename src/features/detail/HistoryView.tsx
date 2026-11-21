import { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import type { OnThisDayType } from '../../api/wikipedia';
import { useSelectedDate } from '../date/useSelectedDate';
import { CategoryPanel } from './CategoryPanel';

const CATEGORIES: { label: string; type: OnThisDayType }[] = [
  { label: 'Highlights', type: 'selected' },
  { label: 'Events', type: 'events' },
  { label: 'Births', type: 'births' },
  { label: 'Deaths', type: 'deaths' },
];

export function HistoryView() {
  const { selectedDate } = useSelectedDate();
  const [tab, setTab] = useState(0);

  return (
    <>
      <Tabs
        value={tab}
        onChange={(_, value) => setTab(value)}
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 1, borderBottom: 1, borderColor: 'divider' }}
      >
        {CATEGORIES.map((category) => (
          <Tab
            key={category.type}
            label={category.label}
            sx={{ letterSpacing: '0.08em', fontWeight: 600 }}
          />
        ))}
      </Tabs>
      <CategoryPanel type={CATEGORIES[tab].type} date={selectedDate} />
    </>
  );
}
