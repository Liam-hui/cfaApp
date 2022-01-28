import React, { useState, createRef, useEffect } from 'react';
import { View, ActivityIndicator, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';

import Colors from '@/constants/Colors';
import Header from '@/components/Header';
import { Text } from './Themed';

export default function MyWebView ({ uri, headerAction, addCss, noLogo, defaultBack }: { uri: string, headerAction?: React.ReactNode, addCss?: string, noLogo?: boolean, defaultBack?: boolean }) {
  const webViewRef: React.RefObject<WebView> = createRef();
  const [canBack, setCanBack] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    setIsHidden(true);
    setTimeout(
      () => setIsHidden(false)
    , 50)
  }, [uri])

  const css = `
    .em40_header_area_main, .dialog-message, .footer-middle { 
      display: none !important; 
    }
    ${addCss ?? ""}
  `;
  
  const jsCode = `
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode('${css.replace(/[\r\n]+/g," ")}'));
    document.head.appendChild(style);
  `;

  // window.ReactNativeWebView.postMessage("sddf");
      
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
  
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header
        defaultBack={defaultBack && !canBack}
        back={canBack ? () => webViewRef.current!.goBack() : undefined }
        noLogo={noLogo}
      >
        {headerAction}
      </Header>
      <View style={{ flex: 1 }}>
        {!isError && !isHidden &&
          <WebView 
            ref={webViewRef}
            bounces={false}
            source={{ uri: uri }} 
            allowsBackForwardNavigationGestures
            injectedJavaScript={jsCode}
            javaScriptEnabled={true}
            onMessage={(event) => {
              console.log(event.nativeEvent.data);
            }}
            onNavigationStateChange={(navState) => {
              setCanBack!(navState.canGoBack);
            }}
            onLoadStart={() => {
              setIsLoading(true);
            }}
            onLoadEnd={() => {
              setIsLoading(false);
            }}
            onError={() => {
              setIsError(true);
            }}
          />
        }
        {/* {isHidden &&
          <View style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "red" }}/>
        } */}
        {isLoading && 
          <View style={{ position: "absolute", width: "100%", height: "100%", alignItems: 'center', justifyContent: "center" }}>
            <ActivityIndicator/>
          </View>
        }
        {isError &&
          <View style={{ position: "absolute", width: "100%", height: "100%", alignItems: 'center', justifyContent: "center" }}>
            <TouchableOpacity
              onPress={() => {
                setIsError(false);
                setIsLoading(true);
              }}
            >
              <Text>Retry</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    </View>
  );
}
