// src/components/CityListItem.tsx
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext'; // <-- 1. Import hooka

interface CityListItemProps {
    id: string;
    icon: string;
    cityName: string;
    countryCode: string;
    temperature: number;
    weatherDescription: string;
}

export const CityListItem = ({ id, icon, cityName, temperature } : CityListItemProps) => {
    // <-- 2. Pobierz funkcje z kontekstu
    const { toggleFavorite, isFavorite } = useFavorites();
    const isFav = isFavorite(id);

    return (
        <div className="w-200 h-fit rounded-lg flex justify-between p-2 items-center shadow-md bg-[#111618] shadow-sm">
            
            {/* --- 3. DODANY PRZYCISK GWIAZDKI --- */}
            <button 
              onClick={(e) => {
                e.stopPropagation(); // Zapobiega kliknięciu na cały element
                toggleFavorite(id);
              }}
              title={isFav ? "Remove from favorites" : "Add to favorites"}
              className={`flex items-center justify-center size-10 rounded-lg hover:bg-[#283339] ${isFav ? 'text-accent' : 'text-[#9db0b9]'}`}
            >
              <span className="material-symbols-outlined">
                {isFav ? 'star' : 'star_outline'}
              </span>
            </button>
            {/* ------------------------------------ */}

            <div className="flex items-center gap-4 flex-1"> {/* Dodano flex-1 */}
                <div className="flex items-center justify-center rounded-lg bg-background-light dark:bg-[#283339] size-12">
                    <span>{icon}</span>
                </div>
                <div className="flex flex-col justify-center">
                    <span className="text-white">{cityName}</span>
                    <span className="text-[#9db0b9]">{temperature}°C</span>
                </div>
            </div>
            <div>
                <Link 
                    to={`/details/${id}`} 
                    className="flex items-center justify-center rounded-lg px-4 py-2 bg-[#283339] text-white text-sm hover:bg-gray-700" 
                >
                    View details
                </Link>
            </div>
        </div>
    )
}