// src/components/FavoriteCityCard.tsx
import type { CityWeather } from '../mockData';
import { useFavorites } from '../contexts/FavoritesContext';

interface FavoriteCityCardProps {
  city: CityWeather;
}

export const FavoriteCityCard = ({ city }: FavoriteCityCardProps) => {
  const { toggleFavorite } = useFavorites();

  return (
    <div className="flex flex-col gap-4 bg-card-light dark:bg-card-dark p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-4">
        <div className="text-accent flex items-center justify-center rounded-full bg-accent/20 shrink-0 size-12">
          {/* Używamy iconName z mockData */}
          <span className="material-symbols-outlined text-3xl">
            {city.iconName}
          </span>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xl font-bold leading-normal">{city.cityName}</p>
          <p className="text-sm font-normal leading-normal text-gray-500 dark:text-gray-400">
            {city.temperature}°C, {city.weatherDescription}
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <button 
          onClick={() => toggleFavorite(city.id)}
          className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-700 dark:hover:text-red-400"
        >
          <span className="material-symbols-outlined text-xl">
            delete
          </span>
          Remove
        </button>
      </div>
    </div>
  );
};