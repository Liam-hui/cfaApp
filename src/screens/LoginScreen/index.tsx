import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaInsetsContext, SafeAreaView } from 'react-native-safe-area-context';
import EncryptedStorage from 'react-native-encrypted-storage';

import { useAppDispatch, useAppSelector } from '@/hooks';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Text } from '@/components/Themed';
import { InputContainer, Input } from './styles';
import { signIn } from '@/store/auth';
import { RootState } from '@/store';
import { hideLoading, showLoading } from '@/store/loading';
import Icon from '@/components/Icon';
import FastImage from 'react-native-fast-image';

export default function LoginScreen() {

  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const [isSecure, setIsSecure] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const status = useAppSelector((state: RootState) => state.auth.status);
  const errorMsg = useAppSelector((state: RootState) => state.auth.errorMsg);

  useEffect(() => {
    if (status == "loading")
      dispatch(showLoading());
    else 
      dispatch(hideLoading());

    if (status == "failed") {
      setError(errorMsg);
    }
  }, [status])

  useEffect(() => { 
    setError(undefined);
  }, [email, password])

  useEffect(() => {
    getSavedCredentials();
    return () => {
      dispatch(hideLoading());
    }
  }, [])

  const getSavedCredentials = async () => {
    let credentials: any = await EncryptedStorage.getItem("user_credentials");
    if (credentials != null) {
      credentials = JSON.parse(credentials);
      setEmail(credentials.email);
      setPassword(credentials.password);
      setIsRemember(true);
    }
  }

  const onSignInButtonPress = async () => {
    dispatch(signIn({ email, password }));
    if (isRemember) {
      try {
        await EncryptedStorage.setItem(
            "user_credentials",
            JSON.stringify({
              email,
              password
            })
        );
        } catch (error) {}
    }
    else {
      EncryptedStorage.removeItem("user_credentials");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          <FastImage 
            source={require('../../assets/images/CFALogo.png')}
            style={{ 
              width: Layout.window.width - Layout.page.paddingHorizontal * 2, 
              height: (Layout.window.width - Layout.page.paddingHorizontal * 2) * 286 / 1489, 
              marginBottom: 40 
            }}
          /> 
          <InputContainer style={{ marginBottom: 20 }}>
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
              secureTextEntry={isSecure}
            />
            <Icon
              icon={require('../../assets/icons/icon-hidePassword.png')}
              size={20}
              onPress={() => setIsSecure(!isSecure)}
            /> 
          </InputContainer>
          <Text style={{ alignSelf: "flex-start", color: 'red' }}>{error ?? ""}</Text>
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
    </TouchableWithoutFeedback>
  );
}

