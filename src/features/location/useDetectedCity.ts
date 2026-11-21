import { useEffect } from 'react';
import { GEO_CITY_ID, useLocationStore } from './locationStore';

const GEO_TIMEOUT_MS = 8000;

let attempted = false;

export function useDetectedCity() {
  const source = useLocationStore((state) => state.source);
  const setDetectedCity = useLocationStore((state) => state.setDetectedCity);

  useEffect(() => {
    if (source === 'user' || attempted) return;
    if (!('geolocation' in navigator)) return;

    attempted = true;
    let cancelled = false;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        if (cancelled) return;
        setDetectedCity({
          id: GEO_CITY_ID,
          name: 'Your location',
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      },
      undefined,
      { timeout: GEO_TIMEOUT_MS },
    );

    return () => {
      cancelled = true;
    };
  }, [source, setDetectedCity]);
}
