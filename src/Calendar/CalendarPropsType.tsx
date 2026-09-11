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
  /**
   * Colour of today's number. Applies only when today is not selected,
   * disabled or marked -- those outrank it.
   */
  todayTextColor?: string;
  disabledDays?: {
    [day in WeekDay]?: boolean | DisabledDayStyle;
  };
  /**
   * Individual dates that cannot be picked, as `YYYY-MM-DD` strings or `Date`
   * objects. Use this instead of a `markedDates` entry with `disabled: true`:
   * marks also drive colours, so disabling through them fights whatever the
   * caller (or the DatePicker) already painted on the day.
   */
  disabledDates?: (string | Date)[];
  dayName?: DayNameTuple;
  language?: 'en' | 'id';
  initialDate?: Date;
  dateStart?: string | null;
  dateEnd?: string | null;
  onMonthChange?: (month: number) => void;
  onYearChange?: (year: number) => void;
  testID?: string;
}
