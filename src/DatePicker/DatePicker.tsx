import { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import BottomSheet from '../BottomSheet/BottomSheet';
import Calendar from '../Calendar/Calendar';
import Button from '../Button/Button';
import Alert from '../Alert/Alert';
import {
  type CalendarModeType,
  type DateRangeProps,
} from '../Calendar/CalendarPropsType';

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
  // value,
  ...calendarProps
}: DatePickerProps) {
  const [errorValidate, setErrorValidate] = useState<boolean>(false);
  const [markDates, setMarkDates] = useState();
  const [valueOnChange, setValueOnChange] = useState<DateRangeProps>({
    startDate: null,
    endDate: null,
    date: null,
  });
  // const [valueSelected, setValueSelected] = useState<DateRangeProps>({
  //   startDate: null,
  //   endDate: null,
  //   date: null,
  // });

  const handleOnChangeCalendar = useCallback((value: DateRangeProps) => {
    setMarkDates({});
    setValueOnChange(value);
    setErrorValidate(false);
  }, []);

  // const setDefaultValue = () => {
  //   if (mode === 'single' && valueOnChange.date) {
  //     setMarkDates({
  //       [formatDate(valueOnChange.date)]: { selected: true },
  //     });
  //   } else if (
  //     (mode === 'range' || mode === 'multiple') &&
  //     valueOnChange.startDate &&
  //     valueOnChange.endDate
  //   ) {
  //     const start = new Date(valueOnChange.startDate);
  //     const end = new Date(valueOnChange.endDate);
  //     const marks: Record<string, any> = {};
  //     for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
  //       const key = formatDate(new Date(d));
  //       marks[key] = { selected: true };
  //     }
  //     setMarkDates(marks);
  //   }
  // };

  const handleOnPressSubmitButton = useCallback(() => {
    const { startDate, endDate, date } = valueOnChange;
    const isEmpty = !startDate && !endDate && !date;
    const isRangeMode = mode === 'range';
    const isInvalidRange = isRangeMode && (!startDate || !endDate);

    if ((required && isEmpty) || isInvalidRange) {
      onHasError?.(true);
      setErrorValidate(true);
      return;
    }

    onChange?.(valueOnChange);
    onClose?.();
    // setDefaultValue();
    // setValueSelected(valueOnChange);
  }, [required, mode, valueOnChange, onChange, onClose, onHasError]);

  const handleOnPressCancelButton = useCallback(() => {
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    setErrorValidate(hasError);
  }, [hasError]);

  // useEffect(() => {
  //   setDefaultValue();
  // }, [isOpen, setDefaultValue, valueSelected]);

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
