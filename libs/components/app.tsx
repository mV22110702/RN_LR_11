import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {ProfileScreen} from "./screens/profile/profile.screen";
import {BasketScreen} from "./screens/basket/basket.screen";
import {ShopParamsList, ShopScreen} from "./screens/shop/shop-screen";

export type MainTabParamList = {
  Shop: NavigatorScreenParams<ShopParamsList>;
  Basket: undefined;
  Profile: undefined;
};
const MainBottomTab = createBottomTabNavigator<MainTabParamList>();

export const App = () => {
  return (
    <MainBottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabelStyle: { fontSize: 20 },
        headerShown: route.name !== 'Shop',
      })}
    >
      <MainBottomTab.Screen
        name={'Shop'}
        component={ShopScreen}
        options={{
          tabBarIcon: () => <Entypo name="shop" size={24} color="black" />,
        }}
      />
      <MainBottomTab.Screen
        name={'Basket'}
        component={BasketScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="shopping-basket" size={24} color="black" />
          ),
        }}
      />
      <MainBottomTab.Screen
        name={'Profile'}
        component={ProfileScreen}
        options={{
          tabBarIcon: () => <FontAwesome5 name={'user'} size={24} />,
        }}
      />
    </MainBottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
