import { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { City } from '../../api/openMeteo';
import { searchCities } from '../../api/openMeteo';
import { useLocationStore } from './locationStore';

function cityLabel(city: City): string {
  return [city.name, city.admin1, city.country].filter(Boolean).join(', ');
}

export function CitySearch() {
  const setCity = useLocationStore((state) => state.setCity);
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setQuery(input.trim()), 300);
    return () => clearTimeout(timer);
  }, [input]);

  const { data, isFetching } = useQuery({
    queryKey: ['cities', query],
    queryFn: ({ signal }) => searchCities(query, signal),
    enabled: query.length >= 2,
  });

  return (
    <Autocomplete<City>
      size="small"
      sx={{ width: 240 }}
      options={data ?? []}
      getOptionLabel={cityLabel}
      filterOptions={(options) => options}
      isOptionEqualToValue={(a, b) => a.id === b.id}
      loading={isFetching}
      noOptionsText={query.length < 2 ? 'Type to search…' : 'No matches'}
      onInputChange={(_, value) => setInput(value)}
      onChange={(_, city) => {
        if (city) setCity(city);
      }}
      renderInput={(params) => (
        <TextField {...params} placeholder="Search a city…" />
      )}
    />
  );
}
