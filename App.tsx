import { Provider } from 'react-redux';
import { store } from './libs/packages/store/store';
import { App } from '../LR_10/libs/components/app';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
export default function () {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
