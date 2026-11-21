import { Box } from '@mui/material';
import type { OnThisDayItem, OnThisDayType } from '../../api/wikipedia';
import { AsyncState } from '../../components/AsyncState';
import { featuredEvent } from '../briefing/featuredEvent';
import { useOnThisDayCategory } from '../briefing/useOnThisDayCategory';
import { HistoryEvent, HistoryEventSkeleton } from './HistoryEvent';

const MAX_ITEMS = 40;

// The first row drops its top border to match the loaded list below.
const firstRowBorderless = { '& > :first-of-type': { borderTop: 0 } };

const loading = (
  <Box sx={firstRowBorderless}>
    {Array.from({ length: 4 }, (_, index) => (
      <HistoryEventSkeleton key={index} />
    ))}
  </Box>
);

interface CategoryPanelProps {
  type: OnThisDayType;
  date: string;
}

// `selected` is a curated list, so lead with the featured highlight (the same
// entry the home teaser surfaces) and keep the rest as-is. The other categories
// are chronological, so sort them by year.
function orderItems(type: OnThisDayType, items: OnThisDayItem[], year: number): OnThisDayItem[] {
  if (type === 'selected') {
    const featured = featuredEvent(items, year);
    return featured ? [featured, ...items.filter((item) => item !== featured)] : items;
  }
  return [...items].sort((a, b) => (a.year ?? 0) - (b.year ?? 0));
}

export function CategoryPanel({ type, date }: CategoryPanelProps) {
  const query = useOnThisDayCategory(type, date);
  const year = Number(date.slice(0, 4));

  return (
    <AsyncState query={query} loading={loading} isEmpty={(items) => items.length === 0}>
      {(items) => (
        <Box sx={firstRowBorderless}>
          {orderItems(type, items, year)
            .slice(0, MAX_ITEMS)
            .map((item, index) => (
              <HistoryEvent key={`${item.year}-${index}`} item={item} date={date} />
            ))}
        </Box>
      )}
    </AsyncState>
  );
}
