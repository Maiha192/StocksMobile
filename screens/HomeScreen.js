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
  brandName: {
    color: "black",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
  },
  container: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    height: 150,
    marginBottom: 20,
    resizeMode: "contain",
    width: 150,
  },
});
