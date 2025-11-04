import { Outlet, Link } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen"> 
      <header className="w-300 flex items-center justify-between border-b border-solid border-b-surface-dark px-4 py-3 bg-seachBarBg rounded-lg">
        <div className="flex items-center gap-4 text-text-light dark:text-text-dark">
          <span className="text-primary material-symbols-outlined">thermostat</span>
          <h2 className="text-text-light dark:text-text-dark text-xl font-bold">WeatherNow</h2>
        </div>

        <div className="flex justify-end items-center gap-4">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
            <div className="text-muted dark:text-muted-dark flex bg-background-light dark:bg-surface-dark items-center justify-center pl-4 rounded-l-lg border-r-0">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input className="form-input flex rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-0 border-none bg-background-light dark:bg-surface-dark focus:border-none h-full placeholder:text-muted dark:placeholder:text-muted-dark px-4 rounded-l-none  pl-2" placeholder="Search for a city..." />
          </div>
          
          <button className="flex items-center justify-center rounded-lg px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90">
            Add City
          </button>

          <Link 
            to="/favorites"
            className="flex items-center justify-center rounded-lg size-10 text-background-light bg-background-light dark:bg-surface-dark"
            title="Favorite Cities"
          >
            <span className="text-accent material-symbols-outlined">star</span>
          </Link>
        </div>
      </header>

      {/* Main skopiowany z App.tsx - Outlet renderuje pod-trasy (WeatherList, WeatherDetails) */}
      <main className="flex-grow w-full flex justify-center">
        <Outlet />
      </main>

      <footer className="w-full flex flex-col gap-6 px-5 py-10 text-center">
        <div className="flex items-center justify-center gap-6">
          <a className="text-muted dark:text-muted-dark min-w-40 hover:text-primary dark:hover:text-primary" href="#">About</a>
          <a className="text-muted dark:text-muted-dark min-w-40 hover:text-primary dark:hover:text-primary" href="#">Contact</a>
        </div>
        <p className="text-muted dark:text-muted-dark text-base font-normal leading-normal">© 2024 WeatherNow</p>
      </footer>
    </div>
  );
};