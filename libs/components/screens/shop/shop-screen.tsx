import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../app';
import { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShopHomeScreen } from './shop-home.screen';
import { ShopProductsScreen } from './shop-products.screen';

export type ShopScreenProps = BottomTabScreenProps<MainTabParamList, 'Shop'>;

export type ShopParamsList = {
  ShopHome: undefined;
  ShopProducts: { categoryId: number };
};
const ShopScreenStack = createNativeStackNavigator<ShopParamsList>();

export const ShopScreen: FC<ShopScreenProps> = () => {
  return (
    <ShopScreenStack.Navigator screenOptions={{contentStyle:{backgroundColor:'white'}}} initialRouteName={'ShopHome'}>
      <ShopScreenStack.Screen
        name={'ShopHome'}
        options={{
          title: 'Browse categories',
          headerTitle: 'Browse categories',
        }}
        component={ShopHomeScreen}
      />

      <ShopScreenStack.Screen
        name={'ShopProducts'}
        options={{
          title: 'Browse products',
          headerTitle: 'Browse products',
        }}
        component={ShopProductsScreen}
      />
    </ShopScreenStack.Navigator>
  );
};
