import * as React from 'react';
import { View, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

import HomeScreen from '../screens/HomeScreen';
import CareersScreen from '../screens/CareersScreen';
import EventsScreen from '../screens/EventsScreen';
import EnrolledEventsScreen from '../screens/EnrolledEventsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MenuScreen from '../screens/MenuScreen';
import { Text } from '@/components/Themed';
import Colors from '@/constants/Colors';

const BottomTab = createBottomTabNavigator();

const Tabs = () => {

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        lazy: false,
      }}
      tabBar={(props) => TabBar(props)}
    >
        <BottomTab.Screen
          name="home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <BottomTab.Screen
          name="career"
          component={CareersScreen}
          options={{ title: "Careers" }}
        />
        <BottomTab.Screen
          name="events"
          component={EventsScreen}
          options={{ title: "Events" }}
        />
        <BottomTab.Screen
          name="enrolled"
          component={EnrolledEventsScreen}
          options={{ title: "Enrolled Events" }}
        />
        <BottomTab.Screen
          name="profile"
          component={ProfileScreen}
          options={{ title: "Profile" }}
        />
         <BottomTab.Screen
          name="menu"
          component={MenuScreen}
          options={{ title: "Menu" }}
        />
    </BottomTab.Navigator>
  );
}

const TabBar = (props: BottomTabBarProps) => {
  const { state, descriptors, navigation } = props;
  return (
    <SafeAreaInsetsContext.Consumer>
      {insets => 
        <View 
          style={{ 
            flexDirection: 'row', 
            alignItems: "center", 
            backgroundColor: 'white', 
            height: 90 + (insets?.bottom ?? 0), 
            paddingBottom: insets?.bottom,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -3,
            },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 30,            
            zIndex: 999,
          }} 
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const { title } = options;
            const isFocused = state.index === index;
            if (route.name != "Profile") return (
              <TouchableOpacity 
                key={index}
                style={{ flex: 1, height: 55, alignItems: "center", justifyContent: "center" }}
                onPress={() => { 
                  !isFocused && navigation.navigate(route.name); 
                }}
              >
                <Image 
                  style={{ height: 36, width: 36, marginBottom: 5 }}
                  resizeMode="contain"
                  source={TabBarIcons[route.name + (isFocused ? "Focused" : "")]} 
                />
                <Text
                  style={{ fontWeight: "bold", fontSize: 13, color: isFocused ? Colors.blue : Colors.lightGrey, textAlign: 'center' }}
                >
                  {title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      }
    </SafeAreaInsetsContext.Consumer>
  );
}

const TabBarIcons: { [key: string]: ImageSourcePropType } = {
  "home": require("../assets/icons/icon-tabBarItem-home.png"),
  "homeFocused": require("../assets/icons/icon-tabBarItem-home-focused.png"),
  "career": require("../assets/icons/icon-tabBarItem-career.png"),
  "careerFocused": require("../assets/icons/icon-tabBarItem-career-focused.png"),
  "events": require("../assets/icons/icon-tabBarItem-events.png"),
  "eventsFocused": require("../assets/icons/icon-tabBarItem-events-focused.png"),
  "enrolled": require("../assets/icons/icon-tabBarItem-enrolled.png"),
  "enrolledFocused": require("../assets/icons/icon-tabBarItem-enrolled-focused.png"),
  "profile": require("../assets/icons/icon-tabBarItem-profile.png"),
  "profileFocused": require("../assets/icons/icon-tabBarItem-profile-focused.png"),
  "menu": require("../assets/icons/icon-tabBarItem-menu.png"),
  "menuFocused": require("../assets/icons/icon-tabBarItem-menu-focused.png"),
}

export default Tabs;