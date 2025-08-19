import React from 'react';
import { type ViewStyle } from 'react-native';
import User from './icons/User';
import Eye from './icons/Eye';
import XCircle from './icons/XCircle';
import ArrowRight from './icons/ArrowRight';
import Document from './icons/Document';
import Calendar from './icons/Calendar';
import Download from './icons/Download';
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
import Times from './icons/Times';
import ArrowDown from './icons/ArrowDown';
import ArrowUp from './icons/ArrowUp';
import Search from './icons/Search';
import ArrowLeft from './icons/ArrowLeft';
import EyeOpen from './icons/EyeOpen';
import ExclamationMark from './icons/ExclamationMark';
import FileListCheck from './icons/FileListCheck';
import FileText from './icons/FileText';
import FolderClock from './icons/FolderClock';
import HomeFill from './icons/HomeFill';
import HomeOutline from './icons/HomeOutline';
import Plus from './icons/Plus';
import UserCircleFill from './icons/UserCircleFill';
import UserCircleOutline from './icons/UserCircleOutline';
import ClipBoardListCheck from './icons/ClipBoardListCheck';
import ClipBoardList from './icons/ClipBoardList';
import Megaphone from './icons/Megaphone';
import Bell from './icons/Bell';
import BookmarkUser from './icons/BookmarkUser';
import Scanner from './icons/Scanner';
import ClockOutline from './icons/ClockOutline';
import Clock from './icons/Clock';
import BoxOutline from './icons/BoxOutline';
import ClipBoardListCheckOutline from './icons/ClipBoardListCheckOutline';
import Box from './icons/Box';
import Minus from './icons/Minus';
import PlusSquare from './icons/PlusSquare';
import AtSign from './icons/AtSign';
import BriefCaseOutline from './icons/BriefcaseOutline';
import EditSquareOutline from './icons/Edit';
import GlobeEarth from './icons/GlobeEarth';
import LockFill from './icons/LockFill';
import LogoHercaHris from './icons/LogoHercaHris';
import QuestionCircleOutline from './icons/QuestionCircleOutline';
import ShieldFill from './icons/ShieldFill';
import Users from './icons/Users';
import WhatsAppFill from './icons/WhatsappFill';
import Bold from './icons/Bold';
import Italic from './icons/Italic';
import UnderLine from './icons/UnderLine';
import SettingsSlider from './icons/SettingsSlider';
import RotateSquareFill from './icons/RotateSquareFill';
import LocationPinFill from './icons/LocationPinFill';
import DiscountFill from './icons/DiscountFill';
import CopyFill from './icons/CopyFill';
import CopyTextFill from './icons/CopyTextFill';
import ShieldCheckedFill from './icons/ShieldFillChecked';

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
  'ExclamationMark': ExclamationMark,
  'Download': Download,
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
  'Minus': Minus,
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
  'Scanner': Scanner,
  'clock-outline': ClockOutline,
  'Clock': Clock,
  'box-outline': BoxOutline,
  'clipboard-list-check-outline': ClipBoardListCheckOutline,
  'Box': Box,
  'plus-square': PlusSquare,
  'at-sign': AtSign,
  'briefcase-outline': BriefCaseOutline,
  'edit-square-outline': EditSquareOutline,
  'globe-earth': GlobeEarth,
  'lock-fill': LockFill,
  'logo-herca-hris': LogoHercaHris,
  'question-circle-outline': QuestionCircleOutline,
  'shield-fill': ShieldFill,
  'Users': Users,
  'whatsapp-fill': WhatsAppFill,
  'Bold': Bold,
  'Italic': Italic,
  'UnderLine': UnderLine,
  'settings-slider': SettingsSlider,
  'rotate-square-fill': RotateSquareFill,
  'location-pin-fill': LocationPinFill,
  'discount-fill': DiscountFill,
  'copy-fill': CopyFill,
  'copy-text-fill': CopyTextFill,
  'shield-checked-fill': ShieldCheckedFill,
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
