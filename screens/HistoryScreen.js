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
  cell: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 10,
    textAlign: "center",
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 5,
  },
  date: {
    flex: 2,
    textAlign: "left",
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
  list: {
    marginTop: 60,
  },
  notification: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
  },
  number: {
    flex: 1,
  },
  row: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  stockName: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
});
