import { Provider } from 'react-redux';
import { store } from './libs/packages/store/store';
import { NativeBaseProvider, Spinner } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { SqliteDb } from './libs/packages/sqlite-db/sqlite-db';
import { initDb } from './libs/packages/sqlite-db/helpers/init-db.helper';
import { App } from './libs/components/app';
import { useEffect, useState } from 'react';

export default function () {
  const [isDbAvailable, setIsDbAvailable] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      await SqliteDb.openDb();
      await initDb();
      setIsDbAvailable(true);
    })();
  }, []);
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Provider store={store}>
          {isDbAvailable ? <App /> : <Spinner />}
        </Provider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
