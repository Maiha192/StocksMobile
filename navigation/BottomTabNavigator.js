// Import necessary dependencies
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import * as React from "react";
import TabBarIcon from "../components/TabBarIcon";
import HistoryScreen from "../screens/HistoryScreen";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import FavoritesScreen from "../screens/FavoritesScreen";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

// Main function for bottom tab navigator component
export default function BottomTabNavigator({ navigation, route }) {
  React.useLayoutEffect(() => {
    if (navigation != null) {
      navigation.setOptions({ headerTitle: getHeaderTitle(route) });
    }
  }, []);

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "HOME",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-home" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: "SEARCH",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-search" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: "FAVORITES",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-heart" />
          ),
        }}
      />
      <BottomTab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          title: "HISTORY",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-trending-up" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// Function to get title for each tab bar
function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "Home";
    case "Search":
      return "Search";
    case "Favorites":
      return "Favorites";
    case "History":
      return "History";
    default:
      return "Home";
  }
}
