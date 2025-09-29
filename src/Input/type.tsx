import type { GestureResponderEvent, TextInputProps } from 'react-native';
import type { IconNameProps } from '../Icon';

export interface InputProps extends TextInputProps {
  icon?: IconNameProps;
  iconRight?: IconNameProps;
  label?: string | undefined;
  clearButton?: boolean;
  hasError?: boolean;
  hint?: string;
  onPressIconLeft?: (val?: GestureResponderEvent) => void;
  onPressIconRight?: (val?: GestureResponderEvent) => void;
  onChangeText?: (val: string) => void;
  secureTextEntry?: boolean;
  iconRightColor?: string;
  prefix?: React.ReactNode;
  required?: boolean;
}

export interface TextAreaProps extends InputProps {
  height?: number;
}
