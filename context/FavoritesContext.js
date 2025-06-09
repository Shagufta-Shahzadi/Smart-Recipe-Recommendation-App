import React, { createContext, useState } from 'react';

// Create a context for favorites
export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Add a recipe to favorites
  const addFavorite = (recipe) => {
    setFavorites((prev) => [...prev, recipe]);
  };

  // Remove a recipe from favorites
  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((recipe) => recipe.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};