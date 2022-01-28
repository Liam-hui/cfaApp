import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

import { useAppDispatch } from '@/hooks';
import { signOut } from '@/store/auth';
import Colors from '@/constants/Colors';
import Icon from '@/components/Icon';
import Banner from '@/components/Banner';
import Header from '@/components/Header';
import { BottomCard, Card, Row, StyledBoldText, StyledLargeText, StyledText, Sep } from './styles';

export default function ProfileScreen() {

  const dispatch = useAppDispatch();

  const onSignOutButtonPress = () => {
    dispatch(signOut());
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header/>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Banner
            title="My Profile"
            image={require("../../assets/images/menuBanner.png")}
          />
          <Card
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 10,      
            }}
          >
            <FastImage
              style={{ position: "absolute", bottom: 0, right: 5, height: 118, width: 176 }}
              source={require("../../assets/images/buildings.png")}
            />
            <FastImage
              style={{ height: 36, width: 36 * 277 / 77, marginLeft: -10, marginBottom: 10  }}
              source={require("../../assets/images/CFALogo.png")}
            />
            <StyledBoldText>Tai Man CHAN</StyledBoldText>
            <StyledText>V123456</StyledText>
            <StyledText>Member Type: Regular Member</StyledText>
            <StyledText>Member Year: FY2021</StyledText>
            <Icon
              style={{ position: "absolute", top: 15, right: 15 }}
              size={75}
              icon={require("../../assets/icons/icon-addProfilePic.png")}
            />
          </Card>
          <BottomCard
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 10,      
            }}
          >
            <StyledBoldText>Continuous Professional Training Hours</StyledBoldText>
            <StyledText style={{ marginBottom: 15 }}>01 Jan 2021- 31 Dec 2021</StyledText>
            <Row>
              <StyledLargeText>CPT hour(s)</StyledLargeText>
              <StyledLargeText>15</StyledLargeText>
            </Row>
            <Row>
              <StyledLargeText>PL(CE) hour(s)</StyledLargeText>
              <StyledLargeText>10</StyledLargeText>
            </Row>
            <Row>
              <StyledLargeText>RBV CPD hour</StyledLargeText>
              <StyledLargeText>10</StyledLargeText>
            </Row>
            <Sep/>
            <StyledBoldText>Primary Email</StyledBoldText>
            <StyledLargeText style={{ marginBottom: 15 }}>chantaiman@gmail.com</StyledLargeText>
            <StyledBoldText>Phone</StyledBoldText>
            <StyledLargeText style={{ marginBottom: 15 }}>+852 9876 5432</StyledLargeText>
            <StyledBoldText>Company</StyledBoldText>
            <StyledLargeText style={{ marginBottom: 15 }}>Apptask Limited</StyledLargeText>
            <StyledBoldText>Job Title</StyledBoldText>
            <StyledLargeText style={{ marginBottom: 15 }}>Account Manager</StyledLargeText>
            <StyledText style={{ marginTop: 15, marginBottom: 10 }}>*Our membership year runs from 1 July to 30 June</StyledText>
            <Sep/>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={onSignOutButtonPress}
            >
              <Icon
                size={20}
                icon={require("../../assets/icons/icon-logOut.png")}
              />
              <Text style={{ fontWeight: "bold", marginLeft: 8 }}>Log Out</Text>
            </TouchableOpacity>
          </BottomCard>
        </ScrollView>
      </View>
    </View>
  );
}

