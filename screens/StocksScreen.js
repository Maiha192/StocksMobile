import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { WatchListContext } from "../contexts/WatchListProvider";
import { getData } from "../api/api";

export default function StocksScreen() {
  const { watchList } = useContext(WatchListContext);
  const [stockData, setStockData] = useState({});

  useEffect(() => {
    const fetchStockData = async () => {
      let data = {};
      for (let symbol of watchList) {
        const stockHistory = await getData(
          `https://aij1hx90oj.execute-api.ap-southeast-2.amazonaws.com/prod/history?symbol=${symbol}`
        );
        data[symbol] = stockHistory[0]; 
      }
      setStockData(data);
    };

    fetchStockData();
  }, [watchList]);

  return (
    <View>
      {watchList.map((symbol) => (
        <View key={symbol}>
          <Text>
            {symbol} - Close: {stockData[symbol]?.close} - Gain/Loss:
          </Text>
        </View>
      ))}
    </View>
  );
}