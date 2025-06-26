import type { ChipOptionProps } from '../Chip/type';
import React from 'react';

export interface DropDownProps {
  options: ChipOptionProps[];
  maxHeight?: number;
  onSelect?: (value: string | number) => void;
  renderButton: React.ReactNode;
}
