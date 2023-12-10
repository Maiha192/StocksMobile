import React, { createContext, useState } from "react";

export const FavoritesListContext = createContext({
  favoritesList: [],
  addToFavoritesList: () => {},
  setFavoritesList: () => {}, // Ensure you're providing a setter function
});

export const FavoritesListProvider = ({ children }) => {
  const [favoritesList, setFavoritesList] = useState([]);

  const addToFavoritesList = (symbol) => {
    setFavoritesList((prevFavoritesList) => {
      if (!prevFavoritesList.includes(symbol)) {
        const newFavoritesList = [...prevFavoritesList, symbol].sort();
        return newFavoritesList;
      }
      return prevFavoritesList;
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
