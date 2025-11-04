// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { FavoritesProvider } from './contexts/FavoritesContext'
import { SearchProvider } from './contexts/SearchContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </FavoritesProvider>
    </BrowserRouter>
  </StrictMode>,
)