import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaInsetsContext, SafeAreaView } from 'react-native-safe-area-context';

import { useAppDispatch } from '@/hooks';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Text } from '@/components/Themed';
import { InputContainer, Input } from './styles';
import { signIn } from '@/store/auth';

export default function LoginScreen() {

  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(false);

  const onSignInButtonPress = () => {
    dispatch(signIn({ email, password }));
  }

  return (
    <SafeAreaView 
      style={{ 
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View 
        style={{
          flex: 1, 
          alignItems: "center", 
          justifyContent: "center", 
          paddingHorizontal: Layout.page.paddingHorizontal,
        }}
      > 
        <Image 
          source={require('../../assets/images/CFALogo.png')}
          style={{ width: 227, marginBottom: 40 }}
        /> 
        <InputContainer>
          <Image 
            source={require('../../assets/icons/icon-email.png')}
            style={{ width: 20, height: 20 }}
          /> 
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#A09F9F"
            style={{ marginLeft: 10 }}
          />
        </InputContainer>
        <InputContainer>
          <Image 
            source={require('../../assets/icons/icon-password.png')}
            style={{ width: 20, height: 20 }}
          /> 
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#A09F9F"
            style={{ marginHorizontal: 10 }}
            secureTextEntry
          />
          <Image 
            source={require('../../assets/icons/icon-hidePassword.png')}
            style={{ width: 20, height: 20 }}
          /> 
        </InputContainer>
        <View style={{ flexDirection: "row", width: "100%", alignItems: "center", marginTop: 20 }}>
          <TouchableOpacity
            style={{
              height: 28,
              width: 28,
              borderRadius: 5,
              backgroundColor: "#F5F5F5",
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={() => setIsRemember(!isRemember)}
          >
            <Image 
              source={require('../../assets/icons/icon-tick.png')}
              style={{ width: 15, height: 15, opacity: isRemember ? 1 : 0 }}
            /> 
          </TouchableOpacity>
          <Text style={{ marginLeft: 10 }}>Remember Me</Text>
          <TouchableOpacity style={{ marginLeft: "auto", borderBottomColor: Colors.grey, borderBottomWidth: 1 }}>
            <Text>Forget Password</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: Colors.blue,
            borderRadius: 60,
            paddingHorizontal: 20,
            paddingVertical: 20,
            alignItems: "center",
            marginTop: 90
          }}
          onPress={onSignInButtonPress}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

