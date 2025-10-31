// src/pages/WeatherDetails.tsx

import { useParams, Link } from 'react-router-dom';
import { DATA } from '../mockData';
import { StatCard } from '../components/StatCard';
import { HourlyForecast } from '../components/HourlyForecast';
import { SevenDayForecast } from '../components/SevenDayForecast';

export const WeatherDetails = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const cityData = DATA.find(city => city.id === cityId);

  if (!cityData) {
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
  
  return (
    <div className="flex flex-col max-w-[960px] flex-1 w-full">
      
      <div className="flex flex-wrap gap-2 p-4">
        <Link className="text-gray-400 dark:text-gray-500 text-base font-medium leading-normal" to="/">Home</Link>
        <span className="text-gray-400 dark:text-gray-500 text-base font-medium leading-normal">/</span>
        <span className="text-white text-base font-medium leading-normal">{cityData.cityName}</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 pt-6 pb-3">
        <div>
          <h1 className="text-white tracking-light text-[32px] font-bold leading-tight">{cityData.cityName}, {cityData.countryCode}</h1>
          <p className="text-gray-400 dark:text-gray-500 text-sm font-normal leading-normal pt-1">Sunday, 10:00 AM</p>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <span className="text-6xl text-primary">{cityData.icon}</span>
          <div>
            <h1 className="text-white tracking-light text-[48px] font-bold leading-tight ml-4">{cityData.temperature}°C</h1>
            <p className="text-gray-400 dark:text-gray-500 text-sm font-normal leading-normal ml-4">Feels like {details.feelsLike}°C</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4">
        <StatCard iconName="air" title="Wind" value={details.wind} />
        <StatCard iconName="humidity_mid" title="Humidity" value={details.humidity} />
        <StatCard iconName="wb_sunny" title="UV Index" value={details.uvIndex} />
        <StatCard iconName="compress" title="Pressure" value={details.pressure} />
        <StatCard iconName="visibility" title="Visibility" value={details.visibility} />
        <StatCard iconName="schedule" title="Sunrise" value={details.sunrise} />
      </div>
      <HourlyForecast data={cityData.hourlyForecast} />
      <SevenDayForecast data={cityData.sevenDayForecast} />
    </div>
  );
};