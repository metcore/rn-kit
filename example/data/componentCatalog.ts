import type { IconNameProps } from '@herca/rn-kit';
import type { RootStackParamList } from '../type/navigation';

export interface ComponentCatalogItem {
  label: string;
  screen: keyof RootStackParamList;
  icon: IconNameProps;
}

export interface ComponentCatalogCategory {
  category: string;
  items: ComponentCatalogItem[];
}

export const COMPONENT_CATALOG: ComponentCatalogCategory[] = [
  {
    category: 'Layouts',
    items: [
      { label: 'Typography', screen: 'Typography', icon: 'text-fill' },
      { label: 'Container', screen: 'Container', icon: 'box-outline' },
      { label: 'Card', screen: 'Card', icon: 'credit-card' },
      { label: 'List', screen: 'List', icon: 'list-ordered' },
      { label: 'Label', screen: 'Label', icon: 'Tag' },
      { label: 'Footer', screen: 'Footer', icon: 'align-center' },
      { label: 'Avatar', screen: 'Avatar', icon: 'user-circle-fill' },
      { label: 'Avatar Group', screen: 'AvatarGroup', icon: 'Users' },
      { label: 'Badge', screen: 'Badge', icon: 'discount-fill' },
      { label: 'Badge Icon', screen: 'BadgeIcon', icon: 'Bell' },
      { label: 'Alert', screen: 'Alert', icon: 'exclamation-triangle' },
      { label: 'Toast', screen: 'Toast', icon: 'info-circle-fill' },
      { label: 'Spinner', screen: 'Spinner', icon: 'rotate-right' },
      { label: 'Icons', screen: 'Icons', icon: 'cube-scan' },
    ],
  },
  {
    category: 'Form Requirment',
    items: [
      { label: 'Button', screen: 'Button', icon: 'Bolt' },
      { label: 'Chip Select', screen: 'Chip', icon: 'Filter' },
      { label: 'Counter Button', screen: 'CounterButton', icon: 'plus-square' },
      { label: 'Input', screen: 'Input', icon: 'edit-square-outline' },
      { label: 'Input Password', screen: 'InputPassword', icon: 'lock-fill' },
      { label: 'Input Otp', screen: 'InputOtp', icon: 'scan-qr' },
      { label: 'Input Select', screen: 'InputSelect', icon: 'clipboard-list' },
      { label: 'Input Date', screen: 'InputDate', icon: 'calendar-edit' },
      {
        label: 'Text Area',
        screen: 'TextArea',
        icon: 'sticky-note-text-square',
      },
      { label: 'Select', screen: 'Select', icon: 'sort-vertical' },
      { label: 'Checkbox', screen: 'CheckBox', icon: 'Check' },
      { label: 'Radio Button', screen: 'RadioButton', icon: 'RadioButton' },
      { label: 'Switch', screen: 'Switch', icon: 'settings-slider' },
      { label: 'Drawing', screen: 'Drawing', icon: 'Signature' },
      { label: 'DatePicker', screen: 'DatePicker', icon: 'Calendar' },
      { label: 'Month Picker', screen: 'MonthPicker', icon: 'calendar-check' },
      { label: 'Year Picker', screen: 'YearPicker', icon: 'calendar-clock' },
      { label: 'Time Picker', screen: 'TimePicker', icon: 'Clock' },
      { label: 'Text Editor', screen: 'TextEditor', icon: 'Pencil' },
      { label: 'Input File', screen: 'InputFile', icon: 'file-list-plus' },
    ],
  },
  {
    category: 'Tool',
    items: [
      { label: 'Bottom Sheet', screen: 'BottomSheet', icon: 'share-up' },
      { label: 'Tab', screen: 'Tab', icon: 'copy-fill' },
      { label: 'Step', screen: 'Step', icon: 'hierarchy-3' },
      { label: 'Modal', screen: 'Modal', icon: 'info-circle-outline' },
      { label: 'Accordion', screen: 'Accordion', icon: 'list-un-ordered' },
      { label: 'DropDown', screen: 'DropDown', icon: 'ArrowDown' },
      { label: 'TimeLine', screen: 'TimeLine', icon: 'time-forward' },
      { label: 'Skeleton', screen: 'Skeleton', icon: 'Box' },
      { label: 'Pdf Viewer', screen: 'PdfView', icon: 'Pdf' },
      { label: 'Calendar', screen: 'Calendar', icon: 'calendar-plus' },
    ],
  },
];
