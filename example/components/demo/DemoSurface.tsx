import React from 'react';
import { StyleSheet, View, type ViewStyle, type StyleProp } from 'react-native';
import { Color } from '@herca/rn-kit';

interface DemoSurfaceProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const DemoSurface: React.FC<DemoSurfaceProps> = ({ style, children }) => {
  return <View style={[styles.surface, style]}>{children}</View>;
};

export default DemoSurface;

const styles = StyleSheet.create({
  surface: {
    backgroundColor: Color.primary[50],
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
});
