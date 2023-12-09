import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { WatchListContext } from '../contexts/WatchListProvider';
import { getData } from '../api/api';

export default function StocksScreen({ navigation }) {
  const { watchList } = useContext(WatchListContext);
  const [stockData, setStockData] = useState({});
  const [selectedStock, setSelectedStock] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      let data = {};
      for (let symbol of watchList) {
        try {
          const stockHistory = await getData(
            `https://aij1hx90oj.execute-api.ap-southeast-2.amazonaws.com/prod/history?symbol=${symbol}`
          );
          data[symbol] = stockHistory[0]; // Assuming the most recent data is at index 0
        } catch (error) {
          console.error('Error fetching stock history:', error);
        }
      }
      setStockData(data);
    };

    fetchStockData();
  }, [watchList]);

  const handleSelectStock = (symbol) => {
    setSelectedStock(stockData[symbol]);
  };

  const renderStockItem = (symbol) => {
    const stock = stockData[symbol];
    // Ensure stock is defined before trying to access its properties
    if (!stock) {
      return null; // or some placeholder content
    }
    const percentageChange = ((stock.close - stock.open) / stock.open * 100).toFixed(2);
    const changeColor = percentageChange >= 0 ? '#4CAF50' : '#F44336';
  
    return (
      <TouchableOpacity key={symbol} style={styles.stockItem} onPress={() => handleSelectStock(symbol)}>
        <Text style={styles.stockSymbol}>{symbol}</Text>
        <Text style={styles.stockPrice}>{stock.close}</Text>
        <Text style={[styles.stockChange, { color: changeColor }]}>{percentageChange}%</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {watchList.map(renderStockItem)}
      </ScrollView>
      {selectedStock && (
        <View style={styles.detailView}>
          <Text>Open: {selectedStock.open}</Text>
          <Text>Close: {selectedStock.close}</Text>
          <Text>Low: {selectedStock.low}</Text>
          <Text>High: {selectedStock.high}</Text>
          <Text>Volume: {selectedStock.volumes}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  stockItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  stockSymbol: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  stockPrice: {
    fontSize: 16,
  },
  stockChange: {
    fontSize: 16,
  },
  detailView: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
});
