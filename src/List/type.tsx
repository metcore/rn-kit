import type { StyleProp, ViewStyle } from 'react-native';
import React from 'react';
export interface ListItemProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  isLast?: boolean;
}
