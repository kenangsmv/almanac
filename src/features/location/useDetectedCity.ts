import { useEffect } from 'react';
import { GEO_CITY_ID, useLocationStore } from './locationStore';

const GEO_TIMEOUT_MS = 8000;

// Attempt geolocation at most once per page load, so a denied/dismissed prompt
// isn't re-asked on every mount (and StrictMode's double-mount stays a no-op).
let attempted = false;

/**
 * Resolves the visitor's weather location from the browser once per session.
 * The browser returns raw coordinates (no network call of ours); Open-Meteo is
 * coordinate-driven, so we label it "Your location" rather than reverse-geocode.
 * Skipped entirely when the user has explicitly chosen a city.
 */
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
      () => {
        // Denied, dismissed or unavailable — keep the current city.
      },
      { timeout: GEO_TIMEOUT_MS },
    );

    return () => {
      cancelled = true;
    };
  }, [source, setDetectedCity]);
}
