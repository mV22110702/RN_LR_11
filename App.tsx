import { Provider } from 'react-redux';
import { store } from './libs/packages/store/store';
import { App } from '../LR_10/libs/components/app';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { SQLiteDatabase } from 'expo-sqlite';
import { SqliteDb } from './libs/packages/sqlite-db/sqlite-db';
import { initDb } from './libs/packages/sqlite-db/helpers/init-db.helper';
import { useMemo } from 'react';

(async () => {
  await SqliteDb.openDatabase();
  initDb();
})();
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
