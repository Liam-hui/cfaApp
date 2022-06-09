import React from 'react';

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

