import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import ChartScreen from "../screens/ChartScreen";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import StocksScreen from "../screens/StocksScreen";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

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
        name="Stocks"
        component={StocksScreen}
        options={{
          title: "STOCKS",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-stats-chart" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Chart"
        component={ChartScreen}
        options={{
          title: "CHART",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-trending-up" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "Home";
    case "Search":
      return "Search";
    case "Stocks":
      return "Stocks";
    case "Chart":
      return "Chart";
    default:
      return "Home";
  }
}
