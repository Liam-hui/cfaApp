import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

// import LinkingConfiguration from './LinkingConfiguration';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { useAppSelector } from '@/hooks';
import { RootState } from '@/store';

export default function Navigation() {

  const authStatus = useAppSelector((state: RootState) => state.auth.status);
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(getHomePageData());
  //   dispatch(initShopSearch());
  // }, [])

  return (
    <NavigationContainer
      // linking={LinkingConfiguration}
      // theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      {authStatus == 'success'
        ? <MainStack/>
        : <AuthStack/>
      }
    </NavigationContainer>
  );
}

