import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';

interface GridProps {
  children: React.ReactNode;
  style: ViewStyle;
}

const Grid: React.FC<GridProps> = ({ children, style }) => {
  const childrenArray = React.Children.toArray(children).filter(Boolean);

  return (
    <View style={[styles.row, style]}>
      {childrenArray.map((child, index) => (
        <View key={index} style={styles.children}>
          {child}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  children: {
    paddingHorizontal: 2,
    flex: 1,
  },
});

export default Grid;
