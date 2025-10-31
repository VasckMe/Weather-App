import { HourlyForecastItem } from './HourlyForecastItem';
import type { CityWeather } from '../mockData';

interface HourlyForecastProps {
  data: CityWeather['hourlyForecast'];
}

export const HourlyForecast = ({ data }: HourlyForecastProps) => {
  return (
    <div className="px-4 py-6">
      <h2 className="text-white text-xl font-bold mb-4">Hourly Forecast</h2>
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {data.map((item) => (
          <HourlyForecastItem
            key={item.time}
            time={item.time}
            iconName={item.iconName}
            temp={item.temp}
            isNow={item.isNow}
          />
        ))}
      </div>
    </div>
  );
};