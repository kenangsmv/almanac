import { List } from '@mui/material';
import type { OnThisDayItem } from '../../../api/wikipedia';
import type { BookmarkKind } from '../../../store/bookmarksStore';
import { CategoryListItem } from './CategoryListItem';

const MAX_ITEMS = 10;

interface CategoryListProps {
  items: OnThisDayItem[];
  kind: BookmarkKind;
  date: string;
  onSelect: (title: string) => void;
}

export function CategoryList({ items, kind, date, onSelect }: CategoryListProps) {
  return (
    <List dense disablePadding>
      {items.slice(0, MAX_ITEMS).map((item, index) => (
        <CategoryListItem
          key={`${item.year}-${index}`}
          item={item}
          kind={kind}
          date={date}
          onSelect={onSelect}
        />
      ))}
    </List>
  );
}
