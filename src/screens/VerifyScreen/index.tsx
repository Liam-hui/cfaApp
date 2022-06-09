import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaInsetsContext, SafeAreaView } from 'react-native-safe-area-context';

import { useAppDispatch, useAppSelector } from '@/hooks';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Text } from '@/components/Themed';
import { InputContainer, Input } from './styles';
import { resend2FA, resetAuth, signIn, verify } from '@/store/auth';
import { RootState } from '@/store';
import { hideLoading, showLoading } from '@/store/loading';
import Icon from '@/components/Icon';
import FastImage from 'react-native-fast-image';
import { MainStackScreenProps } from '@/types';

export default function VerifyScreen(props: MainStackScreenProps<"Verify">) {

  const dispatch = useAppDispatch();

  const [code, setCode] = useState("");
  const [resendTime, setResendTime] = useState(0);

  const status = useAppSelector((state: RootState) => state.auth.verifyStatus);
  const resendStatus = useAppSelector((state: RootState) => state.auth.resendStatus);
  const errorMsg = useAppSelector((state: RootState) => state.auth.errorMsg);

  useEffect(() => {
    countTime(60);
    return () => {
      if (resendCountdownRef.current)
        clearTimeout(resendCountdownRef.current);
    }
  }, [])

  useEffect(() => {
    if (status == "loading")
      dispatch(showLoading());
    else 
      dispatch(hideLoading());
  }, [status])

  const resendCountdownRef = useRef<any>(null);
  useEffect(() => {
    if (resendStatus == "loading")
      dispatch(showLoading());
    else 
      dispatch(hideLoading());

    if (resendStatus == "success") {
      countTime(60);
    }
  }, [resendStatus])

  const countTime = (time: number) => {
    if (resendCountdownRef.current)
      clearTimeout(resendCountdownRef.current);
    setResendTime(time);
    if (time > 0 ){
      resendCountdownRef.current = setTimeout(() => countTime(time - 1), 1000)
    }
  }

  useEffect(() => {
    return () => {
      dispatch(hideLoading());
    }
  }, [])

  const onVerifyButtonPress = async () => {
    dispatch(verify(code));
  }

  const onResendButtonPress = async () => {
    dispatch(resend2FA());
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
          <InputContainer style={{ marginBottom: 5 }}>
            <Input
              value={code}
              onChangeText={setCode}
              placeholder="Enter Code"
              placeholderTextColor="#A09F9F"
              style={{ height: "100%", flex: 1, paddingHorizontal: 20 }}
            />
          </InputContainer>
          <Text style={{ alignSelf: "flex-start", color: 'red' }}>{errorMsg ?? ""}</Text>
          <TouchableOpacity
            style={{
              width: "100%",
              backgroundColor: Colors.blue,
              borderRadius: 60,
              paddingHorizontal: 20,
              paddingVertical: 20,
              alignItems: "center",
              marginTop: 20
            }}
            onPress={onVerifyButtonPress}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "100%",
              borderColor: Colors.blue,
              borderRadius: 60,
              borderWidth: 1,
              paddingHorizontal: 20,
              paddingVertical: 20,
              alignItems: "center",
              marginTop: 20
            }}
            onPress={() => dispatch(resetAuth())}
          >
            <Text style={{ color: Colors.blue, fontWeight: "bold", fontSize: 20 }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "100%",
              backgroundColor: resendTime > 0 ? "#AAAAAA" : Colors.blue,
              borderRadius: 60,
              paddingHorizontal: 20,
              paddingVertical: 20,
              alignItems: "center",
              marginTop: 20
            }}
            disabled={resendTime > 0}
            onPress={onResendButtonPress}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>Resend Code{resendTime > 0 ? `(${resendTime})` : ""}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

