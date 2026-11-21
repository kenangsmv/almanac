import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { Apod } from '../../api/nasa';
import type { OnThisDayItem } from '../../api/wikipedia';
import { addDays } from '../../lib/date';
import { apodQuery } from '../briefing/useApod';
import { onThisDaySelectedQuery } from '../briefing/useOnThisDaySelected';
import { weatherQuery } from '../briefing/useWeather';
import { useLocationStore } from '../location/locationStore';
import { featuredEvent } from './useHomeTeasers';

function warmImage(url: string) {
  const img = new Image();
  img.src = url;
}

/**
 * Warms the adjacent days' data and images so stepping to the previous/next day
 * feels instant. Respects the query cache's staleTime, so already-cached days
 * are not re-fetched.
 */
export function useHomePrefetch(date: string) {
  const queryClient = useQueryClient();
  const city = useLocationStore((state) => state.selectedCity);

  useEffect(() => {
    for (const adjacent of [addDays(date, 1), addDays(date, -1)]) {
      const apodOptions = apodQuery(adjacent);
      void queryClient.prefetchQuery(apodOptions).then(() => {
        const apod = queryClient.getQueryData<Apod>(apodOptions.queryKey);
        if (apod?.imageUrl) warmImage(apod.imageUrl);
      });

      const historyOptions = onThisDaySelectedQuery(adjacent);
      void queryClient.prefetchQuery(historyOptions).then(() => {
        const items = queryClient.getQueryData<OnThisDayItem[]>(historyOptions.queryKey);
        const feat = items ? featuredEvent(items, Number(adjacent.slice(0, 4))) : null;
        const source = feat?.pages[0]?.thumbnail?.source;
        if (source) warmImage(source);
      });

      void queryClient.prefetchQuery(
        weatherQuery(city.latitude, city.longitude, adjacent),
      );
    }
  }, [date, city.latitude, city.longitude, queryClient]);
}
