import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Dimensions,
} from 'react-native';
import BottomSheet from '../BottomSheet/BottomSheet';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';
import Color from '../Color/Color';

const ITEM_HEIGHT = 40;
const SCREEN_WIDTH = Dimensions.get('window').width;
const VISIBLE_ITEMS = 5;
const MIDDLE_INDEX = Math.floor(VISIBLE_ITEMS / 2);

interface TimePickerProps {
  isOpen: boolean;
  onClose?: () => void;
  onChange?: (value: { hour: number; minute: number }) => void;
}

const generateItems = (max: number) => Array.from({ length: max }, (_, i) => i);

export default function TimePickerWheel({
  isOpen,
  onClose,
  onChange,
}: TimePickerProps) {
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);

  const hourRef = useRef<ScrollView>(null);
  const minuteRef = useRef<ScrollView>(null);

  const padItems = (items: number[], padCount: number) => {
    return [
      ...items.slice(-padCount).map((i) => i - items.length),
      ...items,
      ...items.slice(0, padCount).map((i) => i + items.length),
    ];
  };

  const hours = padItems(generateItems(24), MIDDLE_INDEX);
  const minutes = padItems(generateItems(60), MIDDLE_INDEX);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        scrollToIndex(hourRef, selectedHour + MIDDLE_INDEX);
        scrollToIndex(minuteRef, selectedMinute + MIDDLE_INDEX);
      }, 100);
    }
  }, [isOpen, selectedMinute, selectedHour]);

  const scrollToIndex = (
    ref: React.RefObject<ScrollView | null>,
    index: number
  ) => {
    ref.current?.scrollTo({ y: index * ITEM_HEIGHT, animated: true });
  };

  const handleScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
    type: 'hour' | 'minute'
  ) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    if (type === 'hour') {
      const realIndex = (((index - MIDDLE_INDEX) % 24) + 24) % 24;
      setSelectedHour(realIndex);
      setTimeout(() => scrollToIndex(hourRef, realIndex + MIDDLE_INDEX), 50);
    } else {
      const realIndex = (((index - MIDDLE_INDEX) % 60) + 60) % 60;
      setSelectedMinute(realIndex);
      setTimeout(() => scrollToIndex(minuteRef, realIndex + MIDDLE_INDEX), 50);
    }
  };

  const handleSubmit = () => {
    onChange?.({ hour: selectedHour, minute: selectedMinute });
    onClose?.();
  };

  const renderItem = (value: number, type: 'hour' | 'minute') => {
    const isSelected =
      type === 'hour'
        ? ((value % 24) + 24) % 24 === selectedHour
        : (value % 60) + (60 % 60) === selectedMinute;
    const displayValue =
      type === 'hour'
        ? (((value % 24) + 24) % 24).toString().padStart(2, '0')
        : (((value % 60) + 60) % 60).toString().padStart(2, '0');

    return (
      <View key={`${type}-${value}`} style={styles.item}>
        <Text style={[styles.itemText, isSelected && styles.selectedItemText]}>
          {displayValue}
        </Text>
      </View>
    );
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <View style={styles.footer}>
          <View style={styles.flex1}>
            <Button
              title="Batal"
              variant="tertiary"
              onPress={onClose}
              color="primary"
              size="medium"
            />
          </View>
          <View style={styles.flex1}>
            <Button
              title="Pilih"
              onPress={handleSubmit}
              color="primary"
              size="medium"
            />
          </View>
        </View>
      }
    >
      <Typography
        variant="t1"
        weight="semibold"
        color={Color.gray[900]}
        center
        style={{ marginBottom: 16 }}
      >
        Pilih Waktu
      </Typography>

      <View style={styles.container}>
        {/* Highlight overlay */}
        <View style={styles.highlightOverlay} pointerEvents="none">
          <View style={styles.highlight} />
        </View>
        <View style={styles.scrollContainer}>
          <View style={styles.pickerColumn}>
            <ScrollView
              ref={hourRef}
              showsVerticalScrollIndicator={false}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              onMomentumScrollEnd={(e) => handleScrollEnd(e, 'hour')}
              contentContainerStyle={styles.scrollContent}
            >
              {hours.map((h) => renderItem(h, 'hour'))}
            </ScrollView>
          </View>

          <View style={styles.pickerColumn}>
            <ScrollView
              ref={minuteRef}
              showsVerticalScrollIndicator={false}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              onMomentumScrollEnd={(e) => handleScrollEnd(e, 'minute')}
              contentContainerStyle={styles.scrollContent}
            >
              {minutes.map((m) => renderItem(m, 'minute'))}
            </ScrollView>
          </View>
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  scrollContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  scrollContent: {
    paddingVertical: ITEM_HEIGHT * MIDDLE_INDEX,
  },
  pickerColumn: {
    width: SCREEN_WIDTH / 10.5,
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    overflow: 'hidden',
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    color: Color.gray[400],
  },
  selectedItemText: {
    color: Color.gray[900],
    fontWeight: 'bold',
    fontSize: 22,
  },
  highlightOverlay: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  highlight: {
    height: ITEM_HEIGHT,
    zIndex: -1,
    backgroundColor: Color.primary[50],
  },
});
