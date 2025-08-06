import type { DimensionValue } from 'react-native';

export interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  rounded?: number;
  backgroundColor?: string;
  shimmerColor?: string;
  duration?: number;
}
