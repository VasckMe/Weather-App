import { useEffect, useMemo, useState } from 'react';
import { searchCities, getCurrentWeatherByCoords, iconCodeToMaterialSymbol } from '../services/openWeather';

export interface SearchWeatherItem {
  id: string; // openweather city id as string
  icon: string; // material symbol name
  cityName: string;
  countryCode: string;
  state?: string;
  temperature: number;
  weatherDescription: string;
}

export function useOpenWeatherSearch(query: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SearchWeatherItem[]>([]);

  const normalized = useMemo(() => query.trim(), [query]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (normalized.length < 2) {
        setResults([]);
        setLoading(false);
        setError(null);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const cities = await searchCities(normalized, 5);
        const weathers = await Promise.all(
          cities.map(async (c) => {
            const w = await getCurrentWeatherByCoords(c.lat, c.lon, 'metric');
            return { geo: c, weather: w };
          })
        );
        if (cancelled) return;
        const mapped: SearchWeatherItem[] = weathers.map(({ geo, weather }) => ({
          id: String(weather.id ?? `${geo.lat},${geo.lon}`),
          icon: iconCodeToMaterialSymbol(weather.weather?.[0]?.icon ?? '01d'),
          cityName: weather.name || geo.name,
          countryCode: (weather.sys?.country || geo.country) ?? '',
          state: geo.state,
          temperature: Math.round(weather.main?.temp ?? 0),
          weatherDescription: weather.weather?.[0]?.description ?? '',
        }));
        // dedupe by id
        const unique = Array.from(new Map(mapped.map(m => [m.id, m])).values());
        setResults(unique);
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message ?? 'Failed to load weather');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, [normalized]);

  return { loading, error, results };
}


