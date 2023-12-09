import React, { createContext, useState } from 'react';

export const WatchListContext = createContext({ watchList: [], addToWatchList: () => {} });

export const WatchListProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([]);

  const addToWatchList = (symbol) => {
    if (!watchList.includes(symbol)) {
      setWatchList([...watchList, symbol]);
    }
  };

  return (
    <WatchListContext.Provider value={{ watchList, addToWatchList }}>
      {children}
    </WatchListContext.Provider>
  );
};