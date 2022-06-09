import React from 'react';
import { StatusBar } from 'react-native';
import { store, persistor } from '@/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import 'react-native-reanimated';
// import '@/translate/i18n';

import Navigation from '@/navigation';
import Loading from '@/components/Loading';
import Dialog from '@/components/Dialog';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          animated={true}
          barStyle={'dark-content'}
        />
        <Navigation/>
        <Dialog/>
        <Loading/>
      </PersistGate>
    </Provider>
  );
}
