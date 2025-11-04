const API_KEY = '324e40908da99494106b2dc0fbe82253';
const GEO_BASE = 'https://api.openweathermap.org/geo/1.0';
const DATA_BASE = 'https://api.openweathermap.org/data/2.5';
const ONECALL_BASE = 'https://api.openweathermap.org/data/3.0/onecall';
const ONECALL_BASE_V25 = 'https://api.openweathermap.org/data/2.5/onecall';

export interface GeoCity {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export interface CurrentWeather {
  id: number;
  name: string;
  sys: { country: string };
  weather: Array<{ id: number; main: string; description: string; icon: string }>;
  main: { temp: number; feels_like: number };
}

export async function searchCities(query: string, limit = 5): Promise<GeoCity[]> {
  const url = `${GEO_BASE}/direct?q=${encodeURIComponent(query)}&limit=${limit}&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`OpenWeather search failed: ${res.status}`);
  return res.json();
}

export async function getCurrentWeatherByCoords(lat: number, lon: number, units: 'metric' | 'imperial' = 'metric'): Promise<CurrentWeather> {
  const url = `${DATA_BASE}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`OpenWeather weather failed: ${res.status}`);
  return res.json();
}

export async function getCurrentWeatherById(cityId: number, units: 'metric' | 'imperial' = 'metric'): Promise<CurrentWeather> {
  const url = `${DATA_BASE}/weather?id=${cityId}&units=${units}&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`OpenWeather weather by id failed: ${res.status}`);
  return res.json();
}

export function iconCodeToMaterialSymbol(icon: string): string {
  // Prosta mapowanie po prefiksie dnia/nocy i typie pogody
  const code = icon.slice(0, 2);
  switch (code) {
    case '01': return 'wb_sunny';
    case '02':
    case '03':
    case '04': return 'cloud';
    case '09':
    case '10': return 'rainy';
    case '11': return 'thunderstorm';
    case '13': return 'ac_unit';
    case '50': return 'foggy';
    default: return 'wb_sunny';
  }
}

export interface OneCallResponse {
  lat: number;
  lon: number;
  timezone: string;
  hourly?: Array<{ dt: number; temp: number; weather: Array<{ icon: string; main: string; description: string }> }>;
  daily?: Array<{ dt: number; temp: { min: number; max: number }; weather: Array<{ icon: string; main: string; description: string }> }>;
}

export async function getOneCall(lat: number, lon: number, units: 'metric' | 'imperial' = 'metric'): Promise<OneCallResponse> {
  // Try One Call 3.0 first; if not available on plan, fallback to 2.5
  const url30 = `${ONECALL_BASE}?lat=${lat}&lon=${lon}&units=${units}&exclude=minutely,alerts&appid=${API_KEY}`;
  let res = await fetch(url30);
  if (res.ok) return res.json();
  const url25 = `${ONECALL_BASE_V25}?lat=${lat}&lon=${lon}&units=${units}&exclude=minutely,alerts&appid=${API_KEY}`;
  res = await fetch(url25);
  if (!res.ok) throw new Error(`OpenWeather onecall failed: ${res.status}`);
  return res.json();
}

export interface Forecast5Response {
  list: Array<{
    dt: number;
    main: { temp: number; temp_min: number; temp_max: number; humidity: number; pressure: number };
    weather: Array<{ icon: string; main: string; description: string }>;
    wind: { speed: number };
    visibility?: number;
  }>;
  city: { name: string; country: string; timezone?: number };
}

export async function getForecast5(lat: number, lon: number, units: 'metric' | 'imperial' = 'metric'): Promise<Forecast5Response> {
  const url = `${DATA_BASE}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`OpenWeather forecast failed: ${res.status}`);
  return res.json();
}


