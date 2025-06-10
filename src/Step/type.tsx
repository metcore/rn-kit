import type { StyleProp, ViewStyle } from 'react-native';
import React, { type ReactElement } from 'react';

export interface StepItemProps {
  index?: number;
  isActive?: boolean;
  isCompleted?: boolean;
  isLast?: boolean;
  isHeader?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  title?: string;
}
export interface StepProps {
  children: ReactElement<StepItemProps> | ReactElement<StepItemProps>[];
  current: number;
  onChangeStep: (e: any) => void;
}
