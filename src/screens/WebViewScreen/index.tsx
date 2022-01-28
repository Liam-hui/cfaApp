import React, { useState, useEffect, useRef, createRef } from 'react';
import { View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import MyWebView from '@/components/MyWebView';
import { MainStackScreenProps } from '@/types';

export default function WebViewScreen(props: MainStackScreenProps<'WebView'>) {

  const { uri } = props.route.params;

  return (
    <MyWebView
      uri={uri}
      noLogo
      defaultBack
    />
  );
}

