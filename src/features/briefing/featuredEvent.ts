import type { OnThisDayItem } from '../../api/wikipedia';

// Picks the highlight closest to the chosen year that has an image — the entry
// the home teaser surfaces. Shared so detail views can lead with the same item.
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
