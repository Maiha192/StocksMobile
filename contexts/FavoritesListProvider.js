// Import necessary dependencies
import React, { createContext, useState } from "react";

// Create context for favorites list
export const FavoritesListContext = createContext({
  favoritesList: [],
  addToFavoritesList: () => {},
  setFavoritesList: () => {},
});

// Create context provider
export const FavoritesListProvider = ({ children }) => {
  const [favoritesList, setFavoritesList] = useState([]);

  // Add new stock to favorites list and maintain alphabetical order
  const addToFavoritesList = (symbol) => {
    setFavoritesList((oldFavoritesList) => {
      if (!oldFavoritesList.includes(symbol)) {
        const newFavoritesList = [...oldFavoritesList, symbol].sort();
        return newFavoritesList;
      }
      return oldFavoritesList;
    });
  };

  return (
    <FavoritesListContext.Provider
      value={{ favoritesList, addToFavoritesList, setFavoritesList }}
    >
      {children}
    </FavoritesListContext.Provider>
  );
};
