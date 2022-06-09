import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import LoginScreen from '../screens/LoginScreen';
import VerifyScreen from '../screens/VerifyScreen';

const Stack = createStackNavigator();

const AuthStack = () => {

  const authStatus = useAppSelector((state: RootState) => state.auth.status);
  
  return (
    <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={{ 
        headerShown: false,
      }}
    >
      {authStatus == "pending"
        ? <Stack.Screen name="Verify" component={VerifyScreen} />
        : <Stack.Screen name="Login" component={LoginScreen} />
      }
    </Stack.Navigator>
  );
}

export default AuthStack;