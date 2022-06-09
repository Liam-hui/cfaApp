import React, { useState, useEffect, useRef, createRef } from 'react';
import { View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import MyWebView from '@/components/MyWebView';
import Icon from '@/components/Icon';
import { HOST } from '@/constants';

export default function EnrolledEventsScreen() {
  
  return (
    <MyWebView
      uri={`${HOST}/enrolled-events/`}
      // headerAction={
      //   <TouchableOpacity
      //     style={{
      //       width: 36,
      //       height: 36,
      //       borderRadius: 18,
      //       backgroundColor: "#F6F6F6",
      //       alignItems: "center",
      //       justifyContent: "center"
      //     }}
      //     onPress={() => navigation.navigate("EventsSearch")}
      //   >
      //     <Icon
      //       size={17}
      //       icon={require("../../assets/icons/icon-search.png")}
      //     />
      //   </TouchableOpacity>
      // }
      addCss={`
        .search-nav, .search_events {
          display: none !important; 
        }
      `}
    />
  );
}

