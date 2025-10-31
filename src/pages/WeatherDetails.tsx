// src/pages/WeatherDetails.tsx

import { useParams, Link } from 'react-router-dom';
import { DATA } from '../mockData'; 

export const WeatherDetails = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const cityData = DATA.find(city => city.cityName === cityName);

  if (!cityData) {
    return (
      <div className="text-white text-center p-8">
        <p>Nie znaleziono danych dla miasta: {cityName}</p>
        <Link to="/" className="text-primary hover:underline mt-4 inline-block">
          Wróć do listy
        </Link>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col max-w-[960px] flex-1 w-full">
      
      {/* Breadcrumbs */}
      <div className="flex flex-wrap gap-2 p-4">
        <Link className="text-gray-400 dark:text-gray-500 text-base font-medium leading-normal" to="/">Home</Link>
        <span className="text-gray-400 dark:text-gray-500 text-base font-medium leading-normal">/</span>
        <span className="text-white text-base font-medium leading-normal">{cityData.cityName}</span>
      </div>

      {/* Główne informacje */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 pt-6 pb-3">
        <div>
          <h1 className="text-white tracking-light text-[32px] font-bold leading-tight">{cityData.cityName}, {cityData.countryCode}</h1>
          <p className="text-gray-400 dark:text-gray-500 text-sm font-normal leading-normal pt-1">Sunday, 10:00 AM</p>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <span className="text-6xl text-primary">{cityData.icon}</span>
          <div>
            <h1 className="text-white tracking-light text-[48px] font-bold leading-tight ml-4">{cityData.temperature}°C</h1>
            <p className="text-gray-400 dark:text-gray-500 text-sm font-normal leading-normal ml-4">Feels like 17°C</p>
          </div>
        </div>
      </div>

      {/* Siatka ze statystykami */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4">
        <div className="bg-background-dark/50 dark:bg-black/20 p-4 rounded-lg flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-primary mb-2">air</span>
          <p className="text-sm font-medium">Wind</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">12 km/h</p>
        </div>
        <div className="bg-background-dark/50 dark:bg-black/20 p-4 rounded-lg flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-primary mb-2">humidity_mid</span>
          <p className="text-sm font-medium">Humidity</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">65%</p>
        </div>
        <div className="bg-background-dark/50 dark:bg-black/20 p-4 rounded-lg flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-primary mb-2">wb_sunny</span>
          <p className="text-sm font-medium">UV Index</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">3</p>
        </div>
        <div className="bg-background-dark/50 dark:bg-black/20 p-4 rounded-lg flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-primary mb-2">compress</span>
          <p className="text-sm font-medium">Pressure</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">1012 hPa</p>
        </div>
        <div className="bg-background-dark/50 dark:bg-black/20 p-4 rounded-lg flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-primary mb-2">visibility</span>
          <p className="text-sm font-medium">Visibility</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">10 km</p>
        </div>
        <div className="bg-background-dark/50 dark:bg-black/20 p-4 rounded-lg flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-primary mb-2">schedule</span>
          <p className="text-sm font-medium">Sunrise</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">6:05 AM</p>
        </div>
      </div>

      {/* Prognoza godzinowa */}
      <div className="px-4 py-6">
        <h2 className="text-white text-xl font-bold mb-4">Hourly Forecast</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4">
          <div className="flex-shrink-0 w-24 bg-background-dark/50 dark:bg-black/20 p-4 rounded-lg flex flex-col items-center">
            <p className="text-sm">11:00</p>
            <span className="material-symbols-outlined my-2 text-3xl">partly_cloudy_day</span>
            <p className="font-bold">19°C</p>
          </div>
          <div className="flex-shrink-0 w-24 bg-background-dark/50 dark:bg-black/20 p-4 rounded-lg flex flex-col items-center">
            <p className="text-sm">12:00</p>
            <span className="material-symbols-outlined my-2 text-3xl">wb_sunny</span>
            <p className="font-bold">21°C</p>
          </div>
          <div className="flex-shrink-0 w-24 bg-primary/20 text-primary p-4 rounded-lg flex flex-col items-center border border-primary">
            <p className="text-sm font-bold">Now</p>
            <span className="material-symbols-outlined my-2 text-3xl">cloud</span>
            <p className="font-bold">19°C</p>
          </div>
          <div className="flex-shrink-0 w-24 bg-background-dark/50 dark:bg-black/20 p-4 rounded-lg flex flex-col items-center">
            <p className="text-sm">14:00</p>
            <span className="material-symbols-outlined my-2 text-3xl">rainy</span>
            <p className="font-bold">18°C</p>
          </div>
          <div className="flex-shrink-0 w-24 bg-background-dark/50 dark:bg-black/20 p-4 rounded-lg flex flex-col items-center">
            <p className="text-sm">15:00</p>
            <span className="material-symbols-outlined my-2 text-3xl">rainy</span>
            <p className="font-bold">17°C</p>
          </div>
          <div className="flex-shrink-0 w-24 bg-background-dark/50 dark:bg-black/20 p-4 rounded-lg flex flex-col items-center">
            <p className="text-sm">16:00</p>
            <span className="material-symbols-outlined my-2 text-3xl">partly_cloudy_day</span>
            <p className="font-bold">18°C</p>
          </div>
        </div>
      </div>

      {/* Prognoza 7-dniowa */}
      <div className="px-4 py-6">
        <h2 className="text-white text-xl font-bold mb-4">7-Day Forecast</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between bg-background-dark/50 dark:bg-black/20 p-3 rounded-lg">
            <p className="font-medium w-1/4">Monday</p>
            <div className="flex items-center w-1/4">
              <span className="material-symbols-outlined text-primary mr-2">wb_sunny</span>
              <span>Clear</span>
            </div>
            <p className="w-1/4 text-center">22° / 15°</p>
          </div>
          <div className="flex items-center justify-between bg-background-dark/50 dark:bg-black/20 p-3 rounded-lg">
            <p className="font-medium w-1/4">Tuesday</p>
            <div className="flex items-center w-1/4">
              <span className="material-symbols-outlined text-primary mr-2">partly_cloudy_day</span>
              <span>Clouds</span>
            </div>
            <p className="w-1/4 text-center">20° / 14°</p>
          </div>
          <div className="flex items-center justify-between bg-background-dark/50 dark:bg-black/20 p-3 rounded-lg">
            <p className="font-medium w-1/4">Wednesday</p>
            <div className="flex items-center w-1/4">
              <span className="material-symbols-outlined text-primary mr-2">rainy</span>
              <span>Rain</span>
            </div>
            <p className="w-1/4 text-center">18° / 13°</p>
          </div>
        </div>
      </div>

      {/* Mapa */}
      <div className="flex w-full grow bg-background-light dark:bg-background-dark @container p-4">
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