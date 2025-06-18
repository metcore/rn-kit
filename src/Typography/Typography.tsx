import React from 'react';
import { StyleSheet, Text, type TextStyle } from 'react-native';
import Color from '../Color/Color';
import {
  fontSizeMap,
  fontWeightMap,
  lineHeightMap,
  type TypographyProps,
} from './type';

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
    <Text style={[styles, textStyle, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};

export default Typography;

const styles = StyleSheet.create({
  text: {
    flexWrap: 'wrap',
    flexShrink: 1,
    color: 'white',
  },
});
