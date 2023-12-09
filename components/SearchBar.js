import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useData } from "../api/api";
import { WatchListContext } from "../contexts/WatchListProvider";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

export default function SearchBar() {
  const [state, setState] = useState("");
  const apiUrl = `https://aij1hx90oj.execute-api.ap-southeast-2.amazonaws.com/prod/all`;
  const { loading, data: stocks, error } = useData(apiUrl);
  const screenWidth = Dimensions.get("window").width;
  const navigation = useNavigation(); // Use the useNavigation hook
  const { addToWatchList } = useContext(WatchListContext); // Correctly destructure from context

  function updateText(newText) {
    setState(newText);
  }

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(state.toLowerCase()) ||
      stock.name.toLowerCase().includes(state.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="grey" />
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, { width: screenWidth }]}>
        <Icon name="ios-search" size={24} color="white" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter company name or stock symbol"
          placeholderTextColor="white"
          value={state}
          onChangeText={updateText}
          autoFocus={true}
          autoCorrect={true}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        {filteredStocks.map((item) => (
          <TouchableOpacity
            key={item.symbol}
            onPress={() => {
              addToWatchList(item.symbol);
              navigation.navigate("Stocks");
            }}
          >
            <View style={styles.stockItem}>
              <Text style={styles.stockSymbol}>{item.symbol}</Text>
              <Text style={styles.companyName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 60,
    padding: 5,
    backgroundColor: "lightgrey",
    borderRadius: 20,
    marginTop: 0,
  },
  icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "white",
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  stockItem: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  stockSymbol: {
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
  },
  companyName: {
    fontSize: 14,
    color: "gray",
  },
});
