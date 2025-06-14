// src/icons/types.ts

import { type ViewStyle } from 'react-native';

export type IconNameProps =
  | 'Home'
  | 'Search'
  | 'User'
  | 'Eye'
  | 'ArrowRight'
  | 'Document'
  | 'Calendar'
  | 'ExlamationMark'
  | 'Download'
  | 'x-circle'
  | 'StickyNote'
  | 'RadioButton'
  | 'Pdf'
  | 'ArrowBackAlt'
  | 'ArrowForwardAlt'
  | 'ArrowDown'
  | 'ArrowUp'
  | 'Check'
  | 'Filter'
  | 'AirPlane'
  | 'Camera'
  | 'Image'
  | 'Times';

export interface IconProps {
  name: IconNameProps;
  size?: number;
  color?: string;
  style?: ViewStyle;
}
