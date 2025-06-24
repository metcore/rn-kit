import React from 'react';
import type { ChipOnSelectProps, ChipOptionProps } from '../Chip/type';
import type { BottomSheetHeighProps } from '../BottomSheet/type';

export interface SelectDataProps {
  value: string | number;
  label: string | number;
}

export type SelectRenderItemProps = (
  item: ChipOptionProps,
  selected: boolean,
  disabled: boolean
) => React.ReactNode;

export interface SelectProps {
  isOpen?: boolean;
  multiple?: boolean;
  data: ChipOptionProps[];
  renderItem?: SelectRenderItemProps;
  onSubmit?: ChipOnSelectProps;
  onClose?: (val: boolean) => void;
  onSearch?: (val: string) => void;
  required?: boolean;
  loading?: boolean;
  delaySearch?: number;
  height?: BottomSheetHeighProps;
  onRefresh?: () => void;
  refreshing?: boolean;
}
