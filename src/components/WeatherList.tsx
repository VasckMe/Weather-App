import { CityListItem } from './CityListItem';
import { DATA } from '../mockData';

export const WeatherList = () => {
  return (
    <div className='flex items-center flex-col gap-2 p-8'>
      {DATA.map((city, index) => (
        // Używamy index jako key, bo dane nie mają unikalnego ID.
        // W prawdziwej aplikacji użyj ID (np. city.id)
        <CityListItem key={index} {...city} /> 
      ))}
    </div>
  );
};