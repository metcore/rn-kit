import RnKit from './NativeRnKit';

export function multiply(a: number, b: number): number {
  return RnKit.multiply(a, b);
}

export { default as Accordion } from './Accordion/Accordion';
export { default as AccordionItem } from './Accordion/AccordionItem';
export type { AccordionRenderHeaderProps } from './Accordion/type';
export { default as Button } from './Button/Button';
export { default as Color } from './Color/Color';
export type { ColorVariantType } from './Color/type';
export { default as Typography } from './Typography/Typography';
export type {
  fontSizeMap,
  fontWeightMap,
  lineHeightMap,
  TypographyVariantProps,
} from './Typography/type';
export { default as BottomSheet } from './BottomSheet/BottomSheet';
export { default as Container } from './Ui/Container';
export { default as Card } from './Ui/Card';
export { default as DropDown } from './DropDown/DropDown';
export { default as Center } from './Ui/Center';
export { default as Gap } from './Ui/Gap';
export { default as Grid } from './Ui/Grid';
export { default as Col } from './Ui/Col';
export { default as Chip } from './Chip/Chip';
export { default as ChipItem } from './Chip/ChipItem';
export type {
  ChipSelectedProps,
  ChipOnSelectProps,
  ChipOptionProps,
} from './Chip/type';
export { default as Footer } from './Ui/Footer';
export { default as Devider } from './Ui/Devider';
export { default as Select } from './Select/Select';
export type { SelectRenderItemProps } from './Select/type';
export { default as LabelForm } from './LabelForm/LabelForm';
export { default as Input } from './Input/Input';
export { default as InputPassword } from './Input/InputPassword';
export { default as InputFile } from './Input/InputFile';
export { default as InputOtp } from './Input/InputOtp';
export { default as Switch } from './Input/Switch';
export { default as CheckBox } from './CheckBox/CheckBox';
export { default as CheckBoxList } from './CheckBox/CheckBoxList';
export { default as RadioButton } from './RadioButton/RadioButton';
export { default as Icon } from './Icon/Icon';
export type { IconNameProps } from './Icon/type';
export { default as Modal } from './Modal/Modal';
export { default as Label } from './Label/Label';
export { default as List } from './List/List';
export { default as ListItem } from './List/ListItem';
export { default as Loading } from './Loading/Loading';
export { default as Avatar } from './Avatar/Avatar';
export { default as AvatarGroup } from './Avatar/AvatarGroup';
export { default as Spinner } from './Spinner/Spinner';
export { default as Badge } from './Badge/Badge';
export type {
  Variant as BadgeVariant,
  Size as BadgeSize,
  HexColor as BadgeColor,
  SizeStyle as BadgeSizeStyle,
} from './Badge/type';
export { default as Alert } from './Alert/Alert';
export { default as Timeline } from './Timeline/Timeline';
export { default as TimelineItem } from './Timeline/TimelineItem';
export { default as Theme } from './Theme/Theme';
export { default as Provider } from './Provider/Provider';
export { default as useFooter } from './Provider/Provider';
export { default as Drawing } from './Drawing/Drawing';
export { default as Calendar } from './Calendar/Calendar';
export type {
  DateRangeProps,
  DateProps,
  CalendarModeType,
} from './Calendar/CalendarPropsType';
export { default as DatePicker } from './DatePicker/DatePicker';
export { default as YearPicker } from './DatePicker/YearPicker';
export { default as MonthPicker } from './DatePicker/MonthPicker';
export { default as TimePicker } from './DatePicker/TimePicker';
export { default as Step } from './Step/Step';
export { default as StepItem } from './Step/StepItem';
export { default as Tab } from './Tab/Tab';
export { default as TabItem } from './Tab/TabItem';
export { default as Toast } from './Toast/Toast';
export { default as TextArea } from './Input/TextArea';
export { default as TextEditor } from './TextEditor/TextEditor';
// export { default as PdfView } from './FileView/PdfView';
export { ToastProvider, useToast } from './Toast/ToastContext';
export { default as Skeleton } from './Skeleton/Skeleton';
export type { SkeletonProps } from './Skeleton/type';
export { default as CounterButton } from './CounterButton/CounterButton';
export { default as BadgeIcon } from './BadgeIcon/BadgeIcon';
export { default as PdfView } from './FileView/PdfView';
export { default as InputSelect } from './Input/InputSelect';
export type { ChipValue } from './Chip/type';
export { default as InputDate } from './Input/InputDate';
export { dateFormatter } from './function/dateFormatter';
export { default as ViewInsets } from './Ui/ViewInsets';
