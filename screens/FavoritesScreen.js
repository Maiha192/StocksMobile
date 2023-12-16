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
        <Text style={[styles.cell, styles.stockSymbol]}>{symbol}</Text>
        <Text style={[styles.cell, styles.stockOpenPrice]}>
          {parseFloat(stock.open).toFixed(2)}
        </Text>
        <Text style={[styles.cell, styles.stockClosePrice]}>
          {parseFloat(stock.close).toFixed(2)}
        </Text>
        <Text style={[styles.cell, styles.stockChange, { color: changeColor }]}>
          {percentageChange}%
        </Text>
      </TouchableOpacity>
    );
  };

  // Rendered screen when Favorites list is empty
  if (favoritesList.length === 0) {
    return (
      <View style={styles.notification}>
        <Text>Favorites list is empty!</Text>
      </View>
    );
  }

  // Rendered screen when Favorites list is not empty
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.fixedHeader}>
          <Text style={[styles.headerCell, styles.date]}>STOCK</Text>
          <Text style={[styles.headerCell, styles.number]}>OPEN</Text>
          <Text style={[styles.headerCell, styles.number]}>CLOSE</Text>
          <Text style={[styles.headerCell, styles.number]}>CHANGE</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          {favoritesList.map(renderStockItem)}
        </ScrollView>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  cell: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 10,
    textAlign: "center",
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  detailView: {
    borderTopColor: "#e0e0e0",
    borderTopWidth: 1,
    padding: 16,
  },
  fixedHeader: {
    backgroundColor: "#f4f4f4",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd",
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },
  headerCell: {
    alignItems: "center",
    flex: 1,
    fontWeight: "bold",
    justifyContent: "center",
    padding: 10,
    textAlign: "center",
  },
  headerContainer: {
    flex: 1,
  },
  notification: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
    marginTop: 60,
  },
  stockChange: {
    flex: 3,
    fontSize: 16,
    textAlign: "right",
  },
  stockClosePrice: {
    flex: 3,
    fontSize: 16,
    textAlign: "right",
  },
  stockItem: {
    backgroundColor: "white",
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  stockOpenPrice: {
    flex: 3,
    fontSize: 16,
    textAlign: "right",
  },
  stockSymbol: {
    flex: 2,
    fontSize: 16,
    fontWeight: "bold",
  },
});
