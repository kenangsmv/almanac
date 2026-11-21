import { useState } from 'react';
import type { OnThisDayItem, OnThisDayType } from '../../api/wikipedia';
import { AsyncState } from '../../components/AsyncState';
import { featuredEvent } from '../briefing/featuredEvent';
import { useOnThisDayCategory } from '../briefing/useOnThisDayCategory';
import { EventSummaryModal } from './EventSummaryModal';
import { HistoryEvent, HistoryEventSkeleton } from './HistoryEvent';
import styles from './CategoryPanel.module.css';

const MAX_ITEMS = 40;

const loading = (
  <div className={styles.list}>
    {Array.from({ length: 4 }, (_, index) => (
      <HistoryEventSkeleton key={index} />
    ))}
  </div>
);

interface CategoryPanelProps {
  type: OnThisDayType;
  date: string;
}
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
  const [summaryTitle, setSummaryTitle] = useState<string | null>(null);

  return (
    <>
      <AsyncState query={query} loading={loading} isEmpty={(items) => items.length === 0}>
        {(items) => (
          <div className={styles.list}>
            {orderItems(type, items, year)
              .slice(0, MAX_ITEMS)
              .map((item, index) => (
                <HistoryEvent
                  key={`${item.year}-${index}`}
                  item={item}
                  date={date}
                  onOpenSummary={setSummaryTitle}
                />
              ))}
          </div>
        )}
      </AsyncState>
      <EventSummaryModal title={summaryTitle} onClose={() => setSummaryTitle(null)} />
    </>
  );
}
