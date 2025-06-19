import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BottomSheet from '../BottomSheet/BottomSheet';
import Calendar from '../Calendar/Calendar';
import Button from '../Button/Button';
import { type DateRangeProps } from '../Calendar/CalendarPropsType';
interface DatePickerProps {
  onChange: (selectedDate: DateRangeProps) => void;
  isOpen: boolean;
  onClose: () => void;
  [key: string]: any;
}

export default function DatePicker({
  onChange,
  isOpen,
  onClose,
  ...calendarProps
}: DatePickerProps) {
  const [valueDatepicker, setValueDatepicker] = useState<DateRangeProps>({
    startDate: null,
    endDate: null,
    date: null,
  });

  const handleOnChangeCalendar = useCallback((value: DateRangeProps) => {
    setValueDatepicker(value);
  }, []);

  const handleOnPressSubmitButton = useCallback(() => {
    onChange?.(valueDatepicker);
    onClose?.();
  }, [valueDatepicker, onChange, onClose]);

  const handleOnPressCancelButton = useCallback(() => {
    onClose?.();
  }, [onClose]);

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
        <Calendar onChange={handleOnChangeCalendar} {...calendarProps} />
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
