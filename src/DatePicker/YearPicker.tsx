import { useState, useCallback, useMemo } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet from '../BottomSheet/BottomSheet';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import Color from '../Color/Color';
import Icon from '../Icon';

type PickerMode = 'single' | 'range' | 'multiple';

interface YearPickerProps {
  isOpen: boolean;
  onClose?: () => void;
  onChange?: (
    value: number[] | { startDate: number | null; endDate: number | null }
  ) => void;
  mode?: PickerMode;
}

export default function YearPicker({
  isOpen,
  onClose,
  onChange,
  mode = 'single',
}: YearPickerProps) {
  const currentYear = new Date().getFullYear();
  const pageSize = 9;
  const [rangeValue, setRangeValue] = useState<{
    startDate: number | null;
    endDate: number | null;
  }>({ startDate: null, endDate: null });
  const [multipleValue, setMultipleValue] = useState<number[]>([]);
  const [singleValue, setSingleValue] = useState<number | null>(null);

  const years = useMemo(() => {
    const start = currentYear - 60;
    const total = 121;
    return Array.from({ length: total }, (_, i) => start + i);
  }, [currentYear]);

  const initialPageIndex = useMemo(() => {
    const index = years.findIndex((y) => y === currentYear);
    return Math.floor(index / pageSize);
  }, [years, currentYear]);

  const [pageIndex, setPageIndex] = useState(initialPageIndex);

  const pageYears = useMemo(() => {
    const start = pageIndex * pageSize;
    return years.slice(start, start + pageSize);
  }, [years, pageIndex]);

  const handleSelectYear = useCallback(
    (year: number) => {
      if (mode === 'single') {
        setSingleValue(year);
      } else if (mode === 'range') {
        if (
          rangeValue.startDate === null ||
          (rangeValue.startDate !== null && rangeValue.endDate !== null)
        ) {
          setRangeValue({ startDate: year, endDate: null });
        } else if (year < rangeValue.startDate) {
          setRangeValue({ startDate: year, endDate: rangeValue.startDate });
        } else {
          setRangeValue({ startDate: rangeValue.startDate, endDate: year });
        }
      } else if (mode === 'multiple') {
        setMultipleValue((prev) =>
          prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
        );
      }
    },
    [mode, rangeValue]
  );

  const isSelected = (year: number) => {
    if (mode === 'single') return year === singleValue;
    if (mode === 'range') {
      const { startDate, endDate } = rangeValue;
      return (
        (startDate === year && endDate === null) ||
        (startDate !== null &&
          endDate !== null &&
          year >= startDate &&
          year <= endDate)
      );
    }
    if (mode === 'multiple') return multipleValue.includes(year);
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
              title="Batal"
              variant="tertiary"
              size="medium"
              color="primary"
              onPress={onClose}
            />
          </View>
          <View style={styles.flex1}>
            <Button
              title="Pilih"
              color="primary"
              size="medium"
              onPress={handleSubmit}
            />
          </View>
        </View>
      }
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.buttonNav}
          onPress={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
          disabled={pageIndex === 0}
        >
          <Icon name="ArrowLeft" color={Color.base.white100} size={10} />
        </TouchableOpacity>
        <Typography variant="t1" weight="semibold" color={Color.gray[900]}>
          Pilih Tahun
        </Typography>
        <TouchableOpacity
          style={styles.buttonNav}
          onPress={() =>
            setPageIndex((prev) =>
              (prev + 1) * pageSize < years.length ? prev + 1 : prev
            )
          }
          disabled={(pageIndex + 1) * pageSize >= years.length}
        >
          <Icon name="ArrowRight" color={Color.base.white100} size={10} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <FlatList
          data={pageYears}
          numColumns={3}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={styles.yearList}
          renderItem={({ item }) => {
            const selected = isSelected(item);
            return (
              <View style={styles.yearItem}>
                <TouchableOpacity
                  onPress={() => handleSelectYear(item)}
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
                    {item}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
