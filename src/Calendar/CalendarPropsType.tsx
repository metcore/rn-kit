import type { GestureResponderEvent } from 'react-native';

export type CalendarMatrix = number[][];

export type DisabledDayStyle = {
  backgroundColor?: string | undefined;
  textColor?: string | undefined;
};

export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type DateProps = Date | undefined | null;

export type DateRangeProps = {
  startDate?: DateProps;
  endDate?: DateProps;
  date?: DateProps;
};

export type FormattedDateRangeProps = {
  startDate?: string;
  endDate?: string;
  date?: string;
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

export type CalendarModeType = 'single' | 'range';

export type CalendarMarkDatesType = {
  [date: string]: MarkedDate;
};
export interface CalendarTypes {
  mode?: CalendarModeType;
  markedDates?: CalendarMarkDatesType;
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
  language?: 'en' | 'id';
  initialDate?: Date;
}
