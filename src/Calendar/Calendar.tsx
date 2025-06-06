import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Color from '../Color/Color';

//perlu locale untuk nama hari
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DEFAULT_BACKGROUND_COLOR = Color.base.white100;
const DEFAULT_TEXT_COLOR = Color.gray[600];
const DEFAULT_SELECTED_BACKGROUND_COLOR = Color.primary[1000];
// const DEFAULT_SELECTED_TEXT_COLOR = Color.primary[1000];
const DEFAULT_DISABLED_BACKGROUND_COLOR = Color.base.white100;
const DEFAULT_DISABLED_TEXT_COLOR = Color.gray[400];

const Calendar = ({
  markedDates = {},
  disabledDates = [],
  disabledDays = {},
  minDate = null,
  maxDate = null,
  mode = 'range',
  onChange,
  selectedBackgroundColor = DEFAULT_BACKGROUND_COLOR,
  selectedTextColor = DEFAULT_TEXT_COLOR,
  disabledBackgroundColor = DEFAULT_DISABLED_BACKGROUND_COLOR,
  disabledTextColor = DEFAULT_DISABLED_TEXT_COLOR,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const formatDateKey = (year, month, day) => {
    const mm = (month + 1).toString().padStart(2, '0');
    const dd = day.toString().padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  const generateCalendarMatrix = () => {
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

  const normalizeDate = (date) => {
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

  const isDateInRange = (date) => {
    if (!startDate || !endDate || !date) return false;
    const target = normalizeDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), date)
    );
    return target >= startDate && target <= endDate;
  };

  const isSameDate = (dateObj, day) => {
    if (!dateObj) return false;
    return (
      dateObj.getDate() === day &&
      dateObj.getMonth() === currentDate.getMonth() &&
      dateObj.getFullYear() === currentDate.getFullYear()
    );
  };

  const isDisabledDate = (year, month, day) => {
    if (!day) return false;
    const dateObj = new Date(year, month, day);
    const dayOfWeek = dateObj.getDay();
    const dateKey = formatDateKey(year, month, day);
    if (disabledDays.hasOwnProperty(dayOfWeek) && disabledDays[dayOfWeek])
      return true;
    if (disabledDates.includes(dateKey)) return true;
    if (minDate && dateObj < minDate) return true;
    if (maxDate && dateObj > maxDate) return true;

    return false;
  };

  const setBackgroundDay = (year, month, date, keyWeek) => {
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
      backgroundColor =
        mark.backgroundColor || DEFAULT_SELECTED_BACKGROUND_COLOR;
    } else if (inRange) {
      backgroundColor = Color.primary[50];
    }

    if (isDisabledDate(year, month, date)) {
      backgroundColor = disabledBackgroundColor;
    }
    if (disabledDays.hasOwnProperty(keyWeek) && disabledDays[keyWeek]) {
      backgroundColor = disabledDays[keyWeek]?.hasOwnProperty('backgroundColor')
        ? disabledDays[keyWeek].backgroundColor
        : DEFAULT_DISABLED_BACKGROUND_COLOR;
    }
    return backgroundColor;
  };

  const setTextColor = (year, month, date, keyWeek) => {
    // const inRange = isDateInRange(date);
    const isStart = isSameDate(startDate, date);
    const isEnd = isSameDate(endDate, date);
    const dateKey = formatDateKey(year, month, date);
    // const disabled = mark?.disabled || isDisabledDate(year, month, date);

    const mark = markedDates[dateKey];
    let textColor = Color.gray[600];

    if (
      (mode === 'single' && isStart) ||
      (mode === 'range' && (isStart || isEnd))
    ) {
      textColor = 'white';
    } else if (mark?.selected) {
      textColor = selectedTextColor;
    }

    if (isDisabledDate(year, month, date)) {
      textColor = disabledTextColor;
    }
    if (disabledDays.hasOwnProperty(keyWeek) && disabledDays[keyWeek]) {
      textColor = disabledDays[keyWeek]?.hasOwnProperty('textColor')
        ? disabledDays[keyWeek].textColor
        : DEFAULT_DISABLED_TEXT_COLOR;
    }

    return textColor;
  };

  const handlePressDay = (date) => {
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
      } else if (selected >= startDate) {
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
          {week.map((date, colIndex) => {
            const dateKey = formatDateKey(year, month, date);
            const mark = markedDates[dateKey];
            const disabled =
              mark?.disabled || isDisabledDate(year, month, date);
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
                    {date !== '' ? date : ''}
                  </Text>
                </View>

                {mark?.dots && Array.isArray(mark.dots) && date !== '' && (
                  <View style={styles.dotsContainer}>
                    {mark.dots.map((dot) => {
                      const dotColor = (mark.selected && dot) || dot || 'red';
                      return (
                        <View
                          key={dot.key}
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
