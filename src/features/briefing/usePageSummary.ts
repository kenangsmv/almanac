import { queryOptions, useQuery } from '@tanstack/react-query';
import { fetchPageSummary } from '../../api/wikipedia';

export function pageSummaryQuery(title: string) {
  return queryOptions({
    queryKey: ['wikiSummary', title],
    queryFn: ({ signal }) => fetchPageSummary(title, signal),
  });
}

export function usePageSummary(title: string) {
  return useQuery(pageSummaryQuery(title));
}
