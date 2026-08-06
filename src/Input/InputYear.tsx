import { useState } from 'react';
import { View } from 'react-native';
import YearPicker from '../DatePicker/YearPicker';
import PickerField from './partials/PickerField';
import type { PickerFieldValue } from './type';

interface BaseProps {
  label?: string;
  placeholder: string;
  /** A full year, e.g. 2024. */
  value?: number;
  onSelectClick?: () => void;
  onPickerClose?: () => void;
  onChange?: (value: PickerFieldValue) => void;
  hasClear?: boolean;
  /** Static text inside the sheet, so it can follow the host app's language. */
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

export type InputYearProps = SingleModeProps | RangeModeProps;

const EMPTY: PickerFieldValue = {
  value: null,
  startValue: null,
  endValue: null,
};

const yearLabel = (year: number | null | undefined) =>
  year === null || year === undefined ? null : String(year);

/**
 * Year counterpart to InputMonth. There is no `language` prop: a year is
 * digits, and nothing about it changes between locales.
 */
export default function InputYear({
  label,
  placeholder,
  placeholderEnd,
  value,
  valueEnd,
  mode = 'single',
  onSelectClick,
  onPickerClose,
  onChange,
  hasClear,
  title,
  cancelLabel,
  confirmLabel,
  testID,
}: InputYearProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<PickerFieldValue>(EMPTY);

  const start = value ?? (mode === 'range' ? selected.startValue : selected.value); // prettier-ignore
  const end = valueEnd ?? selected.endValue;

  // What the sheet should open on. Without this the picker only knows about
  // taps it saw itself, so a value coming from a prop -- or a clear -- would
  // show in the field but leave the sheet blank.
  const pickerValue =
    mode === 'range'
      ? { startDate: start ?? null, endDate: end ?? null }
      : ([start].filter((y) => y !== null && y !== undefined) as number[]);

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
    const next: PickerFieldValue = Array.isArray(picked)
      ? { value: picked[0] ?? null, startValue: null, endValue: null }
      : { value: null, startValue: picked.startDate, endValue: picked.endDate };

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
        display={yearLabel(start)}
        displayEnd={yearLabel(end)}
        hasClear={hasClear}
        onPress={handleOpen}
        onClear={handleClear}
        testID={testID}
      />

      <YearPicker
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
