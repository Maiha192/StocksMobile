// Import necessary dependencies
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as React from "react";

// Main function for Tab Bar Icon component
export default function TabBarIcon(props) {
  return (
    <View style={styles.iconContainer}>
      <Ionicons
        name={props.name}
        size={30}
        color={props.focused ? "blue" : "grey"}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
