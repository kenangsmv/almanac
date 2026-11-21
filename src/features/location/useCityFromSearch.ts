import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GEO_CITY_ID, useLocationStore } from './locationStore';

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
