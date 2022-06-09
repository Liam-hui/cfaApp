import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';

import MyWebView from '@/components/MyWebView';
import { HOST } from '@/constants';

export default function ProfileScreen() {

  const jsCode = `
    window.ReactNativeWebView.postMessage("dafsdaf");
    document.querySelector(".log-out-button button a").href = "logoutAction";

  `;

  return (
    <MyWebView
      uri={`${HOST}/my-profile/`}
      addJsCode={jsCode}
    />
  );
}