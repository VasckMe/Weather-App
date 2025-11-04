import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';

interface CityListItemProps {
    id: string;
    icon: string;
    cityName: string;
    countryCode: string;
    state?: string;
    temperature: number;
    weatherDescription: string;
    disableLink?: boolean;
}

export const CityListItem = ({ id, icon, cityName, temperature, state, countryCode, weatherDescription, disableLink } : CityListItemProps) => {
    const { toggleFavorite, isFavorite } = useFavorites();
    const isFav = isFavorite(id);

    return (
        <div className="w-200 h-fit rounded-lg flex justify-between p-2 gap-2 items-center shadow-md bg-seachBarBg shadow-sm">            
            <button 
              onClick={(e) => {
                e.stopPropagation(); // Zapobiega kliknięciu na cały element
                toggleFavorite(id);
              }}
              title={isFav ? "Remove from favorites" : "Add to favorites"}
              className={`flex items-center justify-center size-10 rounded-lg hover:bg-surface-dark ${isFav ? 'text-accent' : 'text-muted-dark'}`}
            >
              <span className="material-symbols-outlined">{'star'}</span>
            </button>

            <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center justify-center rounded-lg bg-background-light dark:bg-surface-dark size-12">
                    {/^[-a-z_]+$/i.test(icon) ? (
                      <span className="material-symbols-outlined text-3xl text-primary">{icon}</span>
                    ) : (
                      <span className="text-[28px]">{icon}</span>
                    )}
                </div>
                <div className="flex flex-col justify-center">
                    <span className="text-white">{cityName}</span>
                    <span className="text-muted dark:text-muted-dark text-xs">{[state, countryCode].filter(Boolean).join(', ')}</span>
                    <span className="text-muted-dark">{temperature}°C{weatherDescription ? `, ${weatherDescription}` : ''}</span>
                </div>
            </div>

            <div>
                {disableLink ? (
                  <div className="flex items-center justify-center rounded-lg px-4 py-2 bg-surface-dark text-white text-sm">
                    View details
                  </div>
                ) : (
                  <Link 
                    to={`/details/${id}`} 
                    className="flex items-center justify-center rounded-lg px-4 py-2 bg-surface-dark text-white text-sm hover:bg-gray-700" 
                  >
                    View details
                  </Link>
                )}
            </div>
        </div>
    )
}