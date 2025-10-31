import { Routes, Route } from 'react-router-dom';
import { WeatherList } from './components/WeatherList';
import { WeatherDetails } from './pages/WeatherDetails';

function App() {
  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen">
      <header className="w-300 flex items-center justify-between border-b border-solid border-b-[#283339] px-4 py-3 bg-[#111618] rounded-lg">
        <div className="flex items-center gap-4 text-white">
          <div className="size-8 text-primary">
            <span className="material-symbols-outlined">thermostat</span>
          </div>
          <h2 className="text-white text-xl font-bold">WeatherNow</h2>
        </div>
        <div className="flex justify-end items-center gap-4">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
            <div className="text-[#9db0b9] flex bg-[#283339] items-center justify-center pl-4 rounded-l-lg border-r-0">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input className="form-input flex rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-background-light bg-[#283339] focus:border-none h-full placeholder:text-[#9db0b9] px-4 rounded-l-none  pl-2" placeholder="Search for a city..." />
          </div>
          <button className="flex items-center justify-center rounded-lg px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90">
            Add City
          </button>
        </div>
      </header>

      <main className="flex-grow w-full flex justify-center">
        <Routes>
          <Route path="/" element={<WeatherList />} />
          <Route path="/details/:cityId" element={<WeatherDetails />} />
        </Routes>
      </main>
      <footer className="w-full flex flex-col gap-6 px-5 py-10 text-center @container mt-auto">
        <div className="flex items-center justify-center gap-6">
          <a className="text-[#9db0b9] leading-normal min-w-40 hover:text-primary dark:hover:text-primary" href="#">About</a>
          <a className="text-[#9db0b9] leading-normal min-w-40 hover:text-primary dark:hover:text-primary" href="#">Contact</a>
        </div>
        <p className="text-gray-500 dark:text-[#9db0b9] text-base font-normal leading-normal">© 2024 WeatherNow</p>
      </footer>
    </div>
  )
}

export default App