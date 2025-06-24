import type { ColorValue, GestureResponderEvent } from 'react-native';
import Color from '../Color/Color';
import type { ColorVariantType } from '../Color/type';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'default' | 'outline' | 'tertiary';
export interface ButtonProps {
  children?: React.ReactNode;
  title?: string | React.ReactNode;
  onPress?: (event?: GestureResponderEvent) => void;
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ColorVariantType;
  disabled?: boolean;
  width?: number | string;
  block?: boolean;
  loading?: boolean;
}

export const COLOR_MAP: Record<
  ColorVariantType,
  {
    backgroundColor: string;
    textColor: string;
    borderColor: string;
    focusBackgroundColor: string;
    focusTextColor: string;
    focusBoorderColor: string;
    pressBackgroundColor: string;
    pressTextColor: string;
    pressBorderColor: string;
    disabledBackgroundColor: string;
    disabledTextColor: string;
    disabledBorderColor: string;

    outlineBackgroundColor: ColorValue;
    outlineTextColor: ColorValue;
    outlineBorderColor: ColorValue;
    outlineFocusBorderColor: ColorValue;
    outlineFocusTextColor: ColorValue;
    outlinePressBorderColor: ColorValue;
    outlinePressTextColor: ColorValue;
    outlineDisabledBorderColor: ColorValue;
    outlineDisabledTextColor: ColorValue;

    tertiaryBackgroundColor: ColorValue;
    tertiaryTextColor: ColorValue;
    tertiaryBorderColor: ColorValue;
    tertiaryFocusBorderColor: ColorValue;
    tertiaryFocusTextColor: ColorValue;
    tertiaryPressBorderColor: ColorValue;
    tertiaryPressTextColor: ColorValue;
    tertiaryDisabledBorderColor: ColorValue;
    tertiaryDisabledTextColor: ColorValue;
  }
> = {
  default: {
    backgroundColor: Color.gray[700],
    textColor: Color.base.white100,
    borderColor: Color.gray[700],
    focusBackgroundColor: Color.gray[700],
    focusBoorderColor: Color.gray[300],
    focusTextColor: Color.base.white100,
    pressBackgroundColor: Color.gray[800],
    pressBorderColor: Color.gray[800],
    pressTextColor: Color.base.white100,
    disabledBackgroundColor: Color.gray[300],
    disabledTextColor: Color.base.white100,
    disabledBorderColor: Color.gray[300],

    outlineBackgroundColor: Color.base.white100,
    outlineTextColor: Color.gray[700],
    outlineBorderColor: Color.gray[700],
    outlineFocusTextColor: Color.gray[700],
    outlineFocusBorderColor: Color.gray[300],
    outlinePressTextColor: Color.gray[800],
    outlinePressBorderColor: Color.gray[800],
    outlineDisabledTextColor: Color.gray[300],
    outlineDisabledBorderColor: Color.gray[300],

    tertiaryBackgroundColor: 'transparent',
    tertiaryTextColor: Color.gray[700],
    tertiaryBorderColor: 'transparent',
    tertiaryFocusTextColor: Color.gray[700],
    tertiaryFocusBorderColor: Color.gray[300],
    tertiaryPressTextColor: Color.gray[800],
    tertiaryPressBorderColor: 'transparent',
    tertiaryDisabledTextColor: Color.gray[300],
    tertiaryDisabledBorderColor: Color.base.white100,
  },
  primary: {
    backgroundColor: Color.primary[1000],
    textColor: Color.base.white100,
    borderColor: Color.primary[1000],
    focusBackgroundColor: Color.primary[1000],
    focusBoorderColor: Color.primary[200],
    focusTextColor: Color.base.white100,
    pressBackgroundColor: Color.primary[950],
    pressBorderColor: Color.primary[950],
    pressTextColor: Color.base.white100,
    disabledBackgroundColor: Color.primary[100],
    disabledTextColor: Color.base.white100,
    disabledBorderColor: Color.primary[100],

    outlineBackgroundColor: Color.base.white100,
    outlineTextColor: Color.primary[1000],
    outlineBorderColor: Color.primary[1000],
    outlineFocusTextColor: Color.primary[1000],
    outlineFocusBorderColor: Color.primary[300],
    outlinePressTextColor: Color.primary[950],
    outlinePressBorderColor: Color.primary[800],
    outlineDisabledTextColor: Color.primary[100],
    outlineDisabledBorderColor: Color.primary[100],

    tertiaryBackgroundColor: 'transparent',
    tertiaryTextColor: Color.primary[1000],
    tertiaryBorderColor: 'transparent',
    tertiaryFocusTextColor: Color.primary[950],
    tertiaryFocusBorderColor: Color.primary[300],
    tertiaryPressTextColor: Color.primary[950],
    tertiaryPressBorderColor: 'transparent',
    tertiaryDisabledTextColor: Color.primary[100],
    tertiaryDisabledBorderColor: Color.base.white100,
  },
  success: {
    backgroundColor: Color.success[500],
    textColor: Color.base.white100,
    borderColor: Color.success[500],
    focusBackgroundColor: Color.success[500],
    focusBoorderColor: Color.success[100],
    focusTextColor: Color.base.white100,
    pressBackgroundColor: Color.success[600],
    pressBorderColor: Color.success[600],
    pressTextColor: Color.base.white100,
    disabledBackgroundColor: Color.success[100],
    disabledTextColor: Color.base.white100,
    disabledBorderColor: Color.success[100],

    outlineBackgroundColor: Color.base.white100,
    outlineTextColor: Color.success[500],
    outlineBorderColor: Color.success[500],
    outlineFocusTextColor: Color.success[500],
    outlineFocusBorderColor: Color.success[100],
    outlinePressTextColor: Color.success[600],
    outlinePressBorderColor: Color.success[600],
    outlineDisabledTextColor: Color.success[300],
    outlineDisabledBorderColor: Color.success[300],

    tertiaryBackgroundColor: 'transparent',
    tertiaryTextColor: Color.success[500],
    tertiaryBorderColor: 'transparent',
    tertiaryFocusTextColor: Color.success[500],
    tertiaryFocusBorderColor: Color.success[100],
    tertiaryPressTextColor: Color.success[600],
    tertiaryPressBorderColor: 'transparent',
    tertiaryDisabledTextColor: Color.success[100],
    tertiaryDisabledBorderColor: Color.base.white100,
  },
  danger: {
    backgroundColor: Color.danger[500],
    textColor: Color.base.white100,
    borderColor: Color.danger[500],
    focusBackgroundColor: Color.danger[500],
    focusBoorderColor: Color.danger[100],
    focusTextColor: Color.base.white100,
    pressBackgroundColor: Color.danger[600],
    pressBorderColor: Color.danger[600],
    pressTextColor: Color.base.white100,
    disabledBackgroundColor: Color.danger[100],
    disabledTextColor: Color.base.white100,
    disabledBorderColor: Color.danger[100],

    outlineBackgroundColor: Color.base.white100,
    outlineTextColor: Color.danger[500],
    outlineBorderColor: Color.danger[500],
    outlineFocusTextColor: Color.danger[500],
    outlineFocusBorderColor: Color.danger[100],
    outlinePressTextColor: Color.danger[700],
    outlinePressBorderColor: Color.danger[700],
    outlineDisabledTextColor: Color.danger[300],
    outlineDisabledBorderColor: Color.danger[300],

    tertiaryBackgroundColor: 'transparent',
    tertiaryTextColor: Color.danger[600],
    tertiaryBorderColor: 'transparent',
    tertiaryFocusTextColor: Color.danger[600],
    tertiaryFocusBorderColor: Color.danger[200],
    tertiaryPressTextColor: Color.danger[700],
    tertiaryPressBorderColor: 'transparent',
    tertiaryDisabledTextColor: Color.danger[100],
    tertiaryDisabledBorderColor: Color.base.white100,
  },
  warning: {
    backgroundColor: Color.warning[400],
    textColor: Color.base.white100,
    borderColor: Color.warning[400],
    focusBackgroundColor: Color.warning[400],
    focusBoorderColor: Color.warning[200],
    focusTextColor: Color.base.white100,
    pressBackgroundColor: Color.warning[500],
    pressBorderColor: Color.warning[500],
    pressTextColor: Color.base.white100,
    disabledBackgroundColor: Color.warning[100],
    disabledTextColor: Color.base.white100,
    disabledBorderColor: Color.warning[100],

    outlineBackgroundColor: Color.base.white100,
    outlineTextColor: Color.warning[400],
    outlineBorderColor: Color.warning[400],
    outlineFocusTextColor: Color.warning[400],
    outlineFocusBorderColor: Color.warning[100],
    outlinePressTextColor: Color.warning[200],
    outlinePressBorderColor: Color.warning[200],
    outlineDisabledTextColor: Color.warning[100],
    outlineDisabledBorderColor: Color.warning[100],

    tertiaryBackgroundColor: 'transparent',
    tertiaryTextColor: Color.warning[400],
    tertiaryBorderColor: 'transparent',
    tertiaryFocusTextColor: Color.warning[400],
    tertiaryFocusBorderColor: Color.warning[200],
    tertiaryPressTextColor: Color.warning[500],
    tertiaryPressBorderColor: 'transparent',
    tertiaryDisabledTextColor: Color.warning[100],
    tertiaryDisabledBorderColor: Color.base.white100,
  },
  info: {
    backgroundColor: Color.info[500],
    textColor: Color.base.white100,
    borderColor: Color.info[500],
    focusBackgroundColor: Color.info[500],
    focusBoorderColor: Color.info[200],
    focusTextColor: Color.base.white100,
    pressBackgroundColor: Color.info[700],
    pressBorderColor: Color.info[700],
    pressTextColor: Color.gray[200],
    disabledBackgroundColor: Color.info[100],
    disabledTextColor: Color.base.white100,
    disabledBorderColor: Color.info[100],

    outlineBackgroundColor: Color.base.white100,
    outlineTextColor: Color.info[500],
    outlineBorderColor: Color.info[500],
    outlineFocusTextColor: Color.info[500],
    outlineFocusBorderColor: Color.info[200],
    outlinePressTextColor: Color.info[700],
    outlinePressBorderColor: Color.info[700],
    outlineDisabledTextColor: Color.info[100],
    outlineDisabledBorderColor: Color.info[100],

    tertiaryBackgroundColor: 'transparent',
    tertiaryTextColor: Color.info[500],
    tertiaryBorderColor: 'transparent',
    tertiaryFocusTextColor: Color.info[500],
    tertiaryFocusBorderColor: Color.info[200],
    tertiaryPressTextColor: Color.info[700],
    tertiaryPressBorderColor: 'transparent',
    tertiaryDisabledTextColor: Color.info[100],
    tertiaryDisabledBorderColor: Color.base.white100,
  },
  orange: {
    backgroundColor: Color.orange[500],
    textColor: Color.base.white100,
    borderColor: Color.orange[500],
    focusBackgroundColor: Color.orange[500],
    focusBoorderColor: Color.orange[200],
    focusTextColor: Color.base.white100,
    pressBackgroundColor: Color.orange[700],
    pressBorderColor: Color.orange[700],
    pressTextColor: Color.base.white100,
    disabledBackgroundColor: Color.orange[100],
    disabledTextColor: Color.base.white100,
    disabledBorderColor: Color.orange[100],

    outlineBackgroundColor: Color.base.white100,
    outlineTextColor: Color.orange[500],
    outlineBorderColor: Color.orange[500],
    outlineFocusTextColor: Color.orange[500],
    outlineFocusBorderColor: Color.orange[200],
    outlinePressTextColor: Color.orange[700],
    outlinePressBorderColor: Color.orange[700],
    outlineDisabledTextColor: Color.orange[100],
    outlineDisabledBorderColor: Color.orange[100],

    tertiaryBackgroundColor: 'transparent',
    tertiaryTextColor: Color.orange[500],
    tertiaryBorderColor: 'transparent',
    tertiaryFocusTextColor: Color.orange[500],
    tertiaryFocusBorderColor: Color.orange[200],
    tertiaryPressTextColor: Color.orange[700],
    tertiaryPressBorderColor: 'transparent',
    tertiaryDisabledTextColor: Color.orange[100],
    tertiaryDisabledBorderColor: Color.base.white100,
  },
  purple: {
    backgroundColor: Color.purple[500],
    textColor: Color.base.white100,
    borderColor: Color.purple[500],
    focusBackgroundColor: Color.purple[500],
    focusBoorderColor: Color.purple[200],
    focusTextColor: Color.base.white100,
    pressBackgroundColor: Color.purple[700],
    pressBorderColor: Color.purple[700],
    pressTextColor: Color.base.white100,
    disabledBackgroundColor: Color.purple[100],
    disabledTextColor: Color.base.white100,
    disabledBorderColor: Color.purple[100],

    outlineBackgroundColor: Color.base.white100,
    outlineTextColor: Color.purple[500],
    outlineBorderColor: Color.purple[500],
    outlineFocusTextColor: Color.purple[500],
    outlineFocusBorderColor: Color.purple[200],
    outlinePressTextColor: Color.purple[700],
    outlinePressBorderColor: Color.purple[700],
    outlineDisabledTextColor: Color.purple[100],
    outlineDisabledBorderColor: Color.purple[100],

    tertiaryBackgroundColor: 'transparent',
    tertiaryTextColor: Color.purple[500],
    tertiaryBorderColor: 'transparent',
    tertiaryFocusTextColor: Color.purple[500],
    tertiaryFocusBorderColor: Color.purple[200],
    tertiaryPressTextColor: Color.purple[700],
    tertiaryPressBorderColor: 'transparent',
    tertiaryDisabledTextColor: Color.purple[100],
    tertiaryDisabledBorderColor: Color.base.white100,
  },
};
