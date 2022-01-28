import React from 'react';

import MyWebView from '@/components/MyWebView';

export default function HomeScreen() {
  return (
    <MyWebView
      uri="https://cfasocietyhongkong.org/"
      addCss={`
        body {
          padding-top: 25px;
        }
        .elementor-element-95058f6, .elementor-element-bbb7a7c, .elementor-element-f58600a {
          display: none !important; 
        }
      `}
    />
  );
}

