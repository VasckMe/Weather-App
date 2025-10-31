export interface CityWeather {
    id: string;
    icon: string;
    iconName: string;
    cityName: string;
    countryCode: string;
    temperature: number;
    weatherDescription: string;
    details: {
      feelsLike: number;
      wind: string;
      humidity: string;
      uvIndex: string;
      pressure: string;
      visibility: string;
      sunrise: string;
    };
    hourlyForecast: {
      time: string;
      iconName: string;
      temp: string;
      isNow?: boolean;
    }[];
    sevenDayForecast: {
      day: string;
      iconName: string;
      description: string;
      temps: string;
    }[];
  }
  
  export const DATA: CityWeather[] = [
    {
      id: 'paris-fr',
      icon: '☀️',
      iconName: 'sunny',
      cityName: "Paris",
      countryCode: "FR",
      temperature: 18,
      weatherDescription: "Sunny",
      details: {
        feelsLike: 17,
        wind: "12 km/h",
        humidity: "65%",
        uvIndex: "3",
        pressure: "1012 hPa",
        visibility: "10 km",
        sunrise: "6:05 AM",
      },
      hourlyForecast: [
        { time: '11:00', iconName: 'partly_cloudy_day', temp: '19°C' },
        { time: '12:00', iconName: 'wb_sunny', temp: '21°C' },
        { time: 'Now', iconName: 'cloud', temp: '18°C', isNow: true },
        { time: '14:00', iconName: 'rainy', temp: '18°C' },
        { time: '15:00', iconName: 'rainy', temp: '17°C' },
      ],
      sevenDayForecast: [
        { day: 'Monday', iconName: 'wb_sunny', description: 'Clear', temps: '22° / 15°' },
        { day: 'Tuesday', iconName: 'partly_cloudy_day', description: 'Clouds', temps: '20° / 14°' },
        { day: 'Wednesday', iconName: 'rainy', description: 'Rain', temps: '18° / 13°' },
      ]
    },
    {
      id: 'london-gb',
      icon: '☁️',
      iconName: 'cloud',
      cityName: "London",
      countryCode: "GB",
      temperature: 15,
      weatherDescription: "Cloudy",
      details: {
        feelsLike: 14,
        wind: "20 km/h",
        humidity: "82%",
        uvIndex: "1",
        pressure: "1008 hPa",
        visibility: "5 km",
        sunrise: "6:15 AM",
      },
      hourlyForecast: [
        { time: '11:00', iconName: 'cloud', temp: '15°C' },
        { time: '12:00', iconName: 'cloud', temp: '16°C' },
        { time: 'Now', iconName: 'rainy', temp: '15°C', isNow: true },
        { time: '14:00', iconName: 'rainy', temp: '14°C' },
      ],
      sevenDayForecast: [
        { day: 'Monday', iconName: 'rainy', description: 'Rain', temps: '17° / 12°' },
        { day: 'Tuesday', iconName: 'partly_cloudy_day', description: 'Clouds', temps: '18° / 13°' },
        { day: 'Wednesday', iconName: 'wb_sunny', description: 'Clear', temps: '19° / 14°' },
      ]
    },
  ];