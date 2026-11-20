import { useQuery } from '@tanstack/react-query';
import { fetchPageSummary } from '../../api/wikipedia';

export function usePageSummary(title: string | null) {
  return useQuery({
    queryKey: ['pageSummary', title],
    queryFn: ({ signal }) => fetchPageSummary(title ?? '', signal),
    enabled: title != null,
  });
}
