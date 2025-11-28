import {
  Color,
  DatePicker,
  Icon,
  Typography,
  type CalendarModeType,
  type DateRangeProps,
} from '@herca/rn-kit';
import { useState, useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { FormattedDateRangeProps } from '../Calendar/CalendarPropsType';
import { dateFormatter } from '../function/dateFormatter';

type DatePickerProps = React.ComponentProps<typeof DatePicker>;
type DatePickerPropsWithoutOnChange = Omit<
  DatePickerProps,
  'onChange' | 'isOpen' | 'onClose' | 'mode' | 'onChange'
>;

interface BaseProps {
  label: string;
  placeholder: string;
  datePickerProps?: DatePickerPropsWithoutOnChange;
  value?: string;
  valueDateEnd?: string;
  onSelectClick?: () => void;
  onDatePickerClose?: () => void;
  onDateChange?: (value: DateRangeProps) => void;
  mode?: CalendarModeType;
  language?: 'en' | 'id';
}

type SingleModeProps = BaseProps & {
  mode?: 'single';
  placeholderDateEnd?: never;
};

type RangeModeProps = BaseProps & {
  mode: 'range';
  placeholderDateEnd: string;
};

export type Props = SingleModeProps | RangeModeProps;

export default function InputDate({
  label,
  placeholder = 'Select here...',
  placeholderDateEnd = 'Select here...',
  datePickerProps,
  value,
  valueDateEnd,
  onSelectClick,
  onDatePickerClose,
  onDateChange,
  mode = 'single',
  language,
  ...props
}: Props) {
  const [isDatePickerOpen, setSelectOpen] = useState<boolean>(false);
  const [dateValue, setDateValue] = useState<FormattedDateRangeProps>();
  const [raw, setRaw] = useState<DateRangeProps>();

  const handleOpenSelect = () => {
    setSelectOpen(true);
    onSelectClick?.();
  };

  const handleCloseDatePicker = () => {
    setSelectOpen(false);
    onDatePickerClose?.();
  };

  const handleDateChange = (val: any) => {
    onDateChange?.({
      date: val.date ?? null,
      startDate: val.startDate ?? null,
      endDate: val.endDate ?? null,
    });

    const formattedValue = dateFormatter({
      date: val.date,
      options: {
        language,
        format: language ? 'localized' : 'default',
      },
    });

    const formattedStartDate = dateFormatter({
      date: val.startDate,
      options: {
        language,
        format: language ? 'localized' : 'default',
      },
    });

    const formattedEndDate = dateFormatter({
      date: val.endDate,
      options: {
        language,
        format: language ? 'localized' : 'default',
      },
    });

    setDateValue({
      date: formattedValue,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });

    setRaw(val);
  };

  const startDate = () => {
    if (!value) {
      if (mode === 'single') {
        return dateValue?.date;
      } else if (mode === 'range') {
        return dateValue?.startDate;
      }
    }

    return value;
  };

  const endDate = () => {
    if (mode === 'single') return null;

    if (!valueDateEnd) {
      return dateValue?.endDate;
    }

    return valueDateEnd;
  };

  const rawValue = () => {
    if (mode === 'single') {
      return {
        date: datePickerProps?.value?.date ?? raw?.date,
      };
    } else {
      return {
        startDate: datePickerProps?.value?.startDate ?? raw?.startDate,
        endDate: datePickerProps?.value?.endDate ?? raw?.endDate,
      };
    }
  };

  useEffect(() => {
    if (!value && !valueDateEnd) {
      setDateValue(undefined);
      setRaw(undefined);
    }
  }, [value, valueDateEnd]);

  return (
    <View style={styles.gap4}>
      <Typography variant="t2" weight="semibold" color={Color.gray[900]}>
        {label}
      </Typography>

      <View style={styles.wrapper}>
        {/* sart date */}
        <Pressable
          style={[styles.pickerTrigger, value !== '' && styles.hasValue]}
          onPress={handleOpenSelect}
          {...props}
        >
          <Typography variant="t2" color={Color.gray[900]} weight="medium">
            {startDate() ?? placeholder}
          </Typography>
          <Icon name="ArrowDown" size={14} color={Color.gray[700]} />
        </Pressable>

        {/* end date */}
        {mode === 'range' && (
          <Pressable
            style={[styles.pickerTrigger, value !== '' && styles.hasValue]}
            onPress={handleOpenSelect}
            {...props}
          >
            <Typography variant="t2" color={Color.gray[900]} weight="medium">
              {endDate() ?? placeholderDateEnd}
            </Typography>
            <Icon name="ArrowDown" size={14} color={Color.gray[700]} />
          </Pressable>
        )}
      </View>

      <DatePicker
        {...datePickerProps}
        mode={mode}
        isOpen={isDatePickerOpen}
        onClose={handleCloseDatePicker}
        value={rawValue()}
        language={language}
        onChange={(val: DateRangeProps) => {
          handleDateChange(val);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  gap4: {
    gap: 4,
  },
  pickerTrigger: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.gray[200],
    flex: 1,
  },
  hasValue: {
    borderColor: Color.primary[300],
  },
  wrapper: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
});
