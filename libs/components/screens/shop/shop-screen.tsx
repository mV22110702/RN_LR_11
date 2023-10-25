import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../app';
import { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShopHomeScreen } from './shop-home.screen';

export type ShopScreenProps = BottomTabScreenProps<MainTabParamList, 'Shop'>;

export type ShopParamsList = {
  ShopHome: undefined;
};
const ShopScreenStack = createNativeStackNavigator<ShopParamsList>();

export const ShopScreen: FC<ShopScreenProps> = () => {
  return (
    <ShopScreenStack.Navigator initialRouteName={'ShopHome'}>
      <ShopScreenStack.Screen
        name={'ShopHome'}
        options={{
          title: 'Browse currencies',
          headerTitle: 'Browse currencies',
        }}
        component={ShopHomeScreen}
      />
    </ShopScreenStack.Navigator>
  );
};
