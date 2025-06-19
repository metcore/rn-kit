import React from 'react';
import type { ChipSelectedProps } from '../Chip/type';

export interface SelectDataProps {
  value: string | number;
  label: string | number;
}
export interface SelectProps {
  isOpen?: boolean;
  multiple?: boolean;
  data: SelectDataProps;
  renderItem?: React.ReactNode;
  onSubmit?: (val: ChipSelectedProps) => void;
  onClose?: (val: boolean) => void;
  onSearch: (val: string) => void;
  required?: boolean;
}
