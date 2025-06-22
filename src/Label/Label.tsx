import { StyleSheet, View } from 'react-native';
import React from 'react';
import Color from '../Color/Color';
import type { ColorVariantType } from '../Color/type';
import Typography from '../Typography/Typography';
import Icon from '../Icon';
import type { IconNameProps } from '../Icon';

interface LabelProps {
  label?: string;
  children?: React.ReactNode;
  color?: string;
  icon?: IconNameProps;
  size?: 'medium' | 'small';
}

type LabelColor = ColorVariantType;

const validColors: LabelColor[] = [
  'default',
  'success',
  'danger',
  'primary',
  'warning',
  'info',
  'purple',
  'orange',
];

const LABEL_COLOR_MAP: Record<
  LabelColor,
  {
    backgroundColor: string;
    textColor: string;
  }
> = {
  default: {
    backgroundColor: Color.gray[50],
    textColor: Color.gray[900],
  },
  success: {
    backgroundColor: Color.success[50],
    textColor: Color.success[300],
  },
  danger: {
    backgroundColor: Color.danger[50],
    textColor: Color.danger[300],
  },
  primary: {
    backgroundColor: Color.primary[50],
    textColor: Color.primary[300],
  },
  warning: {
    backgroundColor: Color.warning[50],
    textColor: Color.warning[300],
  },
  info: {
    backgroundColor: Color.info[50],
    textColor: Color.info[300],
  },
  orange: {
    backgroundColor: Color.orange[50],
    textColor: Color.orange[300],
  },
  purple: {
    backgroundColor: Color.purple[50],
    textColor: Color.purple[300],
  },
};

export default function Label({
  label,
  icon,
  children,
  color = 'default',
}: LabelProps) {
  const safeColor = validColors.includes(color as LabelColor)
    ? (color as LabelColor)
    : 'default';
  const colors = LABEL_COLOR_MAP[safeColor];

  return (
    <View
      style={[styles.container, { backgroundColor: colors.backgroundColor }]}
    >
      {children ? (
        children
      ) : (
        <View style={styles.content}>
          {icon && (
            <Icon name={icon} color={colors.textColor} style={styles.icon} />
          )}
          <Typography
            variant="t2"
            color={colors.textColor}
            style={{ color: colors.textColor }}
          >
            {label}
          </Typography>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 4,
  },
});
