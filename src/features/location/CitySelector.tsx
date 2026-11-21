import { Chip } from '@mui/material';
import { PRESET_CITIES } from '../../api/openMeteo';
import { CitySearch } from './CitySearch';
import { useLocationStore } from './locationStore';
import styles from './CitySelector.module.css';

export function CitySelector() {
  const selectedCity = useLocationStore((state) => state.selectedCity);
  const setCity = useLocationStore((state) => state.setCity);

  return (
    <div className={styles.selector}>
      {PRESET_CITIES.map((city) => (
        <Chip
          key={city.id}
          label={city.name}
          onClick={() => setCity(city)}
          color={city.id === selectedCity.id ? 'primary' : 'default'}
          variant={city.id === selectedCity.id ? 'filled' : 'outlined'}
        />
      ))}
      <div className={styles.searchWrap}>
        <CitySearch />
      </div>
    </div>
  );
}
