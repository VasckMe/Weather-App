import { SevenDayForecastItem } from './SevenDayForecastItem';
import type { CityWeather } from '../mockData';

interface SevenDayForecastProps {
  data: CityWeather['sevenDayForecast'];
}

export const SevenDayForecast = ({ data }: SevenDayForecastProps) => {
  return (
    <div className="px-4 py-6">
      <h2 className="text-white text-xl font-bold mb-4">7-Day Forecast</h2>
      <div className="space-y-2">
        {data.map((item) => (
          <SevenDayForecastItem
            key={item.day}
            day={item.day}
            iconName={item.iconName}
            description={item.description}
            temps={item.temps}
          />
        ))}
      </div>
    </div>
  );
};