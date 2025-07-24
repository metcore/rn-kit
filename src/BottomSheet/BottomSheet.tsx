import { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  TouchableOpacity,
  Animated,
  Modal,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
  SafeAreaView,
  Platform,
  StatusBar,
  type KeyboardEvent,
} from 'react-native';
import Container from '../Ui/Container';
import Typography from '../Typography/Typography';
import Color from '../Color/Color';
import type { BottomSheetHeighProps, BottomSheetProops } from './type';

const statusBarHeight =
  Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 65;
const screenHeight = Dimensions.get('window').height;
const actualScreenHeight = screenHeight - statusBarHeight;
const DEFAULT_PADDING_BOTTOM = 40;
export default function BottomSheet({
  isOpen,
  onClose,
  children,
  backdrop = true,
  closable = true,
  onRequestClose,
  buttonClose = false,
  height,
  pullBar,
  footer,
}: BottomSheetProops) {
  const [isVisible, setIsVisible] = useState(false);
  const [heightFooter, setHeightFooter] = useState(0);
  const [heighContent, setHeighContent] =
    useState<BottomSheetHeighProps>('auto');
  const [maxHeight, setMaxHeight] =
    useState<BottomSheetHeighProps>(actualScreenHeight);
  const translateY = useRef(new Animated.Value(600)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (closable && gestureState.dy > 50) {
          handleRequestClose();
        } else {
          resetModalPosition();
        }
      },
    })
  ).current;

  const hideModal = useCallback(() => {
    if (closable) {
      Animated.timing(translateY, {
        toValue: 500,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setIsVisible(false);
        onClose && onClose(false);
      });
    }
  }, [closable, translateY, onClose]);

  const showModal = useCallback(() => {
    setIsVisible(true);
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  }, [translateY]);

  const handleRequestClose = (e?: any) => {
    hideModal();
    onRequestClose && onRequestClose(e);
  };

  const resetModalPosition = () => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (isOpen) {
      showModal();
    } else {
      hideModal();
    }
  }, [isOpen, showModal, hideModal]);

  useEffect(() => {
    if (height) {
      setHeighContent(height);
    }
  }, [height]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e: KeyboardEvent) => {
        const keyboardHeight = e.endCoordinates?.height || 300;
        setMaxHeight(screenHeight - statusBarHeight - keyboardHeight);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setMaxHeight(screenHeight - statusBarHeight);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Modal
      transparent
      visible={isVisible}
      onRequestClose={handleRequestClose}
      animationType="fade"
    >
      <View style={[styles.modalContainer, backdrop && styles.backdrop]}>
        <TouchableOpacity
          onPress={handleRequestClose}
          activeOpacity={1}
          style={styles.backdropTouchable}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          enabled
          style={styles.keyboardAvoiding}
        >
          <Animated.View
            style={[
              styles.bottomSheet,
              {
                transform: [{ translateY }],
                height: heighContent,
                maxHeight: maxHeight,
                paddingBottom: DEFAULT_PADDING_BOTTOM + heightFooter,
              },
            ]}
          >
            {buttonClose && (
              <TouchableOpacity
                onPress={handleRequestClose}
                style={styles.closeButton}
              >
                <Typography>x</Typography>
              </TouchableOpacity>
            )}
            {closable && (
              <View
                {...panResponder.panHandlers}
                style={styles.dragIndicatorContainer}
              >
                {pullBar ? pullBar : <View style={styles.dragIndicator} />}
              </View>
            )}
            <SafeAreaView
              style={[
                styles.contentContainer,
                ...(footer ? [styles.contentWithFooter] : []),
              ]}
            >
              <Container>{children}</Container>
            </SafeAreaView>
            {footer && (
              <SafeAreaView
                onLayout={(event) => {
                  const { height } = event.nativeEvent.layout;
                  setHeightFooter(height);
                }}
                style={styles.footer}
              >
                <Container>{footer}</Container>
              </SafeAreaView>
            )}
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdropTouchable: {
    flex: 1,
  },
  keyboardAvoiding: {
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  closeButton: {
    position: 'absolute',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 50,
    top: -50,
    right: 24,
    zIndex: 10,
  },
  dragIndicatorContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  dragIndicator: {
    width: 70,
    height: 5,
    marginTop: 10,
    borderRadius: 2,
    backgroundColor: '#ccc',
  },
  contentContainer: {
    flexGrow: 1,
  },
  contentWithFooter: {},
  footer: {
    borderTopWidth: 1,
    borderTopColor: Color.gray[100],
    backgroundColor: Color.base.white100,
    position: 'absolute',
    paddingTop: 10,
    marginBottom: 32,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});
