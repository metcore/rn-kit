import React from 'react';
import { View, ViewStyle } from 'react-native';

interface ColProps {
  children: React.ReactNode;
  size?: number;
  style?: ViewStyle;
}

const Col: React.FC<ColProps> = ({ children, size = 12, style }) => {
  const widthPercent = (size / 12) * 100;

  return <View style={[{ width: `${widthPercent}%` }, style]}>{children}</View>;
};

export default Col;
