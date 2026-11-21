import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GEO_CITY_ID, useLocationStore } from './locationStore';

/**
 * Seeds the selected city from URL params when present (e.g. arriving from a saved
 * weather bookmark), so the page shows the bookmarked location instead of whatever
 * city was last selected. A later manual pick leaves these params untouched, so it
 * won't be re-seeded.
 */
export function useCityFromSearch() {
  const [params] = useSearchParams();
  const setCity = useLocationStore((state) => state.setCity);

  const lat = params.get('lat');
  const lon = params.get('lon');
  const cityId = params.get('cityId');
  const cityName = params.get('cityName');

  useEffect(() => {
    if (!cityName || !lat || !lon) return;
    const latitude = Number(lat);
    const longitude = Number(lon);
    if (Number.isNaN(latitude) || Number.isNaN(longitude)) return;

    setCity({
      id: cityId ? Number(cityId) : GEO_CITY_ID,
      name: cityName,
      latitude,
      longitude,
    });
  }, [lat, lon, cityId, cityName, setCity]);
}
