import React, { useState, createRef, useEffect, useCallback } from 'react';
import { View, ActivityIndicator, ScrollView, Platform, RefreshControl, Linking } from 'react-native';
import WebView from 'react-native-webview';

import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/hooks';
import Colors from '@/constants/Colors';
import Header from '@/components/Header';
import { signOut } from '@/store/auth';
import { HOST } from '@/constants';
import { useIsFocused } from '@react-navigation/native';

export default function MyWebView ({ headerAction, addCss, addJsCode, noLogo, defaultBack, ...props }: { uri: string | null, headerAction?: React.ReactNode, addCss?: string, addJsCode?: string, noLogo?: boolean, defaultBack?: boolean }) {
  
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const jwt = useAppSelector((state: RootState) => state.auth.jwt);

  const webViewRef: React.RefObject<WebView> = createRef();
  const REDIRECT_URI = `${HOST}/?rest_route=/simple-jwt-login/v1/autologin&JWT=${jwt}&redirectUrl=${props.uri}`;
  const [canBack, setCanBack] = useState(false);
  const [isInited, setIsInited] = useState(false);
  const [loadingState, setLoadingState] = useState<|"loading"|"error"|"success">("loading");

  useEffect(() => {
    if (isFocused && isInited) {
      webViewRef.current?.injectJavaScript(`
        if (window.history.length > 1)
          window.history.go(-(window.history.length - 1));
      `);
    }
  }, [isFocused])

  const css = `
    .mobile_logo_area, .dialog-message, .footer-middle { 
      display: none !important; 
    }
    ${addCss ?? ""}
  `;
  
  const jsCode = `
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode('${css.replace(/[\r\n]+/g," ")}'));
    document.head.appendChild(style);

    window.onscroll = function() {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: "scroll",
          value: document.documentElement.scrollTop || document.body.scrollTop
        }),     
      )
    }

    ${addJsCode ?? ""}

    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: "finished"
      }),
    );

    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: "response",
        value: document.getElementsByTagName("pre")[0].innerHTML,
      }),     
    );
  `;
      
  // setTimeout(() => {
  //   window.ReactNativeWebView.postMessage(document.querySelectorAll('.elementor-widget-container').length);
  //   document.querySelectorAll('div').forEach(child => {
  //     window.ReactNativeWebView.postMessage(child.classList);
  //   });
  // }, 5000);

  // const jsCode = `
  //   document.querySelectorAll('body > div').forEach(child => {
  //     if (child.classList.contains('body')) {
  //       child.querySelectorAll(':scope > div').forEach((element, index) => {
  //         if (index > 0) {
  //           element.style.display = "none";
  //         }
  //       });
  //     }
  //     else {
  //       child.style.display = "none";
  //     }
  //   });
  // `;

  const [isRefreshEnabled, setIsRefreshEnabled] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = () => {
    setIsRefreshing(true);
    webViewRef.current?.reload();
  }
  
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header
        defaultBack={defaultBack && !canBack}
        back={canBack ? () => webViewRef.current?.goBack() : undefined }
        noLogo={noLogo}
      >
        {headerAction}
      </Header>
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            enabled={isRefreshEnabled}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <WebView 
          ref={webViewRef}
          bounces={false}
          source={{ 
            uri: REDIRECT_URI,
            headers: {
              Authorization: `Bearer ${jwt}`,
            }
          }} 
          style={{ flex: 1, opacity: loadingState == "success" ? 1 : 0 }}
          allowsBackForwardNavigationGestures
          injectedJavaScript={jsCode}
          onNavigationStateChange={(navState) => {
            if (navState.url.includes("logoutAction")) {
              webViewRef.current?.stopLoading();
              dispatch(signOut());
            }
            setCanBack((navState.canGoBack));
          }}
          onShouldStartLoadWithRequest={(e: any) => {
            if (e.isTopFrame) {
              if (e.mainDocumentURL.endsWith("pdf")) {
                Linking.openURL(e.mainDocumentURL);
                return false;
              }
            }
            return true;
          }}
          onMessage={(event) => {
            const { data } = event.nativeEvent;
            try {
              const { type, value } = JSON.parse(data);
              // finish loading
              if (type == "finished") {
                setLoadingState("success");
                setIsInited(true);
              }
              // response 
              else if (type == "response") {
                const { success, data } = JSON.parse(value);
                if (!success && data?.errorCode == 14) {
                  dispatch(signOut());
                }
              }
              // pull to refresh
              else if (type == "scroll") {
                setIsRefreshEnabled(value === 0);
              }
            } 
            catch (error) {

            };
          }}
          onLoadStart={() => {
            setLoadingState("loading");
          }}
          onLoadEnd={() => {
            console.log("webpage finish loading");
            if (isInited) {
              setLoadingState("success");
              setIsRefreshing(false);
            }
          }}
          onError={() => {
            console.log("webpage loading error");
            setLoadingState("error");
          }}
        />
        {loadingState == "loading" && 
          <View style={{ position: "absolute", width: "100%", height: "100%", alignItems: 'center', justifyContent: "center" }}>
            <ActivityIndicator color={Platform.OS == "android" ? "black" : "grey"}/>
          </View>
        }
      </ScrollView>
    </View>
  );
}
