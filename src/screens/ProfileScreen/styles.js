import styled from 'styled-components/native';
import Layout from '@/constants/Layout';

export const Card = styled.View`
  padding-top: 20px;
  padding-bottom: 60px;
  padding-horizontal: 20px;
  margin-top: 20px;
  margin-horizontal: ${Layout.page.paddingHorizontal}px;
  background-color: white;
  border-radius: 15px;
`;

export const BottomCard = styled.View`
  padding-top: 20px;
  padding-bottom: 30px;
  padding-horizontal: 20px;
  margin-top: 20px;
  background-color: white;
  borderTopLeftRadius: 20px;
  borderTopRightRadius: 20px;
`;

export const StyledBoldText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const StyledText = styled.Text`
  font-size: 14px;
  margin-bottom: 5px;
`;

export const StyledLargeText = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const Sep = styled.View`
  width: 100%;
  height: 1px;
  background-color: #C4C4C4;
  margin-vertical: 15px;
`;

