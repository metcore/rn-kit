import type { ChipOptionProps } from '../Chip/type';
import React from 'react';

export interface DropDownProps {
  options: ChipOptionProps[];
  maxHeight?: number;
  onSelect?: (value: string | number) => void;
  renderButton: React.ReactNode;
  renderItem?: (item: ChipOptionProps, index: number) => React.ReactNode;
  width?: number;
  value?: string | number | null;
}
