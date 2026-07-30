import React from 'react';
import { StyleSheet, View, type ViewStyle, type StyleProp } from 'react-native';

interface DemoRowProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const DemoRow: React.FC<DemoRowProps> = ({ style, children }) => {
  return <View style={[styles.row, style]}>{children}</View>;
};

export default DemoRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    alignItems: 'center',
  },
});
