import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import Color from '../Color/Color';
import type {
  CalendarTypes,
  DayNameTuple,
  MarkedDate,
  WeekDay,
} from './CalendarPropsType';
import Icon from '../Icon';
import Typography from '../Typography/Typography';

const DAYS: DayNameTuple = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
  dayName = DAYS,
}: CalendarTypes) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const getDaysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();

  const formatDateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const generateCalendarMatrix = () => {
    const matrix = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const maxDays = getDaysInMonth(month, year);
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const prevMonthDays = getDaysInMonth(prevMonth, prevYear);

    let row = [];

    // prev month
    for (let i = 0; i < firstDay; i++) {
      const day = prevMonthDays - firstDay + i + 1;
      row.push({
        date: new Date(prevYear, prevMonth, day),
        from: 'prev',
      });
    }

    // current month
    for (let day = 1; day <= maxDays; day++) {
      row.push({
        date: new Date(year, month, day),
        from: 'current',
      });
      if (row.length === 7) {
        matrix.push(row);
        row = [];
      }
    }

    // next month
    let nextDay = 1;
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    if (row.length > 0) {
      while (row.length < 7) {
        row.push({
          date: new Date(nextYear, nextMonth, nextDay),
          from: 'next',
        });
        nextDay++;
      }
      matrix.push(row);
    }

    return matrix;
  };

  const normalizeDate = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
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

  const isWeekDay = (day: number): day is WeekDay => day >= 0 && day <= 6;

  const isDisabledDate = (date: Date) => {
    const dayOfWeek = date.getDay();
    if (isWeekDay(dayOfWeek) && disabledDays?.[dayOfWeek]) return true;
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isSameDate = (a: Date | null, b: Date) =>
    !!a && a.getTime() === b.getTime();

  const isDateInRange = (date: Date) =>
    startDate && endDate && date >= startDate && date <= endDate;

  const isMarkDisableDate = (mark: MarkedDate | undefined) => !!mark?.disabled;

  const setBackgroundDay = (date: Date, keyWeek: WeekDay) => {
    const key = formatDateKey(date);
    const mark = markedDates[key];
    const inRange = isDateInRange(date);
    const isStart = isSameDate(startDate, date);
    const isEnd = isSameDate(endDate, date);
    if (disabledDays && disabledDays[keyWeek]) {
      return typeof disabledDays[keyWeek] === 'object' &&
        disabledDays[keyWeek].hasOwnProperty('backgroundColor')
        ? disabledDays[keyWeek].backgroundColor!
        : disabledBackgroundColor;
    }

    if (isDisabledDate(date)) return disabledBackgroundColor;
    if (
      (mode === 'single' && isStart) ||
      (mode === 'range' && (isStart || isEnd))
    ) {
      return selectedBackgroundColor;
    }
    if (mark?.selected) return mark.backgroundColor || selectedBackgroundColor;
    if (inRange) return Color.primary[50];
    return 'white';
  };

  const setTextColor = (date: Date, keyWeek: WeekDay) => {
    const key = formatDateKey(date);
    const mark = markedDates[key];
    const isStart = isSameDate(startDate, date);
    const isEnd = isSameDate(endDate, date);

    if (disabledDays && disabledDays[keyWeek]) {
      return typeof disabledDays[keyWeek] === 'object' &&
        disabledDays[keyWeek].hasOwnProperty('textColor')
        ? disabledDays[keyWeek].textColor!
        : disabledTextColor;
    }

    if (isDisabledDate(date)) return disabledTextColor;
    if (
      (mode === 'single' && isStart) ||
      (mode === 'range' && (isStart || isEnd))
    ) {
      return selectedTextColor;
    }
    if (mark?.selected) return mark?.textColor || selectedTextColor;
    return Color.gray[600];
  };

  const handlePressDay = (date: Date) => {
    const selected = normalizeDate(date);
    if (mode === 'single') {
      setStartDate(selected);
      setEndDate(null);
      onChange?.({ date: selected });
    } else {
      if (!startDate || (startDate && endDate)) {
        setStartDate(selected);
        setEndDate(null);
        onChange?.({ startDate: selected, endDate: null });
      } else if (selected >= startDate) {
        setEndDate(selected);
        onChange?.({ startDate, endDate: selected });
      } else {
        setStartDate(selected);
        setEndDate(null);
        onChange?.({ startDate: selected, endDate: null });
      }
    }
  };

  const calendarMatrix = generateCalendarMatrix();
  const year = currentDate.getFullYear();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.buttonNav} onPress={goToPrevMonth}>
          <Icon name="ArrowLeft" color={Color.base.white100} size={10} />
        </TouchableOpacity>
        <Typography variant="t1" weight="semibold" color={Color.gray[900]}>
          {currentDate.toLocaleString('default', { month: 'long' })} {year}
        </Typography>
        <TouchableOpacity style={styles.buttonNav} onPress={goToNextMonth}>
          <Icon name="ArrowRight" color={Color.base.white100} size={10} />
        </TouchableOpacity>
      </View>

      <View style={styles.weekRow}>
        {dayName.map((day, index) => (
          <Typography
            key={index}
            weight="medium"
            variant="t2"
            center
            color={Color.gray[600]}
            style={{ width: 32, textAlign: 'center' }}
          >
            {day}
          </Typography>
        ))}
      </View>

      {calendarMatrix.map((week, rowIndex) => (
        <View key={rowIndex} style={styles.weekRow}>
          {week.map((cell, colIndex) => {
            const date = cell.date;
            const day = date.getDate();
            const key = formatDateKey(date);
            const mark = markedDates[key];

            const disabled = isMarkDisableDate(mark) || isDisabledDate(date);
            const backgroundColor = setBackgroundDay(date, colIndex);
            const textColor = setTextColor(date, colIndex as WeekDay);
            return (
              <Pressable
                disabled={disabled}
                key={key}
                onPress={() => handlePressDay(date)}
              >
                <View style={[styles.dayCell, { backgroundColor }]}>
                  <Typography variant="t2" weight="medium" color={textColor}>
                    {day}
                  </Typography>
                </View>
                <View style={{ height: 10, marginBottom: 5 }}>
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
                </View>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    height: 56,
    gap: 8,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  dayCell: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    width: 32,
    borderRadius: 50,
    margin: 1,
  },
  buttonNav: {
    backgroundColor: Color.gray[500],
    borderRadius: 8,
    padding: 8,
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
