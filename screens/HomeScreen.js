// Import necessary dependencies
import React from "react";
import { Text, StyleSheet, Image, SafeAreaView } from "react-native";

// Main function for Home Screen
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.brandName}>STOCKS SMART</Text>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  brandName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
    marginTop: 20,
  },
});
