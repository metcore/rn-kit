import React from 'react';
import { View } from 'react-native';
import { type ViewStyle } from 'react-native';

interface ColProps {
  children: React.ReactNode;
  size?: number;
  style?: ViewStyle;
  testID?: string;
}

const Col: React.FC<ColProps> = ({ children, size = 12, style, testID }) => {
  const widthPercent = (size / 12) * 100;

  return (
    <View testID={testID} style={[{ width: `${widthPercent}%` }, style]}>
      {children}
    </View>
  );
};

export default Col;
