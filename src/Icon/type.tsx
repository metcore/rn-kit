// src/icons/types.ts

import { type ViewStyle } from 'react-native';

export type IconNameProps =
  | 'Search'
  | 'User'
  | 'Eye'
  | 'EyeOpen'
  | 'ArrowRight'
  | 'ArrowLeft'
  | 'Document'
  | 'Calendar'
  | 'ExclamationMark'
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
  | 'Times'
  | 'Plus'
  | 'Minus'
  | 'Bell'
  | 'file-list-check'
  | 'file-text'
  | 'bookmark-user'
  | 'folder-clock'
  | 'home-fill'
  | 'home-outline'
  | 'user-circle-outline'
  | 'user-circle-fill'
  | 'clipboard-list-check'
  | 'clipboard-list'
  | 'Megaphone'
  | 'Scanner'
  | 'Clock'
  | 'clock-outline'
  | 'clipboard-list-check-outline'
  | 'box-outline'
  | 'Box'
  | 'plus-square'
  | 'at-sign'
  | 'briefcase-outline'
  | 'edit-square-outline'
  | 'globe-earth'
  | 'lock-fill'
  | 'logo-herca-hris'
  | 'question-circle-outline'
  | 'shield-fill'
  | 'Users'
  | 'whatsapp-fill';

export interface IconProps {
  name: IconNameProps;
  size?: number;
  color?: string;
  style?: ViewStyle;
}
