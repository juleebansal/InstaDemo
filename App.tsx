import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './src/store/store';

import Navigation from './src/navigation/Navigation';

function AppRoot() {
  return (
    // Redux Provider wraps the entire app to make the store available
    <Provider store={store}>
      {/* PersistGate delays rendering until the Redux state is rehydrated */}
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <Navigation />;
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default AppRoot;
