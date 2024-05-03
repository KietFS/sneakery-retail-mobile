import React, {useEffect} from 'react';
import {Alert, LogBox, StatusBar, useColorScheme} from 'react-native';

import './src/translations';
import ApplicationNavigator from './src/navigators';

import {Provider as StoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persistor} from './src/store';
import './src/utils/prototype';
import messaging from '@react-native-firebase/messaging';
import {useDispatch} from 'react-redux';
import {authReducerActions} from './src/store/auth/slice';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    LogBox.ignoreAllLogs();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(remoteMessage?.notification.title);
    });

    return unsubscribe;
  }, []);

  return (
    <StoreProvider store={store}>
      <StatusBar />
      <PersistGate loading={null} persistor={persistor}>
        <ApplicationNavigator />
      </PersistGate>
    </StoreProvider>
  );
}

export default App;
