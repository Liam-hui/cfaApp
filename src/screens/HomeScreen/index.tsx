import React, { useState, useEffect, useCallback } from 'react';

import { HOST } from '@/constants';
import MyWebView from '@/components/MyWebView';
import { getAd } from '@/store/auth';
import { useAppDispatch } from '@/hooks';

export default function HomeScreen() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAd());
  }, []);

  return (
    <>
      <MyWebView
        uri={`${HOST}`}
        addCss={`
          .elementor-element-bbb7a7c {
            display: none !important; 
          }
        `}
      />
    </>
  );
}


// body {
  // padding-top: 25px;
// }
// .elementor-element-95058f6, .elementor-element-bbb7a7c, .elementor-element-f58600a