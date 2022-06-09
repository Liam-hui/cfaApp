import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import { initAuth } from '@/store/auth';
import { hideLoading, showLoading } from '@/store/loading';
import { View } from 'react-native';

export default function Navigation() {

  const authStatus = useAppSelector((state: RootState) => state.auth.status);
  const dispatch = useAppDispatch();
  const [isReady, setIsReady] = useState(authStatus != "notReady")

  useEffect(() => {
    dispatch(initAuth());
  }, [])

  useEffect(() => {
    if (authStatus == "notReady") {
      setIsReady(false);
      dispatch(showLoading());
    }
    else if (!isReady) {
      setIsReady(true);
      dispatch(hideLoading());
    }
  }, [authStatus])

  return (
    <NavigationContainer
      // linking={LinkingConfiguration}
      // theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      {authStatus == "notReady"
        ? <View style={{ flex: 1, backgroundColor: "white" }}/>
        : <>
          {authStatus == 'success'
            ? <MainStack/>
            : <AuthStack/>
          }
        </>
      }
    </NavigationContainer>
  );
}

