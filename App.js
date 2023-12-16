// Import necessary dependencies
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import { FavoritesListProvider } from "./contexts/FavoritesListProvider";

// Main function for the mobile app
export default function App() {
  return (
    <FavoritesListProvider>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </FavoritesListProvider>
  );
}
