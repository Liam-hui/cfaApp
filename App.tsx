import React from 'react';
import { store, persistor } from '@/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
// import '@/translate/i18n';

// import useCachedResources from '@/hooks/useCachedResources';
// import useColorScheme from '@/hooks/useColorScheme';
import Navigation from '@/navigation';
// import Loading from '@/components/Loading';

export default function App() {
  // const isLoadingComplete = useCachedResources();
  // const colorScheme = useColorScheme();

  const isLoadingComplete = true;

  if (!isLoadingComplete) {
    return null;
  } 
  else return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation/>
      </PersistGate>
      {/* <StatusBar /> */}
    </Provider>
  );
}
