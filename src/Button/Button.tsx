import React from 'react';
import {
  Pressable,
  StyleSheet,
  type ViewStyle,
  type GestureResponderEvent,
  ActivityIndicator,
  View,
} from 'react-native';
import Typography from '../Typography/Typography';
import Color from '../Color/Color';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonVariant = 'default' | 'outline' | 'tertiary';
type ButtonColor =
  | 'default'
  | 'success'
  | 'danger'
  | 'primary'
  | 'warning'
  | 'info'
  | 'purple'
  | 'orange';

interface ButtonProps {
  children?: React.ReactNode;
  title?: string | React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  disabled?: boolean;
  width?: number | string;
  block?: boolean;
  loading?: boolean;
}

const COLOR_MAP: Record<
  ButtonColor,
  {
    bg: string;
    text: string;
    border: string;
    borderFocus: string;
    press: string;
    focus: string;
    disabledBg: string;
    disabledText: string;
    disabledBorder: string;
  }
> = {
  default: {
    bg: Color.gray[600],
    text: Color.base.white100,
    border: Color.gray[600],
    borderFocus: Color.gray[200],
    press: Color.gray[600],
    focus: Color.gray[600],
    disabledBg: Color.gray[200],
    disabledText: Color.gray[950],
    disabledBorder: Color.gray[950],
  },
  success: {
    bg: Color.success[500],
    border: Color.success[500],
    borderFocus: Color.success[200],
    press: Color.success[600],
    text: '#fff',
    focus: Color.success[600],
    disabledBg: Color.success[100],
    disabledText: Color.success[950],
    disabledBorder: Color.success[950],
  },
  danger: {
    bg: Color.danger[600],
    border: Color.danger[600],
    borderFocus: Color.danger[200],
    text: '#fff',
    press: Color.danger[700],
    focus: Color.danger[700],
    disabledBg: Color.danger[200],
    disabledText: Color.danger[950],
    disabledBorder: Color.danger[200],
  },
  primary: {
    bg: Color.primary[1000],
    border: Color.primary[1000],
    borderFocus: Color.primary[200],
    text: '#fff',
    press: Color.primary[1000],
    focus: Color.primary[1000],
    disabledBg: Color.primary[100],
    disabledText: Color.primary[950],
    disabledBorder: Color.primary[950],
  },
  warning: {
    bg: Color.warning[400],
    border: Color.warning[400],
    borderFocus: Color.warning[200],
    text: '#fff',
    press: Color.warning[700],
    focus: Color.warning[600],
    disabledBg: Color.warning[100],
    disabledText: Color.warning[950],
    disabledBorder: Color.warning[950],
  },
  info: {
    bg: Color.info[600],
    border: Color.info[600],
    borderFocus: Color.info[200],
    text: '#fff',
    press: Color.info[700],
    focus: Color.info[600],
    disabledBg: Color.info[100],
    disabledText: Color.info[100],
    disabledBorder: Color.info[100],
  },
  orange: {
    bg: Color.orange[500],
    border: Color.orange[500],
    borderFocus: Color.orange[200],
    text: '#fff',
    press: Color.orange[700],
    focus: Color.orange[600],
    disabledBg: Color.orange[100],
    disabledText: Color.orange[100],
    disabledBorder: Color.orange[100],
  },
  purple: {
    bg: Color.purple[600],
    border: Color.purple[600],
    borderFocus: Color.purple[200],
    text: '#fff',
    press: Color.purple[700],
    focus: Color.purple[600],
    disabledBg: Color.purple[100],
    disabledText: Color.purple[100],
    disabledBorder: Color.purple[100],
  },
};

const Button: React.FC<ButtonProps> = ({
  children,
  title,
  onPress,
  size = 'medium',
  variant = 'default',
  color = 'default',
  disabled = false,
  width,
  block = false,
  loading = false,
}) => {
  const validSizes: ButtonSize[] = ['small', 'medium', 'large'];
  const validVariants: ButtonVariant[] = ['default', 'outline', 'tertiary'];
  const validColors: ButtonColor[] = [
    'default',
    'success',
    'danger',
    'primary',
    'warning',
    'info',
    'purple',
    'orange',
  ];

  const safeSize = validSizes.includes(size) ? size : 'medium';
  const safeVariant = validVariants.includes(variant) ? variant : 'default';
  const safeColor = validColors.includes(color) ? color : 'default';

  const sizeStyles = sizeStyleMap[safeSize];
  const colors = COLOR_MAP[safeColor];

  const baseContainerStyle = [
    styles.base,
    sizeStyles.container,
    variantStyles[safeVariant].container(colors, disabled),
    disabled && styles.disabled,
    block && { width: '100%' },
    width !== undefined && { width },
  ];

  const textColor = variantStyles[safeVariant].text(colors, disabled).color;
  const typographyVariant = 't1';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => {
        const dynamicStyle: ViewStyle = {};
        if (pressed) {
          if (variant === 'outline') {
            dynamicStyle.borderColor = colors.borderFocus;
          } else if (variant === 'tertiary') {
            dynamicStyle.borderColor = colors.borderFocus;
            dynamicStyle.borderWidth = 1;
          } else {
            dynamicStyle.backgroundColor = colors.press;
            dynamicStyle.borderColor = colors.borderFocus;
            dynamicStyle.borderWidth = 1;
          }
        }
        // else if (focused) {
        //   if (variant === 'outline') {
        //     dynamicStyle.borderColor = colors.focus;
        //   } else {
        //     dynamicStyle.backgroundColor = colors.focus;
        //   }
        // }

        return [...baseContainerStyle, dynamicStyle];
      }}
    >
      <View style={styles.container}>
        {loading && <ActivityIndicator color={textColor} />}
        {children ? (
          children
        ) : (
          <Typography
            variant={typographyVariant}
            weight="semibold"
            color={textColor}
          >
            {title}
          </Typography>
        )}
      </View>
    </Pressable>
  );
};

const sizeStyleMap: Record<ButtonSize, { container: ViewStyle }> = {
  small: {
    container: { paddingVertical: 6, paddingHorizontal: 12 },
  },
  medium: {
    container: { paddingVertical: 10, paddingHorizontal: 16 },
  },
  large: {
    container: { paddingVertical: 14, paddingHorizontal: 20 },
  },
};

const variantStyles: Record<
  ButtonVariant,
  {
    container: (colors: any, disabled: boolean) => ViewStyle;
    text: (colors: any, disabled: boolean) => { color: string };
  }
> = {
  default: {
    container: (colors, disabled) => ({
      backgroundColor: disabled ? colors.disabledBg : colors.bg,
      borderWidth: 1,
      borderColor: disabled ? colors.disabledBg : colors.bg,
    }),
    text: (colors) => ({
      color: colors.text,
    }),
  },
  outline: {
    container: (colors, disabled) => ({
      backgroundColor: 'transparent',
      borderColor: disabled ? colors.disabledBg : colors.border,
      borderWidth: 1,
    }),
    text: (colors, disabled) => ({
      color: disabled ? colors.disabledBg : colors.border,
    }),
  },
  tertiary: {
    container: (_colors, _disabled) => ({
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: 'transparent',
    }),
    text: (colors, disabled) => ({
      color: disabled ? colors.disabledBg : colors.border,
    }),
  },
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  disabled: {},
});

export default Button;
