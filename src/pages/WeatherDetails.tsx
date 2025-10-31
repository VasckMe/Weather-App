// src/pages/WeatherDetails.tsx

import { useParams, Link } from 'react-router-dom';
import { DATA } from '../mockData';
import { StatCard } from '../components/StatCard';
import { HourlyForecast } from '../components/HourlyForecast';
import { SevenDayForecast } from '../components/SevenDayForecast';
import { useFavorites } from '../contexts/FavoritesContext'; // <-- 1. Import hooka

export const WeatherDetails = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const cityData = DATA.find(city => city.id === cityId);

  // <-- 2. Pobierz funkcje z kontekstu
  const { toggleFavorite, isFavorite } = useFavorites();

  if (!cityData) {
    // ... (bez zmian)
    return (
      <div className="text-white text-center p-8">
        <p>Nie znaleziono danych dla miasta.</p>
        <Link to="/" className="text-primary hover:underline mt-4 inline-block">
          Wróć do listy
        </Link>
      </div>
    );
  }

  const { details } = cityData;
  const isFav = isFavorite(cityData.id); // <-- 3. Sprawdź status ulubionych

  return (
    <div className="flex flex-col max-w-[960px] flex-1 w-full">
      
      {/* Breadcrumbs */}
      <div className="flex flex-wrap gap-2 p-4">
        {/* ... (bez zmian) ... */}
        <Link className="text-gray-400 dark:text-gray-500 text-base font-medium leading-normal" to="/">Home</Link>
        <span className="text-gray-400 dark:text-gray-500 text-base font-medium leading-normal">/</span>
        <span className="text-white text-base font-medium leading-normal">{cityData.cityName}</span>
      </div>

      {/* Główne informacje */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 pt-6 pb-3">
        <div>
          {/* --- 4. DODANY PRZYCISK GWIAZDKI --- */}
          <div className="flex items-center gap-4">
            <h1 className="text-white tracking-light text-[32px] font-bold leading-tight">{cityData.cityName}, {cityData.countryCode}</h1>
            <button
              onClick={() => toggleFavorite(cityData.id)}
              title={isFav ? "Remove from favorites" : "Add to favorites"}
              className={`flex items-center justify-center size-10 rounded-full hover:bg-black/20 ${isFav ? 'text-accent' : 'text-[#9db0b9]'}`}
            >
              <span className="material-symbols-outlined">
                {isFav ? 'star' : 'star_outline'}
              </span>
            </button>
          </div>
          {/* ---------------------------------- */}
          <p className="text-gray-400 dark:text-gray-500 text-sm font-normal leading-normal pt-1">Sunday, 10:00 AM</p>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          {/* ... (reszta bez zmian) ... */}
          <span className="text-6xl text-primary">{cityData.icon}</span>
          <div>
            <h1 className="text-white tracking-light text-[48px] font-bold leading-tight ml-4">{cityData.temperature}°C</h1>
            <p className="text-gray-400 dark:text-gray-500 text-sm font-normal leading-normal ml-4">Feels like {details.feelsLike}°C</p>
          </div>
        </div>
      </div>

      {/* Siatka ze statystykami */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4">
        {/* ... (bez zmian) ... */}
        <StatCard iconName="air" title="Wind" value={details.wind} />
        <StatCard iconName="humidity_mid" title="Humidity" value={details.humidity} />
        <StatCard iconName="wb_sunny" title="UV Index" value={details.uvIndex} />
        <StatCard iconName="compress" title="Pressure" value={details.pressure} />
        <StatCard iconName="visibility" title="Visibility" value={details.visibility} />
        <StatCard iconName="schedule" title="Sunrise" value={details.sunrise} />
      </div>

      {/* Prognoza godzinowa */}
      <HourlyForecast data={cityData.hourlyForecast} />

      {/* Prognoza 7-dniowa */}
      <SevenDayForecast data={cityData.sevenDayForecast} />

      {/* Mapa */}
      <div className="flex w-full grow bg-background-light dark:bg-background-dark @container p-4">
        {/* ... (bez zmian) ... */}
        <div className="w-full gap-1 overflow-hidden bg-background-light dark:bg-background-dark @[480px]:gap-2 aspect-[2/1] rounded-lg flex">
          <div 
            className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-lg flex-1" 
            data-alt={`A map showing the location of ${cityData.cityName}`}
            data-location={cityData.cityName}
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBWIFlaJNJsw7QmnlL1R5bsyLvMkuWyE9WCaZVMrTYoopOWM_CZ1_h37aaF_Ls_nuYQnNW3VeoHDGzshZUnIFx9kCmOaoZvtnu3D1NNKhxWUOLFHuRBemUeUuJli1vhIbg4M4UxZlZjOFBsHOk-P4FftYYFlvODKwLdb4eu5KFfuRMut5M7onowrDz8O7ZsYb19Q6ezqOxdFPWQyKyRMXGbSYGqaL9Z0pO6bEFYK4h-4dV2VqF6VDj42qVLZCcYvBSgUe301K8k35Y")' }}
          ></div>
        </div>
      </div>

    </div>
  );
};