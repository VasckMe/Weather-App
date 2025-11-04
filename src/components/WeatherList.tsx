import { CityListItem } from './CityListItem';
import { DATA } from '../mockData';
import { useSearch } from '../contexts/SearchContext';

export const WeatherList = () => {
  const { query } = useSearch();
  const normalized = query.trim().toLowerCase();
  const filtered = normalized.length === 0
    ? DATA
    : DATA.filter(c => c.cityName.toLowerCase().includes(normalized));

  return (
    <div className='flex items-center flex-col gap-2 p-8'>
      {filtered.map((city) => (
        <CityListItem key={city.id} {...city} /> 
      ))}
      {filtered.length === 0 && (
        <div className="text-muted dark:text-muted-dark p-8">No cities match "{query}"</div>
      )}
    </div>
  );
};