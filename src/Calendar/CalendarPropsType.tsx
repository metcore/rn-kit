import type { GestureResponderEvent } from 'react-native';

export type CalendarMatrix = number[][];

export type DisabledDayStyle = {
  backgroundColor?: string | undefined;
  textColor?: string | undefined;
};

export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type DateRangeProps = {
  startDate?: Date | undefined | null;
  endDate?: Date | undefined | null;
  date?: Date | undefined | null;
};

export type CalendarDisabledProp = {
  backgroundColor?: string | undefined;
  textColor?: string | undefined;
};

export type MarkedDate = {
  selected?: boolean;
  backgroundColor?: string;
  textColor?: string;
  disabled?: CalendarDisabledProp | boolean;
  dots?: string[];
};

export type DayNameTuple = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

export interface CalendarTypes {
  mode?: 'single' | 'range';
  markedDates?: {
    [date: string]: MarkedDate;
  };
  minDate?: Date | null;
  maxDate?: Date | null;
  onPress?: (event: GestureResponderEvent) => void;
  onChange?: (value: DateRangeProps) => void;
  selectedBackgroundColor?: string;
  selectedTextColor?: string;
  disabledBackgroundColor?: string;
  disabledTextColor?: string;
  disabledDays?: {
    [day in WeekDay]?: boolean | DisabledDayStyle;
  };
  dayName?: DayNameTuple;
}
