import type { TextInputProps } from 'react-native';
import type { IconNameProps } from '../Icon';

export interface InputProps extends TextInputProps {
  icon?: IconNameProps;
  iconRight?: IconNameProps;
  label?: string | undefined;
  clearButton?: boolean;
  hasError?: boolean;
  hint?: string;
  onPressIconLeft?: () => void;
  onPressIconRight?: () => void;
  onChangeText?: () => void;
  secureTextEntry?: boolean;
}

export interface TextAreaProps extends InputProps {
  height?: number;
}
