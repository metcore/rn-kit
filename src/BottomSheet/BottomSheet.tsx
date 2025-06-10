import React, { useEffect, useRef, useState, useCallback } from 'react';
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
  type ViewStyle,
} from 'react-native';
import Container from '../Ui/Container';
import Typography from '../Typography/Typography';

interface PropsBottomSheet {
  label?: string;
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  children: React.ReactNode;
  backdrop?: boolean;
  closable?: boolean;
  onRequestClose?: (e: any) => void;
  buttonClose?: boolean;
  height?: number | string;
  pullBar?: React.ReactNode;
  footer?: React.ReactNode;
}

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
}: PropsBottomSheet) {
  const [isVisible, setIsVisible] = useState(false);
  const [heighContent, setHeighContent] = useState<
    number | `${number}%` | 'auto' | undefined | string
  >('auto');
  const [maxHeight, setMaxHeight] = useState<`${number}%` | 'auto'>('95%');
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
  }, [closable, onClose, translateY]);

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
    setHeighContent(height);
  }, [height]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setMaxHeight('90%');
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setMaxHeight('95%');
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
                height:
                  typeof heighContent === 'string'
                    ? heighContent.includes('%')
                      ? (heighContent as `${number}%`)
                      : 'auto'
                    : heighContent,
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
              style={
                StyleSheet.flatten([
                  styles.contentContainer,
                  { maxHeight },
                  footer ?? styles.contentWithFooter,
                ]) as ViewStyle
              }
            >
              <Container>{children}</Container>
            </SafeAreaView>
            {footer && <View style={styles.footer}>{footer}</View>}
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
    paddingBottom: Platform.OS === 'ios' ? 15 : 5,
    maxHeight: Dimensions.get('window').height - 50,
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
  contentWithFooter: {
    marginBottom: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
});
