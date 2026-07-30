import type { RootStackParamList } from '../type/navigation';

export interface ComponentCatalogItem {
  label: string;
  screen: keyof RootStackParamList;
}

export interface ComponentCatalogCategory {
  category: string;
  items: ComponentCatalogItem[];
}

export const COMPONENT_CATALOG: ComponentCatalogCategory[] = [
  {
    category: 'Layouts',
    items: [
      { label: 'Typography', screen: 'Typography' },
      { label: 'Container', screen: 'Container' },
      { label: 'Card', screen: 'Card' },
      { label: 'List', screen: 'List' },
      { label: 'Label', screen: 'Label' },
      { label: 'Footer', screen: 'Footer' },
      { label: 'Avatar', screen: 'Avatar' },
      { label: 'Avatar Group', screen: 'AvatarGroup' },
      { label: 'Badge', screen: 'Badge' },
      { label: 'Badge Icon', screen: 'BadgeIcon' },
      { label: 'Alert', screen: 'Alert' },
      { label: 'Toast', screen: 'Toast' },
      { label: 'Spinner', screen: 'Spinner' },
      { label: 'Icons', screen: 'Icons' },
    ],
  },
  {
    category: 'Form Requirment',
    items: [
      { label: 'Button', screen: 'Button' },
      { label: 'Chip Select', screen: 'Chip' },
      { label: 'Counter Button', screen: 'CounterButton' },
      { label: 'Input', screen: 'Input' },
      { label: 'Input Password', screen: 'InputPassword' },
      { label: 'Input Otp', screen: 'InputOtp' },
      { label: 'Input Select', screen: 'InputSelect' },
      { label: 'Input Date', screen: 'InputDate' },
      { label: 'Text Area', screen: 'TextArea' },
      { label: 'Select', screen: 'Select' },
      { label: 'Checkbox', screen: 'CheckBox' },
      { label: 'Radio Button', screen: 'RadioButton' },
      { label: 'Switch', screen: 'Switch' },
      { label: 'Drawing', screen: 'Drawing' },
      { label: 'DatePicker', screen: 'DatePicker' },
      { label: 'Month Picker', screen: 'MonthPicker' },
      { label: 'Year Picker', screen: 'YearPicker' },
      { label: 'Time Picker', screen: 'TimePicker' },
      { label: 'Text Editor', screen: 'TextEditor' },
      { label: 'Input File', screen: 'InputFile' },
    ],
  },
  {
    category: 'Tool',
    items: [
      { label: 'Bottom Sheet', screen: 'BottomSheet' },
      { label: 'Tab', screen: 'Tab' },
      { label: 'Step', screen: 'Step' },
      { label: 'Modal', screen: 'Modal' },
      { label: 'Accordion', screen: 'Accordion' },
      { label: 'DropDown', screen: 'DropDown' },
      { label: 'TimeLine', screen: 'TimeLine' },
      { label: 'Skeleton', screen: 'Skeleton' },
      { label: 'Pdf Viewer', screen: 'PdfView' },
      { label: 'Calendar', screen: 'Calendar' },
    ],
  },
];
