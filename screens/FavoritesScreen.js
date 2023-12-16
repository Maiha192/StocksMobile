//TODO: Store Favorites List in a persistent local storage on the mobile device.
// If user shuts down app and comes back next day, watch list will still be available.

// Import necessary dependencies
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FavoritesListContext } from "../contexts/FavoritesListProvider";
import { getData } from "../api/api";
import { useNavigation } from "@react-navigation/core";

// Main function for Favorites Screen
export default function FavoritesScreen() {
  const { favoritesList } = useContext(FavoritesListContext);
  const [stockData, setStockData] = useState({});
  const [selectedStock, setSelectedStock] = useState(null);

  useEffect(() => {
    // Function to fetch data of stock
    const fetchStockData = async () => {
      let data = {};
      for (let symbol of favoritesList) {
        try {
          const stockHistory = await getData(
            `https://aij1hx90oj.execute-api.ap-southeast-2.amazonaws.com/prod/history?symbol=${symbol}`
          );
          data[symbol] = stockHistory[0];
        } catch (error) {
          console.error("Error fetching stock data:", error);
        }
      }
      setStockData(data);
    };

    if (favoritesList.length > 0) {
      fetchStockData();
    }
  }, [favoritesList]);

  const navigation = useNavigation();

  // Function to navigate to History screen when user selects a stock
  const handleSelectStock = (symbol) => {
    setSelectedStock(stockData[symbol]);
    navigation.navigate("History", { symbol: symbol });
  };

  // Function to display stock details in the favorites list
  const renderStockItem = (symbol) => {
    const stock = stockData[symbol];
    if (!stock) {
      return null;
    }
    const percentageChange = (
      ((stock.close - stock.open) / stock.open) *
      100
    ).toFixed(2);
    const changeColor = percentageChange >= 0 ? "#4CAF50" : "#F44336";

    return (
      <TouchableOpacity
        key={symbol}
        style={styles.stockItem}
        onPress={() => handleSelectStock(symbol)}
      >
        <Text style={styles.stockSymbol}>{symbol}</Text>
        <Text style={styles.stockOpenPrice}>
          {parseFloat(stock.open).toFixed(2)}
        </Text>
        <Text style={styles.stockClosePrice}>
          {parseFloat(stock.close).toFixed(2)}
        </Text>
        <Text style={[styles.stockChange, { color: changeColor }]}>
          {percentageChange}%
        </Text>
      </TouchableOpacity>
    );
  };

  if (favoritesList.length === 0) {
    return (
      <View style={styles.notification}>
        <Text>Favorites list is empty!</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {favoritesList.map(renderStockItem)}
      </ScrollView>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
  },
  stockItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "white",
  },
  stockSymbol: {
    flex: 2,
    fontWeight: "bold",
    fontSize: 16,
  },
  stockOpenPrice: {
    flex: 3,
    fontSize: 16,
    textAlign: "right",
  },
  stockClosePrice: {
    flex: 3,
    fontSize: 16,
    textAlign: "right",
  },
  stockChange: {
    flex: 3,
    fontSize: 16,
    textAlign: "right",
  },
  detailView: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  notification: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
