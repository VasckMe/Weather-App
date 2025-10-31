import { CityListItem } from './CityListItem';
import { DATA } from '../mockData';

export const WeatherList = () => {
  return (
    <div className='flex items-center flex-col gap-2 p-8'>
      {DATA.map((city) => (
        <CityListItem key={city.id} {...city} /> 
      ))}
    </div>
  );
};