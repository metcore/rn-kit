import React from 'react';
import { StyleSheet, View } from 'react-native';
import Color from '../Color/Color';
import Icon, { type IconNameProps } from '../Icon';
import { hexToRGBA } from '../helpers/hexToRgba';
import type { HexColor, IconSizeStyle, Size, Variant } from './type';

interface BaseBadgeProps {
  color?: Variant | HexColor;
  size?: Size;
  variant?: Variant;
}

interface IconBadgeProps extends BaseBadgeProps {
  icon: IconNameProps;
  children?: never;
}

interface ChildrenBadgeProps extends BaseBadgeProps {
  icon?: never;
  children: React.ReactNode;
}

// Union tipe
export type BadgeProps = IconBadgeProps | ChildrenBadgeProps;

const COLORS: Record<Variant, { background: string; fontColor: string }> = {
  default: { background: Color.gray[100], fontColor: Color.gray[800] },
  primary: { background: Color.primary[50], fontColor: Color.primary[1000] },
  success: { background: Color.success[50], fontColor: Color.success[500] },
  info: { background: Color.info[50], fontColor: Color.info[500] },
  danger: { background: Color.danger[50], fontColor: Color.danger[600] },
  warning: { background: Color.warning[50], fontColor: Color.warning[300] },
  orange: { background: Color.orange[50], fontColor: Color.orange[500] },
  purple: { background: Color.purple[50], fontColor: Color.purple[500] },
};

const SIZE_MAP: Record<Size, IconSizeStyle> = {
  small: {
    minHeight: 24,
    minWidth: 24,
    padding: 4,
    borderRadius: 4,
  },
  medium: {
    minHeight: 32,
    minWidth: 32,
    padding: 4,
    borderRadius: 4,
  },
  large: {
    minHeight: 40,
    minWidth: 40,
    padding: 8,
    borderRadius: 4,
  },
};

const ICON_SIZE_MAP: Record<Size, number> = {
  small: 16,
  medium: 24,
  large: 24,
};

const BadgeIcon: React.FC<BadgeProps> = ({
  icon,
  size = 'medium',
  color = 'default',
  children,
}) => {
  const safeSize: Size = ['small', 'medium', 'large'].includes(size)
    ? size
    : 'medium';

  const isVariant = Object.prototype.hasOwnProperty.call(COLORS, color);

  const { background, fontColor } = isVariant
    ? COLORS[color as Variant]
    : { background: color, fontColor: '#fff' };

  const { minHeight, padding, minWidth, borderRadius } = SIZE_MAP[safeSize];

  const iconSize = ICON_SIZE_MAP[safeSize];

  const bgRgba = hexToRGBA(
    typeof color === 'string' && color.startsWith('#') ? color : background,
    0.1
  );

  const isHex = typeof color === 'string' && color.startsWith('#');

  return (
    <View
      style={[
        styles.badge,
        {
          minHeight: minHeight,
          minWidth: minWidth,
          backgroundColor: isHex ? bgRgba : background,
          padding: padding,
          borderRadius: borderRadius,
        },
      ]}
    >
      {children
        ? children
        : icon && (
            <Icon
              name={icon}
              color={isHex ? color : fontColor}
              size={iconSize}
            />
          )}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
});

export default BadgeIcon;
