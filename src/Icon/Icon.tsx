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
import CalendarEdit from './icons/CalendarEdit';
import InfoCircleOutline from './icons/InfoCircleOutline';
import Tag from './icons/Tag';
import Tool from './icons/Tool';
import UserEdit from './icons/UserEdit';
import ImagePlus from './icons/ImagePlus';
import Bolt from './icons/Bolt';
import BoltSlash from './icons/BoltSlash';
import Trash from './icons/Trash';
import TimeForward from './icons/TimeForward';
import Signature from './icons/Signature';
import Money from './icons/Money';
import InfoCircleFill from './icons/InfoCircleFill';
import Flag from './icons/Flag';
import Coupon from './icons/Coupon';
import MoreVertical from './icons/MoreVertical';
import ExclamationTriangle from './icons/ExclamationTriangle';
import PdfFile from './icons/PdfFile';
import RotateRight from './icons/RotateRight';
import ArrowUpCircleFill from './icons/ArrowUpCircleFill';
import ClipBoardListCheck2 from './icons/ClipBoardListCheck2';
import Phone from './icons/Phone';
import Envelope from './icons/Envelope';
import AlignCenter from './icons/AlignCenter';
import AlignLeft from './icons/AlignLeft';
import AlignRight from './icons/AlignRight';
import StrikeThrough from './icons/StrikeThrough';
import Link from './icons/Link';
import ListOrdered from './icons/ListOrdered';
import ListUnOrdered from './icons/ListUnOrdered';
import BriefcaseFillBulk from './icons/BriefcaseFillBulk';
import LocationPinOutline from './icons/LocationPinOutline';
import CarOutline from './icons/CarOutline';
import MoneyDown from './icons/MoneyDown';
import CommentFill from './icons/CommentFill';
import ShareUp from './icons/ShareUp';
import StopwatchFill from './icons/StopwatchFill';
import TimesNew from './icons/TimesNew';
import UserCircleMoneyUp from './icons/UserCircleMoneyUp';
import CreditCard from './icons/CreditCard';
import FaceId from './icons/FaceId';
import BriefcaseFill from './icons/BriefcaseFill';
import UserTagFill from './icons/UserTagFill';
import Cake from './icons/Cake';
import Building from './icons/Building';
import WarningLetter from './icons/WarningLetter';
import DocumentList from './icons/DocumentList';
import UserClock from './icons/UserClock';
import Receipt from './icons/Receipt';
import DocumentListPay from './icons/DocumentListPay';
import SettingGear from './icons/SettingGear';
import Pencil from './icons/Pencil';
import CalendarCheck from './icons/CalendarCheck';
import CalendarClose from './icons/CalendarClose';
import FileListPlus from './icons/FileListPlus';
import Logout from './icons/Logout';
import Login from './icons/Login';
import CreditCardFill from './icons/CreditCardFill';
import FilelistPlusOutline from './icons/FileListPlusOutline';
import GridFillBulk from './icons/GridFillBulk';
import HourGlassFillBulk from './icons/HourGlassFillBulk';
import MoneyUpFillBulk from './icons/MoneyUpFillBulk';
import PlaneFillBulk from './icons/PlaneFillBulk';
import RotateCardFillBulk from './icons/RotateCardFillBulk';
import StopwatchCheckFill from './icons/StopwatchCheckFill';
import StopwatchCheckOutline from './icons/StopwatchCheckOutline';
import UserCheckFillBulk from './icons/UserCheckFillBulk';
import StopwatchFill2 from './icons/StopwatchFill2';
import ArrowRightLong from './icons/ArrowRightLong';

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
  'calendar-edit': CalendarEdit,
  'info-circle-outline': InfoCircleOutline,
  'user-edit': UserEdit,
  'Tag': Tag,
  'Tool': Tool,
  'Bolt': Bolt,
  'bolt-slash': BoltSlash,
  'image-plus': ImagePlus,
  'Trash': Trash,
  'time-forward': TimeForward,
  'Signature': Signature,
  'Money': Money,
  'info-circle-fill': InfoCircleFill,
  'Flag': Flag,
  'Coupon': Coupon,
  'more-vertical': MoreVertical,
  'exclamation-triangle': ExclamationTriangle,
  'pdf-file': PdfFile,
  'rotate-right': RotateRight,
  'arrow-up-circle-fill': ArrowUpCircleFill,
  'clipboard-list-check-fill-2': ClipBoardListCheck2,
  'Phone': Phone,
  'Envelope': Envelope,
  'align-center': AlignCenter,
  'align-left': AlignLeft,
  'align-right': AlignRight,
  'strike-through': StrikeThrough,
  'Link': Link,
  'list-ordered': ListOrdered,
  'list-un-ordered': ListUnOrdered,
  'briefcase-fill-bulk': BriefcaseFillBulk,
  'location-pin-outline': LocationPinOutline,
  'car-outline': CarOutline,
  'money-down': MoneyDown,
  'comment-fill': CommentFill,
  'share-up': ShareUp,
  'stopwatch-fill': StopwatchFill,
  'times-new': TimesNew,
  'user-circle-money-up': UserCircleMoneyUp,
  'credit-card': CreditCard,
  'FaceId': FaceId,
  'briefcase-fill': BriefcaseFill,
  'user-tag-fill': UserTagFill,
  'Cake': Cake,
  'Building': Building,
  'warning-letter': WarningLetter,
  'document-list': DocumentList,
  'document-list-pay': DocumentListPay,
  'user-clock': UserClock,
  'Receipt': Receipt,
  'setting-gear': SettingGear,
  'Pencil': Pencil,
  'calendar-check': CalendarCheck,
  'calendar-close': CalendarClose,
  'file-list-plus': FileListPlus,
  'Login': Login,
  'Logout': Logout,
  'credit-card-fill': CreditCardFill,
  'file-list-plus-outline': FilelistPlusOutline,
  'grid-fill-bulk': GridFillBulk,
  'hourglass-fill-bulk': HourGlassFillBulk,
  'money-up-fill-bulk': MoneyUpFillBulk,
  'plane-fill-bulk': PlaneFillBulk,
  'rotate-card-fill-bulk': RotateCardFillBulk,
  'stopwatch-check-fill': StopwatchCheckFill,
  'stopwatch-check-outline': StopwatchCheckOutline,
  'user-check-fill-bulk': UserCheckFillBulk,
  'stopwatch-fill-2': StopwatchFill2,
  'arrow-right-long': ArrowRightLong,
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
