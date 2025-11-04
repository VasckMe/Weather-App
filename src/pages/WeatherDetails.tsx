// src/pages/WeatherDetails.tsx

import { useParams, Link } from 'react-router-dom';
import { DATA } from '../mockData';
import { getCurrentWeatherById, iconCodeToMaterialSymbol, getOneCall, getForecast5 } from '../services/openWeather';
import { useEffect, useState } from 'react';
import { StatCard } from '../components/StatCard';
import { HourlyForecast } from '../components/HourlyForecast';
import { SevenDayForecast } from '../components/SevenDayForecast';
import { useFavorites } from '../contexts/FavoritesContext'; // <-- 1. Import hooka

export const WeatherDetails = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const numericId = cityId && /^\d+$/.test(cityId) ? Number(cityId) : null;
  const [apiData, setApiData] = useState<any | null>(null);
  const [hourly, setHourly] = useState<Array<{ time: string; iconName: string; temp: string; isNow?: boolean }>>([]);
  const [daily, setDaily] = useState<Array<{ day: string; iconName: string; description: string; temps: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!numericId) return;
      setLoading(true); setError(null);
      try {
        const w = await getCurrentWeatherById(numericId, 'metric');
        if (!cancelled) setApiData(w);
        const lat = w?.coord?.lat; const lon = w?.coord?.lon;
        if (lat != null && lon != null) {
          let oc: any = null;
          try {
            oc = await getOneCall(lat, lon, 'metric');
          } catch (e) {
            oc = null;
          }

          let mappedHourly: Array<{ time: string; iconName: string; temp: string; isNow?: boolean }> = [];
          let mappedDaily: Array<{ day: string; iconName: string; description: string; temps: string }> = [];

          if (oc && (oc.hourly?.length || oc.daily?.length)) {
            const now = Date.now() / 1000;
            mappedHourly = (oc.hourly ?? []).slice(0, 12).map((h: any, idx: number) => {
              const date = new Date(h.dt * 1000);
              const hh = String(date.getHours()).padStart(2, '0');
              const mm = String(date.getMinutes()).padStart(2, '0');
              return {
                time: idx === 0 ? 'Now' : `${hh}:${mm}`,
                iconName: iconCodeToMaterialSymbol(h.weather?.[0]?.icon ?? '01d'),
                temp: `${Math.round(h.temp)}°C`,
                isNow: idx === 0 || Math.abs(h.dt - now) < 1800,
              };
            });
            mappedDaily = (oc.daily ?? []).slice(0, 7).map((d: any) => {
              const date = new Date(d.dt * 1000);
              const day = date.toLocaleDateString(undefined, { weekday: 'long' });
              const max = Math.round(d.temp?.max ?? 0);
              const min = Math.round(d.temp?.min ?? 0);
              return {
                day,
                iconName: iconCodeToMaterialSymbol(d.weather?.[0]?.icon ?? '01d'),
                description: d.weather?.[0]?.main ?? '',
                temps: `${max}° / ${min}°`,
              };
            });
          }

          if (mappedHourly.length === 0 || mappedDaily.length === 0) {
            const fc = await getForecast5(lat, lon, 'metric');
            if (mappedHourly.length === 0) {
              mappedHourly = fc.list.slice(0, 8).map((it, idx) => {
                const date = new Date(it.dt * 1000);
                const hh = String(date.getHours()).padStart(2, '0');
                const mm = String(date.getMinutes()).padStart(2, '0');
                return {
                  time: idx === 0 ? 'Now' : `${hh}:${mm}`,
                  iconName: iconCodeToMaterialSymbol(it.weather?.[0]?.icon ?? '01d'),
                  temp: `${Math.round(it.main.temp)}°C`,
                  isNow: idx === 0,
                };
              });
            }
            if (mappedDaily.length === 0) {
              const byDay = new Map<string, { max: number; min: number; icon: string; main: string }>();
              fc.list.forEach(it => {
                const date = new Date(it.dt * 1000);
                const day = date.toLocaleDateString(undefined, { weekday: 'long' });
                const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
                const entry = byDay.get(key) || { max: -Infinity, min: Infinity, icon: it.weather?.[0]?.icon ?? '01d', main: it.weather?.[0]?.main ?? '' };
                entry.max = Math.max(entry.max, Math.round(it.main.temp_max));
                entry.min = Math.min(entry.min, Math.round(it.main.temp_min));
                entry.icon = it.weather?.[0]?.icon ?? entry.icon;
                entry.main = it.weather?.[0]?.main ?? entry.main;
                byDay.set(key, entry);
              });
              mappedDaily = Array.from(byDay.entries()).slice(0, 7).map(([key, v]) => ({
                day: new Date(key).toLocaleDateString(undefined, { weekday: 'long' }),
                iconName: iconCodeToMaterialSymbol(v.icon),
                description: v.main,
                temps: `${v.max}° / ${v.min}°`,
              }));
            }
          }
          if (!cancelled) { setHourly(mappedHourly); setDaily(mappedDaily); }
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? 'Failed to load');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, [numericId]);

  const cityData = !numericId ? DATA.find(city => city.id === cityId) : null;
  const { toggleFavorite, isFavorite } = useFavorites();

  if (!numericId && !cityData) {
    return (
      <div className="text-white text-center p-8">
        <p>Nie znaleziono danych dla miasta.</p>
        <Link to="/" className="text-primary hover:underline mt-4 inline-block">
          Wróć do listy
        </Link>
      </div>
    );
  }

  const isFav = isFavorite(cityId!);

  return (
    <div className="flex flex-col max-w-[960px] flex-1 w-full">
      <div className="flex flex-wrap gap-2 p-4">
        <Link className="text-gray-400 dark:text-gray-500 text-base font-medium leading-normal" to="/">Home</Link>
        <span className="text-gray-400 dark:text-gray-500 text-base font-medium leading-normal">/</span>
        <span className="text-white text-base font-medium leading-normal">{numericId ? apiData?.name ?? 'City' : cityData.cityName}</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 pt-6 pb-3">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-white tracking-light text-[32px] font-bold leading-tight">{numericId ? `${apiData?.name ?? ''}, ${apiData?.sys?.country ?? ''}` : `${cityData.cityName}, ${cityData.countryCode}`}</h1>
            <button
              onClick={() => toggleFavorite(cityId!)}
              title={isFav ? "Remove from favorites" : "Add to favorites"}
              className={`flex items-center justify-center size-10 rounded-full hover:bg-black/20 ${isFav ? 'text-accent' : 'text-[#9db0b9]'}`}
            >
              <span className="material-symbols-outlined">
                {isFav ? 'star' : 'star_outline'}
              </span>
            </button>
          </div>
          <p className="text-gray-400 dark:text-gray-500 text-sm font-normal leading-normal pt-1">Sunday, 10:00 AM</p>
        </div>

        <div className="flex items-center mt-4 md:mt-0">
          {numericId ? (
            <>
              <span className="material-symbols-outlined text-6xl text-primary">{iconCodeToMaterialSymbol(apiData?.weather?.[0]?.icon ?? '01d')}</span>
              <div>
                <h1 className="text-white tracking-light text-[48px] font-bold leading-tight ml-4">{Math.round(apiData?.main?.temp ?? 0)}°C</h1>
                <p className="text-gray-400 dark:text-gray-500 text-sm font-normal leading-normal ml-4">Feels like {Math.round(apiData?.main?.feels_like ?? 0)}°C</p>
              </div>
            </>
          ) : (
            <>
              <span className="text-6xl text-primary">{cityData.icon}</span>
              <div>
                <h1 className="text-white tracking-light text-[48px] font-bold leading-tight ml-4">{cityData.temperature}°C</h1>
                <p className="text-gray-400 dark:text-gray-500 text-sm font-normal leading-normal ml-4">Feels like {cityData.details.feelsLike}°C</p>
              </div>
            </>
          )}
        </div>
      </div>

      {!numericId && cityData && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4">
          <StatCard iconName="air" title="Wind" value={cityData.details.wind} />
          <StatCard iconName="humidity_mid" title="Humidity" value={cityData.details.humidity} />
          <StatCard iconName="wb_sunny" title="UV Index" value={cityData.details.uvIndex} />
          <StatCard iconName="compress" title="Pressure" value={cityData.details.pressure} />
          <StatCard iconName="visibility" title="Visibility" value={cityData.details.visibility} />
          <StatCard iconName="schedule" title="Sunrise" value={cityData.details.sunrise} />
        </div>
      )}
      {numericId && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4">
          <StatCard iconName="air" title="Wind" value={`${apiData?.wind?.speed ?? '-'} m/s`} />
          <StatCard iconName="humidity_mid" title="Humidity" value={`${apiData?.main?.humidity ?? '-'}%`} />
          <StatCard iconName="wb_sunny" title="Conditions" value={`${apiData?.weather?.[0]?.main ?? '-'}`} />
          <StatCard iconName="compress" title="Pressure" value={`${apiData?.main?.pressure ?? '-'} hPa`} />
          <StatCard iconName="visibility" title="Visibility" value={`${(apiData?.visibility ?? 0) / 1000} km`} />
          <StatCard iconName="schedule" title="Sunrise" value={`@${apiData?.sys?.sunrise ?? '-'}`} />
        </div>
      )}

      {!numericId && cityData && (
        <>
          <HourlyForecast data={cityData.hourlyForecast} />
          <SevenDayForecast data={cityData.sevenDayForecast} />
        </>
      )}
      {numericId && hourly.length > 0 && (
        <HourlyForecast data={hourly} />
      )}
      {numericId && daily.length > 0 && (
        <SevenDayForecast data={daily} />
      )}
      
    </div>
  );
};