import { CityListItem } from './CityListItem';
import { DATA } from '../mockData';
import { useSearch } from '../contexts/SearchContext';
import { useOpenWeatherSearch } from '../hooks/useOpenWeatherSearch';

export const WeatherList = () => {
  const { query } = useSearch();
  const normalized = query.trim().toLowerCase();
  const { loading, error, results } = useOpenWeatherSearch(query);
  const filtered = normalized.length === 0
    ? DATA
    : DATA.filter(c => c.cityName.toLowerCase().includes(normalized));

  return (
    <div className='flex items-center flex-col gap-2 p-8'>
      {normalized.length === 0 && (
        <>
          {filtered.map((city) => (
            <CityListItem key={city.id} {...city} /> 
          ))}
        </>
      )}

      {normalized.length > 0 && (
        <>
          {loading && <div className="text-muted dark:text-muted-dark p-8">Loading…</div>}
          {error && <div className="text-danger p-8">{error}</div>}
          {!loading && !error && results.map((city) => (
            <CityListItem key={city.id} {...city} />
          ))}
          {!loading && !error && results.length === 0 && (
            <div className="text-muted dark:text-muted-dark p-8">No cities found for "{query}"</div>
          )}
        </>
      )}
    </div>
  );
};