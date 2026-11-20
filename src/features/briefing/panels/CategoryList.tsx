import { List, ListItem, ListItemText } from '@mui/material';
import type { OnThisDayItem } from '../../../api/wikipedia';

const MAX_ITEMS = 10;

interface CategoryListProps {
  items: OnThisDayItem[];
}

export function CategoryList({ items }: CategoryListProps) {
  return (
    <List dense disablePadding>
      {items.slice(0, MAX_ITEMS).map((item, index) => (
        <ListItem key={`${item.year}-${index}`} disableGutters>
          <ListItemText
            primary={item.year != null ? `${item.year} — ${item.text}` : item.text}
          />
        </ListItem>
      ))}
    </List>
  );
}
