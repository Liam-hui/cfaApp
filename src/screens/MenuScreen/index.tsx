import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Layout from '@/constants/Layout';
import { Text } from '@/components/Themed';
import Icon from '@/components/Icon';
import Banner from '@/components/Banner';

import Header from '@/components/Header';
import { Link, Sep } from './styles';

export default function MenuScreen() {

  const navigation = useNavigation<StackNavigationProp<any>>();
  
  return (
    <View style={{ flex: 1 }}>
      <Header
        // back={canBack ? () => webViewRef.current!.goBack() : undefined }
      >
      </Header>
      <View style={{ flex: 1 }}>
        <Banner
          title="Menu"
          image={require("../../assets/images/menuBanner.png")}
        />
        <View style={{ paddingHorizontal: Layout.page.paddingHorizontal, paddingTop: 10}}>
          <Link as={TouchableOpacity}
          >
            <Text>About Us</Text>
          </Link>
          <Link as={TouchableOpacity}
            onPress={() => navigation.navigate("WebView", { uri: "https://cfasocietyhongkong.org/why-should-i-join-cfa-society-hong-kong/"})}
          >
            <Text>Membership</Text>
          </Link>
          <Link as={TouchableOpacity}
            onPress={() => navigation.navigate("WebView", { uri: "https://cfasocietyhongkong.org/response-to-consultation-papers/"})}
          >
            <Text>Our Insights</Text>
          </Link>
          <Link as={TouchableOpacity}
            onPress={() => navigation.navigate("WebView", { uri: "https://cfasocietyhongkong.org/volunteering-specialty-committees-requirement-commitment/"})}
          >
            <Text>Volunteer</Text>
          </Link>
          <Sep/>
          <Link as={TouchableOpacity}>
            <Text>Privacy Policy</Text>
          </Link>
          <Link as={TouchableOpacity}>
            <Text>Contact Us</Text>
          </Link>
          <Sep/>
          <Link as={TouchableOpacity}>
            <Text>Follow Us</Text>
          </Link>
          <View style={{ flexDirection: "row", marginTop: 8 }}>
            <Icon
              size={30}
              icon={require("../../assets/icons/icon-facebook.png")}
              style={{ marginRight: 15 }}
            />
            <Icon
              size={30}
              icon={require("../../assets/icons/icon-linkedin.png")}
              style={{ marginRight: 15 }}
            />
            <Icon
              size={30}
              icon={require("../../assets/icons/icon-wechat.png")}
            />
          </View>
          <Text style={{ fontSize: 12, marginTop: 30 }}>©️ 2022 CFA Society Hong Kong. All Rights Reserved.</Text>
        </View>
      </View>
    </View>
  );
}

