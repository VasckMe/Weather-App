import { useParams, Link } from 'react-router-dom';
import { DATA } from '../mockData';

export const WeatherDetails = () => {
  // Pobieramy parametr 'cityName' z adresu URL
  const { cityName } = useParams<{ cityName: string }>();

  // Znajdujemy dane dla wybranego miasta
  // UWAGA: To znajdzie tylko pierwsze pasujące miasto. 
  // W prawdziwej aplikacji powinieneś używać unikalnego ID.
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
    <div className="flex flex-col items-center justify-center p-8 text-white w-200">
      <div className="w-full bg-[#111618] rounded-lg shadow-md p-6">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{cityData.icon}</span>
          <div>
            <h2 className="text-3xl font-bold">{cityData.cityName}</h2>
            <p className="text-[#9db0b9]">{cityData.countryCode}</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-6xl font-thin">{cityData.temperature}°C</p>
          <p className="text-xl text-[#9db0b9] capitalize mt-2">{cityData.weatherDescription}</p>
        </div>
        
        <Link 
          to="/" 
          className="mt-8 inline-block w-full text-center rounded-lg px-4 py-2 bg-primary text-white text-sm font-bold hover:bg-primary/90"
        >
          Wróć do listy
        </Link>
      </div>
    </div>
  );
};