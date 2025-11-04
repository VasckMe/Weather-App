import type { CityWeather } from '../mockData';
import { useFavorites } from '../contexts/FavoritesContext';
import { Link } from 'react-router-dom';

interface FavoriteCityCardProps {
  city: CityWeather;
}

export const FavoriteCityCard = ({ city }: FavoriteCityCardProps) => {
  const { toggleFavorite } = useFavorites();

  return (
    <Link to={`/details/${city.id}`}>
        <div className="flex flex-col gap-4 card-light dark:bg-card-dark p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center gap-4">
            <div className="text-accent flex items-center justify-center rounded-full bg-accent/20 shrink-0 size-12">
            <span className="text-accent material-symbols-outlined text-3xl">{city.iconName}</span>
            </div>

            <div className="flex flex-col justify-center">
            <p className="text-xl text-white font-bold leading-normal">{city.cityName}</p>
            <p className="text-sm font-normal leading-normal text-gray-500 dark:text-gray-400">
                {city.temperature}°C, {city.weatherDescription}
            </p>
            </div>
        </div>

        <div className="flex justify-end">
            <button 
            onClick={() => toggleFavorite(city.id)}
            className="flex items-center gap-2 text-sm font-medium text-danger hover:text-danger-strong dark:hover:text-danger"
            >
            <span className="material-symbols-outlined text-xl">delete</span>
            Remove
            </button>
        </div>
        </div>
    </Link>
  );
};