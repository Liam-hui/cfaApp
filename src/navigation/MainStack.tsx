import * as React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import Tabs from './Tabs';
import EventsSearchScreen from '../screens/EventsSearchScreen';
import WebViewScreen from '../screens/WebViewScreen';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Tabs"
      screenOptions={{ 
        headerShown: false,
      }}
    >
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="EventsSearch" component={EventsSearchScreen} />
      <Stack.Screen name="WebView" component={WebViewScreen} />
    </Stack.Navigator>
  );
}

export default MainStack;