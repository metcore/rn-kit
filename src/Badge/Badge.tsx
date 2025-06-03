import React from 'react';
import { View, StyleSheet } from 'react-native';
import Color from '../Color/Color';
import Typography from '../Typography/Typography';

type Variant =
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'neutral'
  | 'orange'
  | 'purple';

interface BadgeProps {
  value?: string | number;
  size?: number;
  variant?: Variant;
  dot?: boolean;
}

const COLORS: Record<Variant, { background: string; color: string }> = {
  default: { background: Color.gray[100], fontColor: Color.gray[800] },
  primary: { background: Color.primary[50], fontColor: Color.primary[1000] },
  success: { background: Color.success[50], fontColor: Color.success[500] },
  info: { background: Color.info[50], fontColor: Color.info[500] },
  danger: { background: Color.danger[50], fontColor: Color.danger[600] },
  warning: { background: Color.warning[50], fontColor: Color.warning[300] },
  orange: { background: Color.orange[50], fontColor: Color.orange[500] },
  purple: { background: Color.purple[50], fontColor: Color.purple[500] },
};

const SIZE_MAP: Record<Size, { height: number; fontSize: string }> = {
  small: {
    height: 18,
    fontSize: 't3',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  medium: {
    height: 32,
    fontSize: 't1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
};
const Badge: React.FC<BadgeProps> = ({
  value,
  size = 'medium',
  color = 'default',
  dot = false,
}) => {
  const safeSize: Size = ['small', 'medium'].includes(size) ? size : 'medium';

  const { background, fontColor } = COLORS[color];
  const { height, fontSize, paddingHorizontal, paddingVertical } =
    SIZE_MAP[safeSize];

  if (dot) {
    return (
      <View
        style={[
          styles.dot,
          {
            height: height,
            paddingHorizontal: paddingHorizontal,
            paddingVertical: paddingVertical,
            borderRadius: size / 4,
            backgroundColor: background,
          },
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.badge,
        {
          minWidth: size,
          height: size,
          borderRadius: 8,
          backgroundColor: background,
          paddingHorizontal: paddingHorizontal,
          paddingVertical: paddingVertical,
        },
      ]}
    >
      <Typography color={fontColor} variant={fontSize} weight="medium">
        {value}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dot: {
    alignSelf: 'flex-start',
  },
});

export default Badge;
