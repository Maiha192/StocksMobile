import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/core";
import * as React from "react";

import SearchScreen from "../screens/SearchScreen";
import StocksScreen from "../screens/StocksScreen";
import TabBarIcon from "../components/TabBarIcon";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
  React.useLayoutEffect(() => {
    if (navigation != null) {
      navigation.setOptions({ getHeaderTitle: getHeaderTitle(route) });
    }
  }, []);

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={StocksScreen}
        options={{
          title: "STOCKS",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-trending-up" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Stocks"
        component={SearchScreen}
        options={{
          title: "SEARCH",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-search" />
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
      return "Search";
    case "Stocks":
      return "Stocks";
  }
}
