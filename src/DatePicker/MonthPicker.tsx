import { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet from '../BottomSheet/BottomSheet';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import Color from '../Color/Color';
import { generateMonthOptions } from './helpers';

type PickerMode = 'single' | 'range' | 'multiple';

interface MonthPickerProps {
  isOpen: boolean;
  onClose?: () => void;
  onChange?: (
    value: number[] | { startDate: number | null; endDate: number | null }
  ) => void;
  mode?: PickerMode;
  title?: string;
  cancelLabel?: string;
  confirmLabel?: string;
}

export default function MonthPicker({
  isOpen,
  onClose,
  onChange,
  mode = 'single',
  cancelLabel = 'Batal',
  confirmLabel = 'pilih',
  title = 'Pilih Bulan',
}: MonthPickerProps) {
  const [rangeValue, setRangeValue] = useState<{
    startDate: number | null;
    endDate: number | null;
  }>({ startDate: null, endDate: null });
  const [multipleValue, setMultipleValue] = useState<number[]>([]);
  const [singleValue, setSingleValue] = useState<number | null>(null);

  const handleSelectMonth = useCallback(
    (month: number) => {
      if (mode === 'single') {
        setSingleValue(month);
      } else if (mode === 'range') {
        if (
          rangeValue.startDate === null ||
          (rangeValue.startDate !== null && rangeValue.endDate !== null)
        ) {
          setRangeValue({ startDate: month, endDate: null });
        } else if (month < rangeValue.startDate) {
          setRangeValue({ startDate: month, endDate: rangeValue.startDate });
        } else {
          setRangeValue({ startDate: rangeValue.startDate, endDate: month });
        }
      } else if (mode === 'multiple') {
        setMultipleValue((prev) =>
          prev.includes(month)
            ? prev.filter((m) => m !== month)
            : [...prev, month]
        );
      }
    },
    [mode, rangeValue]
  );

  const isSelected = (month: number) => {
    if (mode === 'single') return month === singleValue;
    if (mode === 'range') {
      const { startDate, endDate } = rangeValue;
      return (
        (startDate === month && endDate === null) ||
        (startDate !== null &&
          endDate !== null &&
          month >= startDate &&
          month <= endDate)
      );
    }
    if (mode === 'multiple') return multipleValue.includes(month);
    return false;
  };

  const handleSubmit = () => {
    if (mode === 'single') {
      onChange?.(singleValue !== null ? [singleValue] : []);
    } else if (mode === 'range') {
      onChange?.(rangeValue);
    } else {
      onChange?.(multipleValue);
    }
    onClose?.();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <View style={styles.containerBottomSheetFooter}>
          <View style={styles.flex1}>
            <Button
              title={cancelLabel}
              variant="tertiary"
              size="medium"
              color="primary"
              onPress={onClose}
            />
          </View>
          <View style={styles.flex1}>
            <Button
              title={confirmLabel}
              color="primary"
              size="medium"
              onPress={handleSubmit}
            />
          </View>
        </View>
      }
    >
      <View style={styles.header}>
        <Typography
          variant="t1"
          weight="semibold"
          color={Color.gray[900]}
          center
        >
          {title}
        </Typography>
      </View>

      <View style={styles.container}>
        <FlatList
          data={generateMonthOptions()}
          numColumns={3}
          keyExtractor={(item) => item.value.toString()}
          contentContainerStyle={styles.yearList}
          renderItem={({ item }) => {
            const selected = isSelected(item.value);
            return (
              <View style={styles.yearItem}>
                <TouchableOpacity
                  onPress={() => handleSelectMonth(item.value)}
                  style={[
                    styles.option,
                    selected ? styles.optionSelected : null,
                  ]}
                >
                  <Typography
                    variant="p2"
                    center
                    weight="semibold"
                    color={selected ? Color.gray[900] : Color.gray[700]}
                  >
                    {item.label}
                  </Typography>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  yearList: {
    paddingBottom: 12,
  },
  yearItem: {
    width: '30%',
    margin: '1.66%',
  },
  pagination: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  header: {
    marginBottom: 10,
  },
  buttonNav: {
    backgroundColor: Color.gray[500],
    borderRadius: 8,
    padding: 8,
  },
  containerBottomSheetFooter: {
    flexDirection: 'row',
    flex: 1,
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  option: {
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Color.base.white100,
  },
  optionSelected: {
    backgroundColor: Color.primary[50],
    borderColor: Color.primary[300],
  },
});
