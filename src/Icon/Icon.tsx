import React from 'react';
import { type ViewStyle } from 'react-native';
import User from './icons/User';
import Eye from './icons/Eye';
import XCircle from './icons/XCircle';
import ArrowRight from './icons/ArrowRight';
import Document from './icons/Document';
import Calendar from './icons/Calendar';
import ExlamationMark from './icons/ExlmationMark';
import Downnload from './icons/Download';
import StickyNote from './icons/StickyNote';
import Pdf from './icons/Pdf';
import RadioButton from './icons/RadioButton';
import ArrowBackAlt from './icons/ArrowBackAlt';
import ArrowForwardAlt from './icons/ArrowForwardAlt';
import Check from './icons/Check';
import Filter from './icons/Filter';
import AirPlane from './icons/AirPlane';
import Camera from './icons/Camera';
import Image from './icons/Image';
import type { IconNameProps, IconProps } from './type';

const icons: Record<
  IconNameProps,
  React.FC<{ size: number; color: string; style?: ViewStyle }>
> = {
  'Home': User,
  'Search': User,
  'User': User,
  'Eye': Eye,
  'ArrowRight': ArrowRight,
  'Document': Document,
  'Calendar': Calendar,
  'ExlamationMark': ExlamationMark,
  'Download': Downnload,
  'x-circle': XCircle,
  'StickyNote': StickyNote,
  'RadioButton': RadioButton,
  'Pdf': Pdf,
  'ArrowBackAlt': ArrowBackAlt,
  'ArrowForwardAlt': ArrowForwardAlt,
  'Check': Check,
  'Filter': Filter,
  'AirPlane': AirPlane,
  'Camera': Camera,
  'Image': Image,
};

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = '#000',
  style,
}) => {
  const SelectedIcon = icons[name];

  if (!SelectedIcon) {
    return null;
  }

  return <SelectedIcon size={size} color={color} style={style} />;
};

export default Icon;
