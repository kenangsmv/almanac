import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { City } from '../../api/openMeteo';
import { PRESET_CITIES } from '../../api/openMeteo';

interface LocationState {
  selectedCity: City;
  setCity: (city: City) => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      selectedCity: PRESET_CITIES[0],
      setCity: (city) => set({ selectedCity: city }),
    }),
    {
      name: 'almanac-location',
      version: 1,
      partialize: (state) => ({ selectedCity: state.selectedCity }),
    },
  ),
);
