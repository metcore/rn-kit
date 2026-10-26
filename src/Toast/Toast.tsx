import { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Color from '../Color/Color';
import Typography from '../Typography/Typography';
import Icon, { type IconNameProps } from '../Icon';
import { getTestID } from '../helpers/getTestID';

const SLIDE_DISTANCE = 16;
const CLOSE_HIT_SLOP = { top: 12, bottom: 12, left: 12, right: 12 };

type ToastColor =
  | 'default'
  | 'success'
  | 'danger'
  | 'primary'
  | 'warning'
  | 'info'
  | 'purple'
  | 'orange';

const COLOR_MAP: Record<
  ToastColor,
  {
    bg: string;
    text: string;
    border: string;
  }
> = {
  primary: {
    bg: Color.primary[1000],
    border: Color.gray[50],
    text: Color.base.white100,
  },
  default: {
    bg: Color.gray[700],
    border: Color.gray[700],
    text: Color.base.white100,
  },
  success: {
    bg: Color.success[50],
    border: Color.success[50],
    text: Color.success[500],
  },
  danger: {
    bg: Color.danger[50],
    border: Color.danger[50],
    text: Color.danger[500],
  },
  warning: {
    bg: Color.warning[50],
    border: Color.warning[50],
    text: Color.warning[400],
  },
  info: {
    bg: Color.info[50],
    border: Color.info[50],
    text: Color.info[500],
  },
  orange: {
    bg: Color.orange[50],
    border: Color.orange[50],
    text: Color.orange[500],
  },
  purple: {
    bg: Color.purple[50],
    border: Color.purple[50],
    text: Color.purple[500],
  },
};

interface ToastProps {
  visible?: boolean;
  duration?: number;
  color?: ToastColor;
  message?: string;
  icon?: IconNameProps;
  onClear?: (val: boolean) => void;
  onHide?: (val: boolean) => void;
  children?: React.ReactNode;
  closable?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
const Toast = ({
  visible,
  message,
  duration = 3000,
  onHide,
  color = 'default',
  icon = 'ExclamationMark',
  onClear,
  children,
  closable = true,
  style,
  testID,
}: ToastProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const onHideRef = useRef(onHide);
  onHideRef.current = onHide;
  const validColors: ToastColor[] = [
    'default',
    'success',
    'danger',
    'primary',
    'warning',
    'info',
    'purple',
    'orange',
  ];
  const safeColor = validColors.includes(color) ? color : 'default';

  const baseContainerStyle = StyleSheet.flatten({
    backgroundColor: COLOR_MAP[safeColor].bg,
    borderColor: COLOR_MAP[safeColor].border,
  });

  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const isClearing = useRef(false);

  const handlePressClearButton = () => {
    if (isClearing.current) return;

    isClearing.current = true;
    animationRef.current?.stop();

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      isClearing.current = false;
      onClear?.(true);
    });
  };

  useEffect(() => {
    if (!visible) return;

    const animation = Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(duration),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]);

    animationRef.current = animation;
    animation.start(({ finished }) => {
      if (finished) onHideRef.current?.(true);
    });

    return () => animation.stop();
  }, [visible, duration, fadeAnim]);

  if (!visible) return null;

  return (
    <Animated.View
      testID={testID}
      style={[
        styles.toast,
        baseContainerStyle,
        style,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [SLIDE_DISTANCE, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Icon name={icon} size={20} color={COLOR_MAP[safeColor].text} />
            <Typography
              testID={getTestID(testID, 'message')}
              variant="t2"
              color={COLOR_MAP[safeColor].text}
            >
              {message}
            </Typography>
          </View>
          <View style={styles.actionWrapper}>
            {children}
            {closable && (
              <Pressable
                testID={getTestID(testID, 'clear')}
                onPress={handlePressClearButton}
                hitSlop={CLOSE_HIT_SLOP}
                style={styles.closeButton}
              >
                <Icon
                  name="Times"
                  size={10}
                  color={COLOR_MAP[safeColor].text}
                />
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 80,
    left: 28,
    right: 28,
    backgroundColor: '#333',
    borderWidth: 1,
    borderRadius: 8,
    zIndex: 999,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    flexShrink: 1,
    gap: 8,
  },
  wrapper: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 48,
    justifyContent: 'center',
  },
  closeButton: {
    padding: 4,
  },
  actionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

export default Toast;
