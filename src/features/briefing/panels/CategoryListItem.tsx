import { ListItem, ListItemText } from '@mui/material';
import type { OnThisDayItem } from '../../../api/wikipedia';
import type { BookmarkInput, BookmarkKind } from '../../../store/bookmarksStore';
import { BookmarkButton } from '../../bookmarks/BookmarkButton';

interface CategoryListItemProps {
  item: OnThisDayItem;
  kind: BookmarkKind;
  date: string;
}

export function CategoryListItem({ item, kind, date }: CategoryListItemProps) {
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

  return (
    <ListItem disableGutters secondaryAction={<BookmarkButton bookmark={bookmark} />}>
      <ListItemText primary={primary} />
    </ListItem>
  );
}
