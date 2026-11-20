import { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import type { OnThisDay } from '../../../api/wikipedia';
import { CategoryList } from './CategoryList';

interface OnThisDayContentProps {
  data: OnThisDay;
}

export function OnThisDayContent({ data }: OnThisDayContentProps) {
  const [tab, setTab] = useState(0);
  const categories = [
    { label: 'Events', items: data.events },
    { label: 'Births', items: data.births },
    { label: 'Deaths', items: data.deaths },
  ];

  return (
    <>
      <Tabs value={tab} onChange={(_, value) => setTab(value)} variant="fullWidth">
        {categories.map((category) => (
          <Tab key={category.label} label={category.label} />
        ))}
      </Tabs>
      <CategoryList items={categories[tab].items} />
    </>
  );
}
