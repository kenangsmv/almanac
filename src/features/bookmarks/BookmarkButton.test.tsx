import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import {
  useBookmarksStore,
  type BookmarkInput,
} from '../../store/bookmarksStore';
import { BookmarkButton } from './BookmarkButton';

const bookmark: BookmarkInput = {
  id: 'a',
  kind: 'history',
  title: 'a',
  date: '2024-07-04',
};

beforeEach(() => {
  useBookmarksStore.setState({ bookmarks: [] });
});

describe('BookmarkButton', () => {
  it('shows the save label when the bookmark is not saved', () => {
    render(<BookmarkButton bookmark={bookmark} />);
    expect(
      screen.getByRole('button', { name: 'Save bookmark' }),
    ).toBeInTheDocument();
  });

  it('saves the bookmark and flips the label on click', async () => {
    const user = userEvent.setup();
    render(<BookmarkButton bookmark={bookmark} />);

    await user.click(screen.getByRole('button', { name: 'Save bookmark' }));

    expect(
      screen.getByRole('button', { name: 'Remove bookmark' }),
    ).toBeInTheDocument();
    expect(useBookmarksStore.getState().bookmarks).toHaveLength(1);
  });

  it('removes the bookmark and flips the label back on click', async () => {
    useBookmarksStore.getState().addBookmark(bookmark);
    const user = userEvent.setup();
    render(<BookmarkButton bookmark={bookmark} />);

    await user.click(screen.getByRole('button', { name: 'Remove bookmark' }));

    expect(
      screen.getByRole('button', { name: 'Save bookmark' }),
    ).toBeInTheDocument();
    expect(useBookmarksStore.getState().bookmarks).toEqual([]);
  });
});
