import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import {
  useBookmarksStore,
  type BookmarkInput,
} from '../../store/bookmarksStore';
import { BookmarksView } from './BookmarksView';

function mk(id: string, kind: BookmarkInput['kind']): BookmarkInput {
  return { id, kind, title: `${id} title`, date: '2024-07-04' };
}

function renderView() {
  return render(
    <MemoryRouter>
      <BookmarksView />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  useBookmarksStore.setState({ bookmarks: [] });
});

describe('BookmarksView', () => {
  it('renders the empty state when nothing is saved', () => {
    renderView();
    expect(screen.getByText(/Nothing saved yet/)).toBeInTheDocument();
  });

  it('renders grouped headings in the fixed order with their items', () => {
    useBookmarksStore.getState().addBookmark(mk('h', 'history'));
    useBookmarksStore.getState().addBookmark(mk('s', 'sky'));
    renderView();

    expect(screen.getByText('h title')).toBeInTheDocument();
    expect(screen.getByText('s title')).toBeInTheDocument();
    expect(screen.getAllByRole('heading').map((h) => h.textContent)).toEqual([
      'The Sky',
      'History',
    ]);
  });

  it('removes an item through its remove button', async () => {
    useBookmarksStore.getState().addBookmark(mk('h', 'history'));
    const user = userEvent.setup();
    renderView();

    await user.click(screen.getByRole('button', { name: 'Remove h title' }));

    expect(screen.queryByText('h title')).not.toBeInTheDocument();
    expect(useBookmarksStore.getState().bookmarks).toEqual([]);
  });
});
