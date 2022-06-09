import React, { useState, useEffect, useRef, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-reanimated-carousel';
import { Pagination } from 'react-native-snap-carousel';

import { Modal, View, Image, Text, Linking } from 'react-native';
import Layout from '@/constants/Layout';
import Icon from '@/components/Icon';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import { clearAd } from '@/store/auth';
import { gestureHandlerRootHOC, TouchableOpacity } from 'react-native-gesture-handler';

const Ads = gestureHandlerRootHOC(() => {

  const ad = useAppSelector((state: RootState) => state.auth.ad);
  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity 
          activeOpacity={1}
          disabled={!item.url}
          style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}
          onPress={() => {
            Linking.openURL(item.url);
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{ width: Layout.window.width * 0.7, height: Layout.window.width * 0.7, resizeMode: "contain" }}
          />
          <Text style={{ marginTop: 10, fontSize: 20, fontWeight: "bold", color: "#53565A" }}>{item.text}</Text>
        </TouchableOpacity >
      </View>
    )
  }

  return (
    <>
      <View style={{ flex: 1 }}>
        <Carousel
          data={Object.values(ad)}
          renderItem={renderItem}
          width={Layout.window.width}
          onSnapToItem={(index) => {
            setActiveIndex(index);
          }}
        />
      </View>
      <Pagination
        dotsLength={Object.values(ad).length}
        activeDotIndex={activeIndex}
        containerStyle={{  }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: '#008ED6'
        }}
        inactiveDotStyle={{
          backgroundColor: '#c4c4c4'
        }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    </>
  )
})

export default function AdPopup() {
  
  const dispatch = useAppDispatch();

  const ad = useAppSelector((state: RootState) => state.auth.ad);

  // modal
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (!hasShown && ad != null) {
      setHasShown(true);
      setIsVisible(true);
    }
  }, [ad])

  const closeModal = () => {
    dispatch(clearAd());
    setIsVisible(false);
    setTimeout(() => setIsHidden(true), 1000);
  }

  if (isHidden)
    return null;

  return (
    <>
      {ad != null &&
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
          // onRequestClose={() => {
          // }}
        >
          <SafeAreaView style={{ flex: 1, backgroundColor: "#d5d5d5" }}>
            <View style={{ flex: 1 }}>
              <Ads/>
              <Icon
                size={25}
                icon={require("@/assets/icons/icon-close.png")}
                style={{ position: "absolute", top: 15, right: 15, zIndex: 999 }}
                onPress={closeModal}
              />
            </View>
          </SafeAreaView>
        </Modal>
      }
    </>
  );
}
