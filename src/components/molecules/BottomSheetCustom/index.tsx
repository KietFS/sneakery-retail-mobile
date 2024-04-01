import React, {useCallback, useRef, useMemo, useState} from 'react';
import {
  View,
  Modal,
  TouchableHighlight,
  Keyboard,
  Platform,
  Pressable as RNPress,
} from 'react-native';

//modules
import {Controller} from 'react-hook-form';
import {GestureHandlerRootView as RNGestureView} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';

//hooks
import useTheme from '../../../hooks/useTheme';

interface IBottomSheetCustomProps<T = any> {
  children: React.ReactNode;
  snapPoints?: string[];
  handleCloseSheet: () => void;
  enablePanDownToClose?: boolean;
  blockManualClose?: boolean;
}

const BottomSheetCustom: React.FC<IBottomSheetCustomProps> = props => {
  // hooks
  const {
    children,
    handleCloseSheet,
    enablePanDownToClose = true,
    blockManualClose = false,
  } = props;

  //common hooks
  const {} = useTheme();

  //local ref
  const sheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChange = useCallback((index: any) => {}, []);

  const handleSnapPress = useCallback((index: any) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const onCloseSheet = () => {
    if (blockManualClose == true) {
    } else {
      sheetRef.current?.close();
      setTimeout(() => handleCloseSheet?.(), 350);
    }
  };

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} />,
    [],
  );

  React.useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', event => {
      sheetRef.current?.snapToIndex(1);
    });
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      sheetRef.current?.snapToIndex(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  });

  return (
    <Modal animationType="fade" transparent>
      {/* RNGestureView for animation on android bottom sheet */}
      <RNGestureView style={{flex: 1}}>
        <RNPress
          onPress={onCloseSheet}
          style={[
            {
              width: '100%',
              height: '100%',
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,0.4)',
            },
          ]}
        />
        <BottomSheet
          ref={sheetRef}
          snapPoints={props.snapPoints ? props.snapPoints : ['85%', '85%']}
          enablePanDownToClose={!blockManualClose}
          onClose={handleCloseSheet}
          backdropComponent={renderBackdrop}>
          {children}
        </BottomSheet>
      </RNGestureView>
    </Modal>
  );
};

export default BottomSheetCustom;
