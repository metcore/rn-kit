import { useState } from 'react';
import { View } from 'react-native';
import MonthPicker from '../DatePicker/MonthPicker';
import { dateFormatter } from '../function/dateFormatter';
import PickerField from './partials/PickerField';
import type { PickerFieldValue } from './type';

interface BaseProps {
  label?: string;
  placeholder: string;
  /** Month number, 1 (January) to 12 (December). */
  value?: number;
  onSelectClick?: () => void;
  onPickerClose?: () => void;
  onChange?: (value: PickerFieldValue) => void;
  language?: 'en' | 'id';
  hasClear?: boolean;
  title?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  testID?: string;
}

type SingleModeProps = BaseProps & {
  mode?: 'single';
  placeholderEnd?: never;
  valueEnd?: never;
};

type RangeModeProps = BaseProps & {
  mode: 'range';
  placeholderEnd: string;
  valueEnd?: number;
};

export type InputMonthProps = SingleModeProps | RangeModeProps;

const EMPTY: PickerFieldValue = {
  value: null,
  startValue: null,
  endValue: null,
};

/**
 * Renders the month name for a 1-based month number in the requested language.
 *
 * Anything outside 1-12 renders nothing, so the field falls back to its
 * placeholder. Handing the number straight to Date would quietly roll over --
 * 0 would read as December of the previous year rather than January.
 *
 * The year given to the formatter is arbitrary; only the month is read back.
 */
const monthLabel = (
  month: number | null | undefined,
  language?: 'en' | 'id'
) =>
  month === null || month === undefined || month < 1 || month > 12
    ? null
    : dateFormatter({
        date: new Date(2000, month - 1, 1),
        options: { pattern: 'MMMM', language },
      });

/**
 * Back to the 0-based index MonthPicker indexes its options by. Anything
 * outside 1-12 maps to nothing, matching what the field renders.
 */
const zeroBased = (month: number | null | undefined) =>
  month === null || month === undefined || month < 1 || month > 12
    ? null
    : month - 1;

export default function InputMonth({
  label,
  placeholder,
  placeholderEnd,
  value,
  valueEnd,
  mode = 'single',
  onSelectClick,
  onPickerClose,
  onChange,
  language,
  hasClear,
  title,
  cancelLabel,
  confirmLabel,
  testID,
}: InputMonthProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<PickerFieldValue>(EMPTY);

  // A given prop wins, so the field can be driven from outside; otherwise it
  // shows whatever was last picked.
  const start = value ?? (mode === 'range' ? selected.startValue : selected.value); // prettier-ignore
  const end = valueEnd ?? selected.endValue;

  // What the sheet should open on. Without this the picker only knows about
  // taps it saw itself, so a value coming from a prop -- or a clear -- would
  // show in the field but leave the sheet blank.
  const pickerValue =
    mode === 'range'
      ? { startDate: zeroBased(start), endDate: zeroBased(end) }
      : ([zeroBased(start)].filter((m) => m !== null) as number[]);

  const handleOpen = () => {
    setIsOpen(true);
    onSelectClick?.();
  };

  const handleClose = () => {
    setIsOpen(false);
    onPickerClose?.();
  };

  const handleChange = (
    picked: number[] | { startDate: number | null; endDate: number | null }
  ) => {
    // MonthPicker reports an array in single mode and a pair in range mode,
    // both 0-based. Shift to 1-based on the way out, so January is 1 for the
    // consumer -- the picker's indices never leak past this line.
    const oneBased = (month: number | null | undefined) =>
      month === null || month === undefined ? null : month + 1;

    const next: PickerFieldValue = Array.isArray(picked)
      ? { value: oneBased(picked[0]), startValue: null, endValue: null }
      : {
          value: null,
          startValue: oneBased(picked.startDate),
          endValue: oneBased(picked.endDate),
        };

    setSelected(next);
    onChange?.(next);
  };

  const handleClear = () => {
    setSelected(EMPTY);
    onChange?.(EMPTY);
  };

  return (
    <View>
      <PickerField
        label={label}
        placeholder={placeholder}
        placeholderEnd={placeholderEnd}
        mode={mode}
        display={monthLabel(start, language)}
        displayEnd={monthLabel(end, language)}
        hasClear={hasClear}
        onPress={handleOpen}
        onClear={handleClear}
        testID={testID}
      />

      <MonthPicker
        testID={testID}
        isOpen={isOpen}
        mode={mode}
        value={pickerValue}
        onClose={handleClose}
        onChange={handleChange}
        {...(title ? { title } : {})}
        {...(cancelLabel ? { cancelLabel } : {})}
        {...(confirmLabel ? { confirmLabel } : {})}
      />
    </View>
  );
}
