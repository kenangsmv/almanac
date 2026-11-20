import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import type { OnThisDayItem } from '../../../api/wikipedia';
import type { BookmarkInput, BookmarkKind } from '../../../store/bookmarksStore';
import { BookmarkButton } from '../../bookmarks/BookmarkButton';

interface CategoryListItemProps {
  item: OnThisDayItem;
  kind: BookmarkKind;
  date: string;
  onSelect: (title: string) => void;
}

export function CategoryListItem({ item, kind, date, onSelect }: CategoryListItemProps) {
  const page = item.pages[0];
  const bookmark: BookmarkInput = {
    id: `otd:${date}:${kind}:${item.year ?? ''}:${item.text}`,
    kind,
    title: item.text,
    subtitle: item.year != null ? String(item.year) : undefined,
    imageUrl: page?.thumbnail?.source,
    url: page?.content_urls.desktop.page,
    date,
  };
  const primary = item.year != null ? `${item.year} — ${item.text}` : item.text;

  const handleSelect = () => {
    if (page) onSelect(page.title);
  };

  return (
    <ListItem
      disableGutters
      disablePadding
      secondaryAction={<BookmarkButton bookmark={bookmark} />}
    >
      <ListItemButton onClick={handleSelect} disabled={!page} sx={{ px: 0 }}>
        <ListItemText primary={primary} />
      </ListItemButton>
    </ListItem>
  );
}
