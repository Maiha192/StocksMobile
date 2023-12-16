// Import necessary dependencies
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
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useData } from "../api/api";
import { FavoritesListContext } from "../contexts/FavoritesListProvider";
import { useNavigation } from "@react-navigation/native";

// Main function to show the SearchBar component
export default function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const apiUrl = `https://aij1hx90oj.execute-api.ap-southeast-2.amazonaws.com/prod/all`;
  const { loading, data: stocks, error } = useData(apiUrl);
  const screenWidth = Dimensions.get("window").width;
  const navigation = useNavigation();
  const { addToFavoritesList } = useContext(FavoritesListContext);

  // Function to update the search text
  function updateSearchText(newText) {
    setSearchText(newText);
  }

  // Function to show modal when user selects a stock
  function handleStockSelect(stock) {
    setSelectedStock(stock);
    setModalVisible(true);
  }

  // Function to navigate to the Favorites screen after user confirms to add a stock to favorites list
  function confirmAddToFavoritesList() {
    if (selectedStock) {
      addToFavoritesList(selectedStock.symbol);
      setModalVisible(false);
      navigation.navigate("Favorites");
    }
  }

  // Filter stocks based on user's search text
  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchText.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Show spinner while loading
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="grey" />
      </View>
    );
  }

  // Show error message if any
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      {/*Search text input*/}
      <View style={[styles.inputContainer, { width: screenWidth }]}>
        <Icon name="ios-search" size={24} color="white" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter company name or stock symbol"
          placeholderTextColor="white"
          value={searchText}
          onChangeText={updateSearchText}
          autoFocus={true}
          autoCorrect={false}
        />
      </View>

      {/*Result list*/}
      <ScrollView style={styles.scrollView}>
        {filteredStocks.map((item) => (
          <TouchableOpacity
            key={item.symbol}
            onPress={() => handleStockSelect(item)}
          >
            <View style={styles.stockItem}>
              <Text style={styles.stockSymbol}>{item.symbol}</Text>
              <Text style={styles.companyName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/*Modal to confirm adding stock to favorites list */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Add {selectedStock?.symbol} to your favorites?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonConfirm]}
                onPress={confirmAddToFavoritesList}
              >
                <Text style={styles.textStyle}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    elevation: 2,
    marginHorizontal: 10,
    marginTop: 10,
    minWidth: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonCancel: {
    backgroundColor: "#007bff",
  },
  buttonConfirm: {
    backgroundColor: "#007bff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  centered: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  centeredView: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
  },
  companyName: {
    color: "gray",
    fontSize: 20,
    paddingTop: 10,
  },
  container: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    justifyContent: "flex-start",
  },
  icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    color: "white",
    flex: 1,
    fontSize: 20,
  },
  inputContainer: {
    alignItems: "center",
    backgroundColor: "lightgrey",
    flexDirection: "row",
    height: 60,
    marginTop: 0,
    padding: 5,
    width: "100%",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 20,
    textAlign: "center",
  },
  modalView: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    margin: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: "70%",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  stockItem: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  stockSymbol: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  textStyle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
