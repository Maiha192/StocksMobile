// Import necessary dependencies
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { getData } from "../api/api";

// Main function for History Screen
export default function HistoryScreen({ route }) {
  const symbol = route.params?.symbol ?? null;
  const [historyData, setHistoryData] = useState([]);
  const [stockName, setStockName] = useState("");

  useEffect(() => {
    // Function to fetch stock history data
    if (symbol) {
      const fetchHistoryData = async () => {
        try {
          const data = await getData(
            `https://aij1hx90oj.execute-api.ap-southeast-2.amazonaws.com/prod/history?symbol=${symbol}`
          );
          setHistoryData(data);
          setStockName(data[0].name);
        } catch (error) {
          console.error("Error fetching stock history data:", error);
        }
      };

      fetchHistoryData();
    }
  }, [symbol]);

  // Function to display stock data in each row
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.date]}>
        {item.timestamp ? new Date(item.timestamp).toLocaleDateString() : "N/A"}
      </Text>
      <Text style={[styles.cell, styles.number]}>
        {item.open ? parseFloat(item.open).toFixed(2) : "N/A"}
      </Text>
      <Text style={[styles.cell, styles.number]}>
        {item.close ? parseFloat(item.close).toFixed(2) : "N/A"}
      </Text>
      <Text style={[styles.cell, styles.number]}>
        {item.high ? parseFloat(item.high).toFixed(2) : "N/A"}
      </Text>
      <Text style={[styles.cell, styles.number]}>
        {item.low ? parseFloat(item.low).toFixed(2) : "N/A"}
      </Text>
    </View>
  );

  // Rendered screen when no stock selected from Favorites list
  if (!symbol) {
    return (
      <View style={styles.notification}>
        <Text>Select a stock from Favorites list for stock history!</Text>
      </View>
    );
  }

  // Rendered screen when a stock selected from Favorites list
  return (
    <View style={styles.container}>
      <Text style={styles.stockName}>
        {stockName} ({symbol})
      </Text>
      <View style={styles.headerContainer}>
        <View style={styles.fixedHeader}>
          <Text style={[styles.headerCell, styles.date]}>DATE</Text>
          <Text style={[styles.headerCell, styles.number]}>OPEN</Text>
          <Text style={[styles.headerCell, styles.number]}>CLOSE</Text>
          <Text style={[styles.headerCell, styles.number]}>HIGH</Text>
          <Text style={[styles.headerCell, styles.number]}>LOW</Text>
        </View>
        <FlatList
          data={historyData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
        />
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 5,
  },
  headerContainer: {
    flex: 1,
  },
  fixedHeader: {
    flexDirection: "row",
    backgroundColor: "#f4f4f4",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd",
    position: "absolute",
    width: "100%",
    zIndex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  headerCell: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
  },
  date: {
    flex: 2,
    textAlign: "left",
  },
  number: {
    flex: 1,
  },
  stockName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  list: {
    marginTop: 60,
  },
  notification: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
