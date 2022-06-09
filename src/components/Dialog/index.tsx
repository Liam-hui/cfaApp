import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated  } from 'react-native';

import { Button, ButtonText } from './styles';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState, store } from '@/store';
import { hideDialog } from '@/store/dialog';

export default function Dialog() {

  const dispatch = useAppDispatch();

  const isVisible = useAppSelector((state: RootState) => state.dialog?.isVisible);
  const [isHidden, setIsHidden] = useState(true);

  const [dialogState, setDialogState] = useState<any>(undefined);

  const message = (dialogState && dialogState?.message != undefined) ? dialogState?.message : undefined;
  const confirm = (dialogState && dialogState?.confirm != undefined) ? dialogState?.confirm : undefined;
  const confirmText = (dialogState && dialogState?.confirmText != undefined) ? dialogState?.confirmText : undefined;
  const hideCancel = (dialogState && dialogState?.hideCancel != undefined) ? dialogState?.hideCancel : undefined;
  const cancel = (dialogState && dialogState?.cancel != undefined) ? dialogState?.cancel : undefined;
  const cancelText = (dialogState && dialogState?.cancelText!= undefined) ? dialogState?.cancelText : undefined;

  useEffect(() => {
    if (isVisible) {
      setDialogState(store.getState().dialog)
      setIsHidden(false);
    }
    startAnimation();
  }, [isVisible])

  const fadeAnim = useRef(new Animated.Value(0)).current
  const startAnimation = () => {
    Animated.timing(
      fadeAnim,
      {
        toValue: isVisible ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }
    ).start(({ finished }) => {
      if (!isVisible && finished) {
        setIsHidden(true);
      }
    });
  };

  if (isHidden)  
    return null;
  else return (
    <Animated.View 
      style={{ 
        position: "absolute",
        width: "100%", 
        height: "100%", 
        top: 0, 
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        paddingHorizontal: 25,
        opacity: fadeAnim
      }}
    >
      <View style={{ backgroundColor: "white", width: "100%", borderRadius: 10, paddingHorizontal: 15, paddingVertical: 15}}>
        <Text style={{ alignSelf: "center", marginBottom: 15 }}>{message}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <Button as={TouchableOpacity}
            onPress={() => {
              if (confirm) {
                confirm();
              }
              dispatch(hideDialog());
            }}
          >
            <ButtonText>{confirmText ?? "Confirm"}</ButtonText>
          </Button>
          {confirm && !hideCancel &&
            <Button as={TouchableOpacity}
              onPress={() => {
                if (cancel) {
                  cancel();
                }
                dispatch(hideDialog());
              }}
            >
              <ButtonText>{cancelText ?? "Cancel"}</ButtonText>
            </Button>
          }
        </View>
      </View>
    </Animated.View>
  );
}
