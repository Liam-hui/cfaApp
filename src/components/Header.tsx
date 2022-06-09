import React from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import { View, Text, Image } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';

import Icon from './Icon';

export default function Header({ children, back, noLogo, defaultBack }: { children?: React.ReactNode, back?: () => void, noLogo?: boolean, defaultBack?: boolean }) {

  const navigation = useNavigation<StackNavigationProp<any>>();
  const popAction = StackActions.pop(1);
  const goBack = () => {
    navigation.dispatch(popAction);
  };
  
  return (
    <SafeAreaInsetsContext.Consumer>
      {insets => 
        <View 
          style={{ 
            flexDirection: "row", 
            alignItems: "center", 
            paddingBottom: 15, 
            backgroundColor: "white", 
            paddingHorizontal: 15, 
            paddingTop: 15 + (insets?.top ?? 0),
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 10,            
            zIndex: 999,
          }} 
        >
          {(defaultBack || back) &&
            <Icon
              size={24}
              icon={require('../assets/icons/icon-backArrow.png')} 
              onPress={defaultBack ? goBack : back}
              style={{ marginRight: 5 }}
            />
          }

          {!noLogo &&
            <FastImage
              style={{ height: 30, width: 30 * 1489 / 268  }}
              source={require("../assets/images/CFALogo.png")}
            />
          }

          <View style={{ flex: 1 }}/>

          {children}

        </View>
      }
    </SafeAreaInsetsContext.Consumer>
  );
}
