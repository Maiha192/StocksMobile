// WatchListProvider.js
import React, { createContext, useState } from "react";

export const WatchListContext = createContext({
  watchList: [],
  addToWatchList: () => {},
  setWatchList: () => {}, // Ensure you're providing a setter function
});

export const WatchListProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([]);

  const addToWatchList = (symbol) => {
    setWatchList((prevWatchList) => {
      if (!prevWatchList.includes(symbol)) {
        const newWatchList = [...prevWatchList, symbol].sort();
        return newWatchList;
      }
      return prevWatchList;
    });
  };

  return (
    <WatchListContext.Provider
      value={{ watchList, addToWatchList, setWatchList }}
    >
      {children}
    </WatchListContext.Provider>
  );
};
