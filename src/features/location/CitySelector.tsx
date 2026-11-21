import { Box, Chip } from '@mui/material';
import { PRESET_CITIES } from '../../api/openMeteo';
import { CitySearch } from './CitySearch';
import { useLocationStore } from './locationStore';

export function CitySelector() {
  const selectedCity = useLocationStore((state) => state.selectedCity);
  const setCity = useLocationStore((state) => state.setCity);

  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center', mb: 3 }}>
      {PRESET_CITIES.map((city) => (
        <Chip
          key={city.id}
          label={city.name}
          onClick={() => setCity(city)}
          color={city.id === selectedCity.id ? 'primary' : 'default'}
          variant={city.id === selectedCity.id ? 'filled' : 'outlined'}
        />
      ))}
      <Box sx={{ ml: 'auto' }}>
        <CitySearch />
      </Box>
    </Box>
  );
}
