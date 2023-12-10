import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import { FavoritesListProvider } from "./contexts/FavoritesListProvider";

export default function App() {
  return (
    <FavoritesListProvider>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </FavoritesListProvider>
  );
}
