import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaInsetsContext, SafeAreaView } from 'react-native-safe-area-context';

import { useAppDispatch } from '@/hooks';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Text } from '@/components/Themed';
import { InputContainer, Input } from './styles';
import { signIn } from '@/store/auth';
import Header from '@/components/Header';

export default function EventsSearchScreen() {

  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(false);

  const onSignInButtonPress = () => {
    dispatch(signIn({ email, password }));
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        noLogo
        defaultBack
      />
      <View style={{ flex: 1, paddingTop: 30, paddingHorizontal: Layout.page.paddingHorizontal }}>
        <InputContainer>
          <Image 
            source={require('../../assets/icons/icon-search.png')}
            style={{ width: 15, height: 15 }}
          /> 
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Keywords"
            placeholderTextColor="#53565A"
            style={{ marginHorizontal: 10 }}
            secureTextEntry
          />
        </InputContainer>
        <InputContainer>
          <Image 
            source={require('../../assets/icons/icon-search.png')}
            style={{ width: 15, height: 15 }}
          /> 
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Location"
            placeholderTextColor="#53565A"
            style={{ marginHorizontal: 10 }}
            secureTextEntry
          />
        </InputContainer>
      </View>
    </View>
  );
}

