import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface FavoritesContextType {
  favorites: string[]; // Tablica ID miast
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

// Tworzymy kontekst z domyślną wartością 'undefined'
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Tworzymy Providera
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  // Inicjalizujemy stan z localStorage, jeśli istnieje
  const [favorites, setFavorites] = useState<string[]>(() => {
    const storedFavorites = localStorage.getItem('favoriteCities');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // Efekt do zapisywania w localStorage przy każdej zmianie
  useEffect(() => {
    localStorage.setItem('favoriteCities', JSON.stringify(favorites));
  }, [favorites]);

  // Funkcja do dodawania/usuwania z ulubionych
  const toggleFavorite = (id: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id) // Usuń
        : [...prevFavorites, id] // Dodaj
    );
  };

  // Funkcja pomocnicza do sprawdzania
  const isFavorite = (id: string) => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Tworzymy custom hook, aby łatwiej używać kontekstu
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};