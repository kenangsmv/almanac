import type { OnThisDayItem } from '../../api/wikipedia';

export function featuredEvent(items: OnThisDayItem[], year: number): OnThisDayItem | null {
  let best: OnThisDayItem | null = null;
  for (const item of items) {
    if (!item.pages[0]?.thumbnail || item.year == null) continue;
    if (!best || Math.abs(item.year - year) < Math.abs((best.year ?? 0) - year)) {
      best = item;
    }
  }
  return best;
}
