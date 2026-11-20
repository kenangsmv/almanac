import { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import type { OnThisDay } from '../../../api/wikipedia';
import { CategoryList } from './CategoryList';

interface OnThisDayContentProps {
  data: OnThisDay;
  date: string;
}

export function OnThisDayContent({ data, date }: OnThisDayContentProps) {
  const [tab, setTab] = useState(0);
  const categories = [
    { label: 'Events', items: data.events, kind: 'event' as const },
    { label: 'Births', items: data.births, kind: 'person' as const },
    { label: 'Deaths', items: data.deaths, kind: 'person' as const },
  ];
  const active = categories[tab];

  return (
    <>
      <Tabs value={tab} onChange={(_, value) => setTab(value)} variant="fullWidth">
        {categories.map((category) => (
          <Tab key={category.label} label={category.label} />
        ))}
      </Tabs>
      <CategoryList items={active.items} kind={active.kind} date={date} />
    </>
  );
}
