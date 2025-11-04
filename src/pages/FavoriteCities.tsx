import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import { DATA } from '../mockData';
import { FavoriteCityCard } from '../components/FavoriteCityCard';

export const FavoriteCities = () => {
  const { favorites, isFavorite } = useFavorites();  
  const favoriteCities = DATA.filter(city => isFavorite(city.id));

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-dark text-text-dark">
      <div className="layout-container flex h-full grow flex-col">
        
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-700 px-6 md:px-10 py-4">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-[32px] text-primary">
                wb_sunny
            </span>
            <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em]">WeatherApp</h2>
          </div>

          <div className="flex items-center gap-4">
            <Link className="text-sm font-medium leading-normal hover:text-primary" to="/">Back to Main</Link>
            <button className="flex items-center justify-center rounded-full size-10 bg-card-dark">
              <span className="material-symbols-outlined text-text-dark">
                person
              </span>
            </button>
          </div>
        </header>

        <main className="px-6 md:px-10 flex flex-1 justify-center py-8">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 gap-8">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-4xl font-black leading-tight tracking-[-0.033em]">Favorite Cities</p>
                <p className="text-base font-normal leading-normal text-muted">Your handpicked list of cities for quick weather checks.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteCities.length > 0 ? (
                favoriteCities.map(city => (
                  <FavoriteCityCard key={city.id} city={city} />
                ))
              ) : (
                // Empty view
                <div className="col-span-full flex flex-col items-center justify-center text-center gap-4 p-10 bg-card-dark rounded-lg">
                  <span className="material-symbols-outlined text-muted text-6xl">
                    star
                  </span>

                  <h3 className="text-2xl font-bold">You have no favorite cities yet.</h3>
                  <p className="text-muted">Click the star icon on the main screen to add a city to your favorites.</p>
                  <Link 
                    to="/"
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-accent text-background-dark text-sm font-bold leading-normal tracking-[0.015em] mt-4"
                  >
                    <span className="truncate">Go Back</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </main>

        <footer className="w-full border-t border-solid border-border-dark mt-auto">
          <div className="max-w-[960px] mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex gap-4 text-sm">
              <a className="hover:text-primary" href="#">About Us</a>
              <a className="hover:text-primary" href="#">Contact</a>
            </div>
            <p className="text-sm text-muted">© 2024 WeatherApp</p>
          </div>
        </footer>
      </div>
    </div>
  );
};