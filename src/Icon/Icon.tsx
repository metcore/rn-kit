import React from 'react';
import { type ViewStyle } from 'react-native';
import AirPlane from './icons/AirPlane';
import ArrowBackAlt from './icons/ArrowBackAlt';
import ArrowDown from './icons/ArrowDown';
import ArrowForwardAlt from './icons/ArrowForwardAlt';
import ArrowLeft from './icons/ArrowLeft';
import ArrowRight from './icons/ArrowRight';
import ArrowUp from './icons/ArrowUp';
import Bell from './icons/Bell';
import BookmarkUser from './icons/BookmarkUser';
import Calendar from './icons/Calendar';
import Camera from './icons/Camera';
import Check from './icons/Check';
import Document from './icons/Document';
import Downnload from './icons/Download';
import ExlamationMark from './icons/ExlmationMark';
import Eye from './icons/Eye';
import EyeOpen from './icons/EyeOpen';
import FileListCheck from './icons/FileListCheck';
import FileText from './icons/FileText';
import Filter from './icons/Filter';
import FolderClock from './icons/FolderClock';
import HomeFill from './icons/HomeFill';
import HomeOutline from './icons/HomeOutline';
import Image from './icons/Image';
import Pdf from './icons/Pdf';
import Plus from './icons/Plus';
import RadioButton from './icons/RadioButton';
import Search from './icons/Search';
import StickyNote from './icons/StickyNote';
import Times from './icons/Times';
import User from './icons/User';
import UserCircleFill from './icons/UserCircleFill';
import UserCircleOutline from './icons/UserCircleOutline';
import XCircle from './icons/XCircle';
import type { IconNameProps, IconProps } from './type';
import ClipBoardListCheck from './icons/ClipBoardListCheck';
import ClipBoardList from './icons/ClipBoardList';
import Megaphone from './icons/Megaphone';

const icons: Record<
  IconNameProps,
  React.FC<{ size: number; color: string; style?: ViewStyle }>
> = {
  'Search': Search,
  'User': User,
  'Eye': Eye,
  'EyeOpen': EyeOpen,
  'ArrowRight': ArrowRight,
  'ArrowLeft': ArrowLeft,
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
  'Times': Times,
  'ArrowDown': ArrowDown,
  'ArrowUp': ArrowUp,
  'Plus': Plus,
  'Bell': Bell,
  'file-list-check': FileListCheck,
  'file-text': FileText,
  'bookmark-user': BookmarkUser,
  'folder-clock': FolderClock,
  'home-fill': HomeFill,
  'home-outline': HomeOutline,
  'user-circle-outline': UserCircleOutline,
  'user-circle-fill': UserCircleFill,
  'clipboard-list-check': ClipBoardListCheck,
  'clipboard-list': ClipBoardList,
  'Megaphone': Megaphone,
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
