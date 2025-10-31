// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { WeatherList } from './components/WeatherList';
import { WeatherDetails } from './pages/WeatherDetails';
import { MainLayout } from './components/MainLayout'; // <-- 1. Import
import { FavoriteCities } from './pages/FavoriteCities'; // <-- 2. Import

function App() {
  return (
    <Routes>
      {/* Trasy używające głównego layoutu */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<WeatherList />} />
        <Route path="details/:cityId" element={<WeatherDetails />} />
      </Route>
      
      {/* Trasa dla ulubionych (ma własny layout) */}
      <Route path="/favorites" element={<FavoriteCities />} />
    </Routes>
  )
}

export default App