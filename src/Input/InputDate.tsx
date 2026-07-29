import Color from '../Color/Color';
import DatePicker from '../DatePicker/DatePicker';
import Icon from '../Icon/Icon';
import Typography from '../Typography/Typography';
import type {
  CalendarModeType,
  DateRangeProps,
} from '../Calendar/CalendarPropsType';
import { useState, useEffect } from 'react';
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import type { FormattedDateRangeProps } from '../Calendar/CalendarPropsType';
import { dateFormatter } from '../function/dateFormatter';
import { layouting } from '../styles/layouting';
import { spacing } from '../styles/spacing';
import { getTestID } from '../helpers/getTestID';

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
  hasClear?: boolean;
  testID?: string;
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
  hasClear,
  testID,
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

  // Strip any caller-provided testID out of datePickerProps before spreading
  // it onto <DatePicker>, so it can never clobber the derived `-sheet` id
  // below (mirrors the selectProps fix in InputSelect.tsx). `testID` isn't
  // part of DatePickerProps yet (lands in Task 6); stripping it here now
  // prevents that task from inheriting the same override bug.
  const datePickerPropsWithoutTestID = { ...datePickerProps };
  delete (datePickerPropsWithoutTestID as { testID?: string }).testID;

  return (
    <View style={styles.gap4}>
      <View testID={getTestID(testID, 'label')}>
        <Typography variant="t2" weight="semibold" color={Color.gray[900]}>
          {label}
        </Typography>
      </View>

      <View style={styles.wrapper}>
        {/* sart date */}
        <Pressable
          testID={getTestID(testID, 'trigger')}
          style={[
            styles.pickerTrigger,
            (value || dateValue) && styles.hasValue,
          ]}
          onPress={handleOpenSelect}
          {...props}
        >
          <Typography variant="t2" color={Color.gray[900]} weight="medium">
            {startDate() ?? placeholder}
          </Typography>
          <View style={[layouting.flex.rowCenter, spacing.gap[8]]}>
            {hasClear && (value || dateValue) && (
              <TouchableOpacity
                testID={getTestID(testID, 'clear')}
                style={{
                  backgroundColor: Color.gray[600],
                  borderRadius: 999,
                  padding: 3,
                }}
                onPress={() => {
                  onDateChange?.({
                    date: null,
                    startDate: null,
                    endDate: null,
                  });

                  setDateValue({
                    date: undefined,
                    endDate: undefined,
                    startDate: undefined,
                  });
                }}
              >
                <Icon name="times-new" size={14} color={'white'} />
              </TouchableOpacity>
            )}
            <Icon name="ArrowDown" size={14} color={Color.gray[700]} />
          </View>
        </Pressable>

        {/* end date */}
        {mode === 'range' && (
          <Pressable
            testID={getTestID(testID, 'trigger-end')}
            style={[
              styles.pickerTrigger,
              (value || dateValue) && styles.hasValue,
            ]}
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
        // testID typing lands in Task 6 (DatePickerProps); forwarded now so
        // the sheet resolves the id once that type is updated.
        {...({ testID: getTestID(testID, 'sheet') } as any)}
        {...datePickerPropsWithoutTestID}
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
