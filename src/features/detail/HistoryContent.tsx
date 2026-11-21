import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import type { OnThisDay } from '../../api/wikipedia';
import { featuredEvent } from '../briefing/featuredEvent';
import { HistoryEvent } from './HistoryEvent';

interface HistoryContentProps {
  data: OnThisDay;
  date: string;
}

const MAX_ITEMS = 40;

export function HistoryContent({ data, date }: HistoryContentProps) {
  const [tab, setTab] = useState(0);
  const year = Number(date.slice(0, 4));

  // Lead the curated highlights with the same entry the home teaser features, so
  // clicking through lands on the item the user just saw. `selected` arrives with
  // the full `all` feed, so this needs no extra request.
  const featured = featuredEvent(data.selected, year);
  const highlights = featured
    ? [featured, ...data.selected.filter((item) => item !== featured)]
    : data.selected;

  const categories = [
    ...(highlights.length ? [{ label: 'Highlights', items: highlights, sorted: false }] : []),
    { label: 'Events', items: data.events, sorted: true },
    { label: 'Births', items: data.births, sorted: true },
    { label: 'Deaths', items: data.deaths, sorted: true },
  ];
  // Clamp so a tab index from a previous date can't exceed the current category
  // count (dates without highlights have one fewer tab).
  const activeTab = tab < categories.length ? tab : 0;
  const current = categories[activeTab];
  const items = (
    current.sorted ? [...current.items].sort((a, b) => (a.year ?? 0) - (b.year ?? 0)) : current.items
  ).slice(0, MAX_ITEMS);

  return (
    <Box>
      <Tabs
        value={activeTab}
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
      <Box sx={{ '& > :first-child': { borderTop: 0 } }}>
        {items.map((item, index) => (
          <HistoryEvent key={`${item.year}-${index}`} item={item} date={date} />
        ))}
      </Box>
    </Box>
  );
}
