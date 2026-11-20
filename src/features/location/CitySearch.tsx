import { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import type { City } from '../../api/openMeteo';
import { useLocationStore } from './locationStore';
import { useCitySearch } from './useCitySearch';

function cityLabel(city: City): string {
  return [city.name, city.admin1, city.country].filter(Boolean).join(', ');
}

export function CitySearch() {
  const selectedCity = useLocationStore((state) => state.selectedCity);
  const setCity = useLocationStore((state) => state.setCity);

  const [rawInput, setRawInput] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const id = setTimeout(() => setQuery(rawInput), 300);
    return () => clearTimeout(id);
  }, [rawInput]);

  const { data } = useCitySearch(query);
  const results = data ?? [];
  const options = results.some((city) => city.id === selectedCity.id)
    ? results
    : [selectedCity, ...results];

  return (
    <Autocomplete
      value={selectedCity}
      onChange={(_, city) => {
        if (city) setCity(city);
      }}
      onInputChange={(_, value, reason) => {
        if (reason === 'input') setRawInput(value);
      }}
      options={options}
      getOptionLabel={cityLabel}
      isOptionEqualToValue={(a, b) => a.id === b.id}
      filterOptions={(opts) => opts}
      size="small"
      sx={{ minWidth: 220 }}
      renderInput={(params) => <TextField {...params} label="City" />}
    />
  );
}
