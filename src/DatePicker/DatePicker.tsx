import { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import BottomSheet from '../BottomSheet/BottomSheet';
import Calendar, { formatDate } from '../Calendar/Calendar';
import Button from '../Button/Button';
import Alert from '../Alert/Alert';
import {
  type CalendarMarkDatesType,
  type CalendarModeType,
  type DateRangeProps,
} from '../Calendar/CalendarPropsType';
import Color from '../Color/Color';

interface DatePickerProps {
  onChange: (selectedDate: DateRangeProps) => void;
  isOpen: boolean;
  onClose: () => void;
  required?: boolean;
  hasError?: boolean;
  onHasError?: (val: boolean) => void;
  hint?: string;
  mode?: CalendarModeType;
  value?: DateRangeProps;
  [key: string]: any;
}

export default function DatePicker({
  onChange,
  isOpen,
  onClose,
  required = false,
  hasError = false,
  onHasError,
  hint,
  mode,
  value,
  ...calendarProps
}: DatePickerProps) {
  const [errorValidate, setErrorValidate] = useState<boolean>(false);
  const [markDates, setMarkDates] = useState<CalendarMarkDatesType>();
  const [valueDatepicker, setValueDatepicker] = useState<DateRangeProps>({
    startDate: null,
    endDate: null,
    date: null,
  });

  const handleOnChangeCalendar = useCallback((value: DateRangeProps) => {
    setMarkDates({});
    setValueDatepicker(value);
    setErrorValidate(false);
  }, []);

  const handleOnPressSubmitButton = useCallback(() => {
    const { startDate, endDate, date } = valueDatepicker;

    const isEmpty = !startDate && !endDate && !date;

    const isRangeMode = mode === 'range';

    const isInvalidRange = isRangeMode && (!startDate || !endDate);

    if ((required && isEmpty) || isInvalidRange) {
      onHasError?.(true);
      setErrorValidate(true);
      return;
    }

    onChange?.(valueDatepicker);
    onClose?.();
  }, [required, mode, valueDatepicker, onChange, onClose, onHasError]);

  const handleOnPressCancelButton = useCallback(() => {
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    setErrorValidate(hasError);
  }, [hasError]);

  useEffect(() => {
    if (!isOpen) return;

    let updatedMarkDates: CalendarMarkDatesType = {};

    if (mode === 'single' && value?.date) {
      updatedMarkDates = {
        [formatDate(value.date) as string]: { selected: true },
      };
    }

    if (mode === 'range' && value?.startDate && value?.endDate) {
      const start = new Date(value.startDate);
      const end = new Date(value.endDate);
      const dates: CalendarMarkDatesType = {};

      for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
        const dateStr = formatDate(dt);
        let backgroundColor = Color.primary[50];
        let textColor = Color.gray[600];

        if (dateStr === formatDate(start) || dateStr === formatDate(end)) {
          backgroundColor = Color.primary[1000];
          textColor = Color.base.white100;
        }

        if (dateStr) {
          dates[dateStr] = {
            selected: true,
            backgroundColor: backgroundColor,
            textColor: textColor,
          };
        }
      }

      updatedMarkDates = dates;
    }

    setMarkDates(updatedMarkDates);
    setValueDatepicker(
      value || {
        startDate: null,
        endDate: null,
        date: null,
      }
    );
  }, [isOpen, value, mode]);

  return (
    <View>
      <BottomSheet
        isOpen={isOpen}
        onClose={onClose}
        footer={
          <View style={styles.footerContainer}>
            <View style={styles.buttonWrapper}>
              <Button
                variant="tertiary"
                title="Batalkan"
                color="primary"
                onPress={handleOnPressCancelButton}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                title="Terapkan"
                color="primary"
                onPress={handleOnPressSubmitButton}
              />
            </View>
          </View>
        }
      >
        <Calendar
          markedDates={markDates}
          mode={mode}
          onChange={handleOnChangeCalendar}
          {...calendarProps}
        />
        <Alert
          color="danger"
          message={hint ? hint : 'Error validation'}
          hide={!errorValidate}
        />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    flex: 1,
  },
});
