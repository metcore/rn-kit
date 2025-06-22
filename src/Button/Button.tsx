import React from 'react';
import {
  Pressable,
  StyleSheet,
  type ViewStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import Typography from '../Typography/Typography';
import {
  COLOR_MAP,
  type ButtonProps,
  type ButtonSize,
  type ButtonVariant,
} from './type';
import type { TypographyVariantProps } from '../Typography/type';

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

const fontVariantMap: Record<ButtonSize, TypographyVariantProps> = {
  small: 't2',
  medium: 't1',
  large: 't1',
};

const variantStyles: Record<
  ButtonVariant,
  {
    container: (colors: any, disabled: boolean, pressed: boolean) => ViewStyle;
    text: (
      colors: any,
      disabled: boolean,
      pressed: boolean
    ) => { color: string };
  }
> = {
  default: {
    container: (colors, disabled, pressed = false) => ({
      backgroundColor: disabled
        ? colors.disabledBackgroundColor
        : pressed
          ? colors.pressBackgroundColor
          : colors.backgroundColor,
      borderWidth: 1,
      borderColor: disabled
        ? colors.disabledBorderColor
        : pressed
          ? colors.pressBorderColor
          : colors.borderColor,
    }),
    text: (colors, disabled, pressed) => ({
      color: disabled
        ? colors.disabledTextColor
        : pressed
          ? colors.pressTextColor
          : colors.textColor,
    }),
  },
  outline: {
    container: (colors, disabled, pressed = false) => ({
      backgroundColor: colors.outlineBackgroundColor,
      borderWidth: 1,
      borderColor: disabled
        ? colors.outlineDisabledBorderColor
        : pressed
          ? colors.outlinePressBorderColor
          : colors.outlineBorderColor,
    }),
    text: (colors, disabled, pressed) => ({
      color: disabled
        ? colors.outlineDisabledTextColor
        : pressed
          ? colors.outlinePressTextColor
          : colors.outlineTextColor,
    }),
  },
  tertiary: {
    container: (colors, disabled, pressed = false) => ({
      backgroundColor: colors.tertiaryBackgroundColor,
      borderWidth: 1,
      borderColor: disabled
        ? colors.tertiaryDisabledBorderColor
        : pressed
          ? colors.tertiaryPressBorderColor
          : colors.tertiaryBorderColor,
    }),
    text: (colors, disabled, pressed) => ({
      color: disabled
        ? colors.tertiaryDisabledTextColor
        : pressed
          ? colors.tertiaryPressTextColor
          : colors.tertiaryTextColor,
    }),
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
  const sizeStyles = sizeStyleMap[size];
  const fontVariant = fontVariantMap[size];
  const colors = COLOR_MAP[color];

  const baseContainerStyle = [
    styles.base,
    sizeStyles.container,
    variantStyles[variant].container(colors, disabled, false),
    disabled && styles.disabled,
    block && { width: '100%' },
    width !== undefined && { width },
  ];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => {
        const dynamicStyle: ViewStyle = {};
        if (pressed) {
          if (variant === 'outline') {
            dynamicStyle.borderColor = colors.outlinePressBorderColor;
          } else if (variant === 'tertiary') {
            dynamicStyle.borderColor = colors.tertiaryPressBorderColor;
            dynamicStyle.borderWidth = 1;
          } else {
            dynamicStyle.backgroundColor = colors.pressBackgroundColor;
            dynamicStyle.borderColor = colors.pressBorderColor;
            dynamicStyle.borderWidth = 1;
          }
        }

        return [...baseContainerStyle, dynamicStyle];
      }}
    >
      {({ pressed }) => {
        const textStyle = variantStyles[variant].text(
          colors,
          disabled,
          pressed
        );
        return (
          <View style={styles.container}>
            {loading && <ActivityIndicator color={textStyle.color} />}
            {children ? (
              children
            ) : (
              <Typography
                variant={fontVariant}
                weight="semibold"
                color={textStyle.color}
              >
                {title}
              </Typography>
            )}
          </View>
        );
      }}
    </Pressable>
  );
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
