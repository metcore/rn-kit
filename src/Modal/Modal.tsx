import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  type DimensionValue,
  SafeAreaView,
  Platform,
  type ViewStyle,
} from 'react-native';
import Icon from '../Icon';
import Color from '../Color/Color';

interface ModalPopUpProps {
  isOpen: boolean;
  onClose?: (isOpen?: boolean) => void;
  children: React.ReactNode;
  backdrop?: boolean;
  closable?: boolean;
  onRequestClose?: () => void;
  bgColor?: string;
  width?: DimensionValue;
  height?: DimensionValue;
  containerStyle?: ViewStyle;
  modalStyle?: ViewStyle;
}

const ModalPopUp: React.FC<ModalPopUpProps> = ({
  isOpen,
  onClose,
  children,
  backdrop = true,
  closable = true,
  onRequestClose,
  bgColor = '#fff',
  width = '90%',
  containerStyle,
  modalStyle,
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const scaleAnim = useState(() => new Animated.Value(0))[0];

  const showModal = useCallback(() => {
    setIsVisible(true);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      damping: 20,
      stiffness: 200,
    }).start();
  }, [scaleAnim]);

  const hideModal = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      setIsVisible(false);
      onClose?.(false);
    });
  }, [scaleAnim, onClose]);

  const handleBackdropPress = useCallback(() => {
    if (closable) {
      if (onRequestClose) {
        onRequestClose();
      } else {
        hideModal();
      }
    }
  }, [closable, onRequestClose, hideModal]);

  useEffect(() => {
    if (isOpen) {
      showModal();
    } else {
      hideModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const modalContentStyle = StyleSheet.flatten([
    {
      transform: [{ scale: scaleAnim }],
      backgroundColor: bgColor,
      width: width,
      maxHeight: '80%' as `${number}%`,
    },
    modalStyle,
  ]);

  return (
    <Modal
      transparent
      visible={isVisible}
      onRequestClose={handleBackdropPress}
      statusBarTranslucent
    >
      <View style={[styles.modalContainer, containerStyle]}>
        {backdrop && (
          <TouchableOpacity
            style={[styles.backdrop, styles.backdropTouch]}
            activeOpacity={1}
            onPress={handleBackdropPress}
          />
        )}
        <Animated.View style={[styles.modalContent, modalContentStyle]}>
          {closable && (
            <View style={styles.closeButtonContainer}>
              <TouchableOpacity onPress={hideModal} style={styles.closeButton}>
                <View style={styles.iconButtonClose}>
                  <Icon name="Times" size={13} color={Color.gray[900]} />
                </View>
              </TouchableOpacity>
            </View>
          )}
          <SafeAreaView style={styles.contentContainer}>
            {children}
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdropTouch: {
    width: '100%',
    height: '100%',
  },
  modalContent: {
    borderRadius: 16,
    overflow: 'visible',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  iconButtonClose: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    top: 'auto',
    flex: 1,
  },
  closeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ccc',
  },
  contentContainer: {
    padding: 16,
  },
});

export default ModalPopUp;
