import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  Text,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useData } from "../api/api";

export function SearchBar() {
  const [state, setState] = useState({ txt: "" });

  const apiUrl = `https://aij1hx90oj.execute-api.ap-southeast-2.amazonaws.com/prod/all`;
  const { loading, data: stocks, error } = useData(apiUrl);

  const screenWidth = Dimensions.get("window").width;

  function updateText(newText) {
    setState({ txt: newText });
  }

  const filteredStocks = stocks.filter((stock) =>
    stock.symbol.includes(state.txt)
  );

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, { width: screenWidth }]}>
        <Icon name="ios-search" size={24} color="white" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter stock symbol"
          placeholderTextColor="white"
          defaultValue={state.txt}
          onChangeText={updateText}
          autoFocus={true}
          autoCorrect={true}
        />
      </View>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error.message}</Text>
      ) : (
        <ScrollView style={styles.scrollView}>
          {filteredStocks.map((item) => (
            <Text key={item.symbol}>
              {item.symbol} - {item.name}
            </Text>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 60,
    padding: 5,
    backgroundColor: "lightgrey",
    borderRadius: 20,
    marginTop: 100,
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
});
