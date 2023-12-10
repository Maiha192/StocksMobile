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
import { WatchListContext } from "../contexts/WatchListProvider";
import { useNavigation } from "@react-navigation/native";

export default function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const apiUrl = `https://aij1hx90oj.execute-api.ap-southeast-2.amazonaws.com/prod/all`;
  const { loading, data: stocks, error } = useData(apiUrl);
  const screenWidth = Dimensions.get("window").width;
  const navigation = useNavigation();
  const { addToWatchList } = useContext(WatchListContext);

  function updateSearchText(newText) {
    setSearchText(newText);
  }

  function handleStockSelect(stock) {
    setSelectedStock(stock);
    setModalVisible(true);
  }

  function confirmAddToWatchList() {
    if (selectedStock) {
      addToWatchList(selectedStock.symbol);
      setModalVisible(false);
      navigation.navigate("Stocks");
    }
  }

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchText.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchText.toLowerCase())
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
          value={searchText}
          onChangeText={updateSearchText}
          autoFocus={true}
          autoCorrect={false}
        />
      </View>
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
              Would you like to add {selectedStock?.symbol} to your watch list?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonConfirm]}
                onPress={confirmAddToWatchList}
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
    paddingTop: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    width: "70%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "500",
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
    marginTop: 10,
    minWidth: 100,
    marginHorizontal: 10,
  },
  buttonConfirm: {
    backgroundColor: "#007bff",
  },
  buttonCancel: {
    backgroundColor: "#007bff",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
});
