import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import { WatchListProvider } from "./contexts/WatchListProvider";

export default function App() {
  return (
    <WatchListProvider>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </WatchListProvider>
  );
}
