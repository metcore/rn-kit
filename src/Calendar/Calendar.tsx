import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Color from '../Color/Color';
import type {
  CalendarMatrix,
  CalendarTypes,
  MarkedDate,
  WeekDay,
} from './CalendarPropsType';

//perlu locale untuk nama hari
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// const DEFAULT_BACKGROUND_COLOR = Color.base.white100;
// const DEFAULT_TEXT_COLOR = Color.gray[600];
const DEFAULT_SELECTED_BACKGROUND_COLOR = Color.primary[1000];
const DEFAULT_SELECTED_TEXT_COLOR = Color.base.white100;
const DEFAULT_DISABLED_BACKGROUND_COLOR = Color.base.white100;
const DEFAULT_DISABLED_TEXT_COLOR = Color.gray[400];

const Calendar = ({
  markedDates = {},
  disabledDays,
  minDate = null,
  maxDate = null,
  mode = 'single',
  onChange,
  selectedBackgroundColor = DEFAULT_SELECTED_BACKGROUND_COLOR,
  selectedTextColor = DEFAULT_SELECTED_TEXT_COLOR,
  disabledBackgroundColor = DEFAULT_DISABLED_BACKGROUND_COLOR,
  disabledTextColor = DEFAULT_DISABLED_TEXT_COLOR,
}: CalendarTypes) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const formatDateKey = (year: number, month: number, day: number) => {
    const mm = (month + 1).toString().padStart(2, '0');
    const dd = day.toString().padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  const generateCalendarMatrix = (): CalendarMatrix => {
    const matrix = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const maxDays = getDaysInMonth(month, year);

    let row = [];
    for (let i = 0; i < firstDay; i++) {
      row.push('');
    }

    for (let day = 1; day <= maxDays; day++) {
      row.push(day);
      if (row.length === 7) {
        matrix.push(row);
        row = [];
      }
    }

    if (row.length > 0) {
      while (row.length < 7) {
        row.push('');
      }
      matrix.push(row);
    }

    return matrix;
  };

  const normalizeDate = (date: Date) => {
    if (!date) return null;
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const goToPrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const isDateInRange = (date: number) => {
    if (!startDate || !endDate || !date) return false;
    const target = normalizeDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), date)
    );
    if (!target) return false;
    return target >= startDate && target <= endDate;
  };

  const isSameDate = (dateObj: Date | null, day: string | number) => {
    if (!dateObj) return false;
    return (
      dateObj.getDate() === day &&
      dateObj.getMonth() === currentDate.getMonth() &&
      dateObj.getFullYear() === currentDate.getFullYear()
    );
  };

  function isWeekDay(day: number): day is WeekDay {
    return day >= 0 && day <= 6;
  }
  const isDisabledDate = (year: number, month: number, day: number) => {
    if (!day) return false;

    const dateObj = new Date(year, month, day);
    const dayOfWeek = dateObj.getDay();

    if (isWeekDay(dayOfWeek) && disabledDays?.[dayOfWeek]) {
      return true;
    }
    if (minDate && dateObj < minDate) return true;
    if (maxDate && dateObj > maxDate) return true;

    return false;
  };

  const setBackgroundDay = (
    year: number,
    month: number,
    date: number,
    keyWeek: WeekDay
  ) => {
    const inRange = isDateInRange(date);
    const isStart = isSameDate(startDate, date);
    const isEnd = isSameDate(endDate, date);
    const dateKey = formatDateKey(year, month, date);
    const mark = markedDates[dateKey];
    let backgroundColor = 'white';
    if (
      (mode === 'single' && isStart) ||
      (mode === 'range' && (isStart || isEnd))
    ) {
      backgroundColor = selectedBackgroundColor;
    } else if (mark?.selected) {
      backgroundColor = mark.backgroundColor || selectedBackgroundColor;
    } else if (inRange) {
      backgroundColor = Color.primary[50];
    }

    if (isDisabledDate(year, month, date)) {
      backgroundColor = disabledBackgroundColor;
    }

    if (disabledDays && disabledDays[keyWeek]) {
      backgroundColor =
        typeof disabledDays[keyWeek] === 'object' &&
        disabledDays[keyWeek].hasOwnProperty('backgroundColor')
          ? disabledDays[keyWeek].backgroundColor!
          : DEFAULT_DISABLED_BACKGROUND_COLOR;
    }

    if (isMarkDisableDate(mark)) {
      if (mark && typeof mark.disabled === 'object') {
        backgroundColor =
          mark?.disabled?.backgroundColor ?? DEFAULT_DISABLED_BACKGROUND_COLOR;
      } else if (mark && mark.disabled === true) {
        backgroundColor = DEFAULT_DISABLED_BACKGROUND_COLOR;
      }
    }
    return backgroundColor;
  };

  const setTextColor = (
    year: number,
    month: number,
    date: number,
    keyWeek: WeekDay
  ) => {
    const isStart = isSameDate(startDate, date);
    const isEnd = isSameDate(endDate, date);
    const dateKey = formatDateKey(year, month, date);

    const mark = markedDates[dateKey];
    let textColor = Color.gray[600];

    if (
      (mode === 'single' && isStart) ||
      (mode === 'range' && (isStart || isEnd))
    ) {
      textColor = 'white';
    } else if (mark?.selected) {
      textColor = mark?.textColor || selectedTextColor;
    }

    if (isMarkDisableDate(mark)) {
      if (mark && typeof mark.disabled === 'object') {
        textColor = mark?.disabled?.textColor ?? DEFAULT_DISABLED_TEXT_COLOR;
      } else if (mark && mark.disabled === true) {
        textColor = DEFAULT_DISABLED_TEXT_COLOR;
      }
    }

    if (isDisabledDate(year, month, date)) {
      textColor = disabledTextColor;
    }

    if (disabledDays && disabledDays[keyWeek]) {
      textColor =
        typeof disabledDays[keyWeek] === 'object' &&
        disabledDays[keyWeek].hasOwnProperty('textColor')
          ? disabledDays[keyWeek].textColor!
          : DEFAULT_DISABLED_TEXT_COLOR;
    }

    return textColor;
  };

  const isMarkDisableDate = (mark: MarkedDate | undefined) => {
    let isDisable = false;
    if (mark?.disabled) {
      isDisable = true;
    }
    return isDisable;
  };

  const handlePressDay = (date: number) => {
    if (!date) return;

    const selected = normalizeDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), date)
    );

    if (mode === 'single') {
      setStartDate(selected);
      setEndDate(null);
      if (onChange) onChange({ date: selected });
    } else {
      if (!startDate || (startDate && endDate)) {
        setStartDate(selected);
        setEndDate(null);
        if (onChange) onChange({ startDate: selected, endDate: null });
      } else if (selected && selected >= startDate) {
        setEndDate(selected);
        if (onChange) onChange({ startDate, endDate: selected });
      } else {
        setStartDate(selected);
        setEndDate(null);
        if (onChange) onChange({ startDate: selected, endDate: null });
      }
    }
  };

  const calendarMatrix = generateCalendarMatrix();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPrevMonth}>
          <Text style={styles.nav}>←</Text>
        </TouchableOpacity>
        <Text style={styles.month}>
          {currentDate.toLocaleString('default', { month: 'long' })} {year}
        </Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <Text style={styles.nav}>→</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weekRow}>
        {DAYS.map((day, index) => (
          <Text key={index} style={styles.dayName}>
            {day}
          </Text>
        ))}
      </View>

      {calendarMatrix.map((week, rowIndex) => (
        <View key={rowIndex} style={styles.weekRow}>
          {week.map((date: number, colIndex: WeekDay) => {
            const dateKey = formatDateKey(year, month, date);
            const mark = markedDates[dateKey];
            const disabled =
              isMarkDisableDate(mark) || isDisabledDate(year, month, date);
            const backgroundColor = setBackgroundDay(
              year,
              month,
              date,
              colIndex
            );
            const textColor = setTextColor(year, month, date, colIndex);

            return (
              <Pressable
                key={colIndex}
                onPress={() => handlePressDay(date)}
                disabled={disabled}
              >
                <View style={[styles.dayCell, { backgroundColor }]}>
                  <Text style={[styles.dateText, { color: textColor }]}>
                    {date ? date : ''}
                  </Text>
                </View>

                {mark?.dots && Array.isArray(mark.dots) && (
                  <View style={styles.dotsContainer}>
                    {mark.dots.map((dot: string, index: number) => {
                      const dotColor = (mark.selected && dot) || dot || 'red';
                      return (
                        <View
                          key={index}
                          style={[styles.dot, { backgroundColor: dotColor }]}
                        />
                      );
                    })}
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', padding: 10 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  nav: { fontSize: 20, paddingHorizontal: 10 },
  month: { fontSize: 18, fontWeight: 'bold' },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between' },
  dayName: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 4,
  },
  dayCell: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    width: 32,
    borderRadius: 50,
    margin: 1,
  },
  dateText: {
    fontSize: 14,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 1,
  },
});

export default Calendar;
