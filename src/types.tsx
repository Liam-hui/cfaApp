import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStackParamList {}
  }
}

export type MainStackParamList = {
  Root: NavigatorScreenParams<TabsParamList> | undefined;
  EventsSearch: undefined,
  WebView: { uri: string },
};

export type MainStackScreenProps<Screen extends keyof MainStackParamList> = StackScreenProps<
  MainStackParamList,
  Screen
>;

export type TabsParamList = {
  // TabOne: undefined;
  // TabTwo: undefined;
};

export type TabsScreenProps<Screen extends keyof TabsParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabsParamList, Screen>,
  StackScreenProps<MainStackParamList>
>;
