import type { ColorValue, TextStyle } from 'react-native';
import React from 'react';
export type TypographyVariantProps =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'p1'
  | 'p2'
  | 'p3'
  | 't1'
  | 't2'
  | 't3';

export type Weight = 'regular' | 'medium' | 'semibold' | 'bold';

export const fontSizeMap: Record<TypographyVariantProps, number> = {
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

export const lineHeightMap: Record<TypographyVariantProps, number> = {
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

export const fontWeightMap: Record<Weight, TextStyle['fontWeight']> = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export interface TypographyProps {
  children: React.ReactNode;
  variant?: TypographyVariantProps;
  weight?: Weight;
  color?: ColorValue;
  style?: TextStyle;
  numberOfLines?: number;
  center?: boolean;
  right?: boolean;
  left?: boolean;
}
