import { describe, expect, it } from 'vitest';
import type { Bookmark, BookmarkKind } from '../../store/bookmarksStore';
import { groupByType } from './groupByType';

function mk(kind: BookmarkKind, savedAt: number): Bookmark {
  return {
    id: `${kind}-${savedAt}`,
    kind,
    title: `${kind} ${savedAt}`,
    date: '2024-07-04',
    savedAt,
  };
}

describe('groupByType', () => {
  it('returns an empty array for no bookmarks', () => {
    expect(groupByType([])).toEqual([]);
  });

  it('emits groups in the fixed order regardless of input order', () => {
    const groups = groupByType([mk('history', 1), mk('date', 2)]);
    expect(groups.map((g) => g.kind)).toEqual(['date', 'history']);
  });

  it('sorts items within a group by savedAt descending', () => {
    const groups = groupByType([mk('sky', 1), mk('sky', 3), mk('sky', 2)]);
    expect(groups[0].items.map((b) => b.savedAt)).toEqual([3, 2, 1]);
  });

  it('omits kinds that have no items', () => {
    const groups = groupByType([mk('history', 1)]);
    expect(groups).toHaveLength(1);
    expect(groups[0].kind).toBe('history');
  });

  it('attaches the display name for each kind', () => {
    const [group] = groupByType([mk('sky', 1)]);
    expect(group.name).toBe('The Sky');
  });
});
