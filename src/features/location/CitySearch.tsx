import { useEffect, useState, type SyntheticEvent } from 'react';
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

  const handleCityChange = (_event: SyntheticEvent, city: City | null) => {
    if (city) setCity(city);
  };

  const handleInputChange = (
    _event: SyntheticEvent,
    value: string,
    reason: string,
  ) => {
    if (reason === 'input') setRawInput(value);
  };

  return (
    <Autocomplete
      value={selectedCity}
      onChange={handleCityChange}
      onInputChange={handleInputChange}
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
