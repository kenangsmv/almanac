import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { City } from '../../api/openMeteo';
import { PRESET_CITIES } from '../../api/openMeteo';

// Sentinel id for a geolocated city — never collides with a real geonames id.
export const GEO_CITY_ID = -1;

// `default` = untouched seed, `geo` = detected from the browser, `user` = an
// explicit pick. Only `user` is sticky; geolocation may overwrite the others.
type CitySource = 'default' | 'geo' | 'user';

interface LocationState {
  selectedCity: City;
  source: CitySource;
  setCity: (city: City) => void;
  setDetectedCity: (city: City) => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      selectedCity: PRESET_CITIES[0],
      source: 'default',
      setCity: (city) => set({ selectedCity: city, source: 'user' }),
      setDetectedCity: (city) =>
        set((state) =>
          state.source === 'user' ? state : { selectedCity: city, source: 'geo' },
        ),
    }),
    {
      name: 'almanac-location',
      version: 2,
      partialize: (state) => ({ selectedCity: state.selectedCity, source: state.source }),
      // v1 stored only a city with no source, so we can't tell a default from a
      // real pick — reset to the seed and let detection run fresh.
      migrate: () => ({ selectedCity: PRESET_CITIES[0], source: 'default' as CitySource }),
    },
  ),
);
