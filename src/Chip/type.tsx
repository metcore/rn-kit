import type { ColorValue } from 'react-native';
import Color from '../Color/Color';
import type { ColorVariantType } from '../Color/type';

export const CHIP_COLOR_MAP: Record<
  ColorVariantType,
  {
    backgroundColor: ColorValue;
    textColor: ColorValue;
    borderColor: ColorValue;
    selectedBackgroundColor: ColorValue;
    selectedBorderColor: ColorValue;
    selectedTextColor: ColorValue;
    disabledBackgroundColor: ColorValue;
    disabledBorderColor: ColorValue;
    disabledTextColor: ColorValue;
  }
> = {
  default: {
    backgroundColor: Color.gray[600],
    textColor: Color.base.white100,
    borderColor: Color.gray[600],
    selectedBackgroundColor: Color.gray[600],
    selectedBorderColor: Color.gray[200],
    selectedTextColor: Color.gray[200],
    disabledBackgroundColor: Color.gray[600],
    disabledBorderColor: Color.gray[200],
    disabledTextColor: Color.gray[200],
  },
  success: {
    backgroundColor: Color.base.white100,
    textColor: Color.success[900],
    borderColor: Color.success[200],
    selectedBackgroundColor: Color.success[50],
    selectedBorderColor: Color.success[200],
    selectedTextColor: Color.success[900],
    disabledBackgroundColor: Color.success[100],
    disabledBorderColor: Color.success[100],
    disabledTextColor: Color.base.white100,
  },
  danger: {
    backgroundColor: Color.base.white100,
    textColor: Color.danger[900],
    borderColor: Color.danger[200],
    selectedBackgroundColor: Color.danger[50],
    selectedBorderColor: Color.danger[200],
    selectedTextColor: Color.danger[900],
    disabledBackgroundColor: Color.danger[100],
    disabledBorderColor: Color.danger[100],
    disabledTextColor: Color.base.white100,
  },
  primary: {
    backgroundColor: Color.base.white100,
    textColor: Color.primary[1000],
    borderColor: Color.primary[200],
    selectedBackgroundColor: Color.primary[50],
    selectedBorderColor: Color.primary[200],
    selectedTextColor: Color.primary[1000],
    disabledBackgroundColor: Color.primary[100],
    disabledBorderColor: Color.primary[100],
    disabledTextColor: Color.base.white100,
  },
  warning: {
    backgroundColor: Color.base.white100,
    textColor: Color.warning[900],
    borderColor: Color.warning[200],
    selectedBackgroundColor: Color.warning[50],
    selectedBorderColor: Color.warning[200],
    selectedTextColor: Color.warning[900],
    disabledBackgroundColor: Color.warning[100],
    disabledBorderColor: Color.warning[100],
    disabledTextColor: Color.base.white100,
  },
  info: {
    backgroundColor: Color.base.white100,
    textColor: Color.info[900],
    borderColor: Color.info[200],
    selectedBackgroundColor: Color.info[50],
    selectedBorderColor: Color.info[200],
    selectedTextColor: Color.info[900],
    disabledBackgroundColor: Color.info[100],
    disabledBorderColor: Color.info[100],
    disabledTextColor: Color.base.white100,
  },
  orange: {
    backgroundColor: Color.base.white100,
    textColor: Color.orange[900],
    borderColor: Color.orange[200],
    selectedBackgroundColor: Color.orange[50],
    selectedBorderColor: Color.orange[200],
    selectedTextColor: Color.orange[900],
    disabledBackgroundColor: Color.orange[100],
    disabledBorderColor: Color.orange[100],
    disabledTextColor: Color.base.white100,
  },
  purple: {
    backgroundColor: Color.base.white100,
    textColor: Color.purple[900],
    borderColor: Color.purple[200],
    selectedBackgroundColor: Color.purple[50],
    selectedBorderColor: Color.purple[200],
    selectedTextColor: Color.purple[900],
    disabledBackgroundColor: Color.purple[100],
    disabledBorderColor: Color.purple[100],
    disabledTextColor: Color.base.white100,
  },
};

export interface ChipOptionProps {
  label: string | number;
  value: string | number;
  disabled?: boolean;
  [key: string]: string | number | boolean | undefined;
}
export type ChipValue = number | string | null | undefined | boolean;

export type ChipSelectedProps = ChipValue[];

export type ChipRenderItemFn = (
  item: ChipOptionProps,
  selected: boolean,
  disabled: boolean
) => React.ReactNode;

export type ChipOnSelectProps = (value: ChipSelectedProps) => void;
export interface ChipProps {
  options: ChipOptionProps[];
  selected?: ChipSelectedProps;
  onSelect?: ChipOnSelectProps;
  onPress?: (value: string | number | undefined | null) => void;
  direction?: 'horizontal' | 'vertical';
  scrollable?: boolean;
  block?: boolean;
  multiple?: boolean;
  color?: ColorVariantType;
  size?: 'small' | 'medium' | 'large';
  renderItem?: ChipRenderItemFn;
}
