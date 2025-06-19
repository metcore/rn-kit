import { useRef, useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import Color from '../Color/Color';
import Typography from '../Typography/Typography';
import Icon, { type IconNameProps } from '../Icon';
import Button from '../Button/Button';
import Container from '../Ui/Container';

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
    bg: Color.base.white100,
    border: Color.gray[50],
    text: Color.primary[1000],
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
}
const Toast = ({
  visible,
  message,
  duration = 3000,
  onHide,
  color = 'default',
  icon = 'ExlamationMark',
  onClear,
}: ToastProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
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

  const handlePressClearButton = () => {
    onClear?.(true);
  };

  useEffect(() => {
    if (visible) {
      Animated.sequence([
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
      ]).start(() => {
        if (onHide) onHide(true);
      });
    }
  }, [visible, duration, onHide, fadeAnim]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[styles.toast, baseContainerStyle, { opacity: fadeAnim }]}
    >
      <Container>
        <View style={styles.container}>
          <View style={styles.content}>
            <Icon name={icon} size={20} color={COLOR_MAP[safeColor].text} />
            <Typography variant="t2" color={COLOR_MAP[safeColor].text}>
              {message}
            </Typography>
          </View>
          <Button
            variant="tertiary"
            size="small"
            title="x"
            onPress={handlePressClearButton}
          >
            <Icon name="Times" size={10} color={COLOR_MAP[safeColor].text} />
          </Button>
        </View>
      </Container>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 80,
    left: 40,
    right: 40,
    backgroundColor: '#333',
    borderWidth: 1,
    borderRadius: 8,
    zIndex: 999,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
});

export default Toast;
