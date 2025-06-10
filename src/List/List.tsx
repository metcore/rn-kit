import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import Color from '../Color/Color';
import Theme from '../Theme/Theme';
import type { ListItemProps } from './type';
interface ListProps {
  children: ReactElement<ListItemProps> | ReactElement<ListItemProps>[];
}

export default function List({ children }: ListProps) {
  const validChildren = React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  );

  return (
    <View style={styles.container}>
      {React.Children.map(validChildren, (child, index) => {
        const isLast = index === validChildren.length - 1;
        return React.isValidElement<ListItemProps>(child)
          ? React.cloneElement(child, { isLast })
          : child;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: Theme.radius.md,
    borderColor: Color.gray[100],
    overflow: 'hidden',
  },
});
