import React from 'react';
import { StyleSheet, View } from 'react-native';
import Color from '../Color/Color';
import Theme from '../Theme/Theme';

export default function List({ children }: { children: React.ReactNode }) {
  const validChildren = React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  );

  return (
    <View style={styles.container}>
      {React.Children.map(validChildren, (child, index) => {
        const isLast = index === validChildren.length - 1;
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { isLast });
        }
        return child;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginBottom: 16,
    borderWidth: 1,
    borderRadius: Theme.radius.md,
    borderColor: Color.gray[100],
    overflow: 'hidden',
  },
});
