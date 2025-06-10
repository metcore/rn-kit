import React from 'react';
import {
  Text,
  type ColorValue,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import Color from '../Color/Color';
import type { TypographyVariantProps } from './type';

type Weight = 'regular' | 'medium' | 'semibold' | 'bold';

interface TypographyProps {
  children: React.ReactNode;
  variant?: TypographyVariantProps;
  weight?: Weight;
  color?: ColorValue;
  style?: ViewStyle;
  numberOfLines?: number;
  center?: boolean;
  right?: boolean;
  left?: boolean;
}

const fontSizeMap: Record<TypographyVariantProps, number> = {
  h1: 36,
  h2: 32,
  h3: 28,
  h4: 24,
  p1: 20,
  p2: 18,
  p3: 16,
  t1: 14,
  t2: 12,
  t3: 10,
};

const lineHeightMap: Record<TypographyVariantProps, number> = {
  h1: 46,
  h2: 42,
  h3: 38,
  h4: 34,
  p1: 30,
  p2: 28,
  p3: 26,
  t1: 14,
  t2: 14,
  t3: 14,
};

const fontWeightMap: Record<Weight, TextStyle['fontWeight']> = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'p3',
  weight = 'regular',
  color = 'default',
  style,
  numberOfLines,
  center,
  right,
  left,
}) => {
  const textStyle: TextStyle = {
    fontSize: fontSizeMap[variant],
    lineHeight: lineHeightMap[variant],
    fontWeight: fontWeightMap[weight],
    color: color ? color : Color.primary[1000],
    textAlign: center ? 'center' : right ? 'right' : left ? 'left' : undefined,
  };

  return (
    <Text style={[textStyle, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};

export default Typography;
