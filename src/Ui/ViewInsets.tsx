import { StyleSheet, View, type ViewProps } from 'react-native';
import React, { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ViewInsetsProps extends ViewProps {
  children: React.ReactNode;
  useTop?: boolean;
  useBottom?: boolean;
  useLeft?: boolean;
  useRight?: boolean;
  bottomType?: 'inset' | 'tabbar';
}

const ViewInsets: React.FC<ViewInsetsProps> = ({
  children,
  style,
  useTop = false,
  useBottom = false,
  useLeft = false,
  useRight = false,
  ...rest
}) => {
  const insets = useSafeAreaInsets();

  const defaultStyle = useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingTop: useTop ? insets.top : 0,
          paddingBottom: useBottom ? insets.bottom : 0,
          paddingLeft: useLeft ? insets.left : 0,
          paddingRight: useRight ? insets.right : 0,
          flex: 1,
        },
      }),
    [insets, useTop, useBottom, useLeft, useRight]
  );

  return (
    <View style={[defaultStyle.container, style]} {...rest}>
      {children}
    </View>
  );
};

export default ViewInsets;
