import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import BottomSheet from '../BottomSheet/BottomSheet';
import Button from '../Button/Button';
import Color from '../Color/Color';
import Typography from '../Typography/Typography';
import AnimatedItem from './partials/AnimatedItem';

const ITEM_HEIGHT = 40;
const SCREEN_WIDTH = Dimensions.get('window').width;
const VISIBLE_ITEMS = 5;
const MIDDLE_INDEX = Math.floor(VISIBLE_ITEMS / 2);

const INFINITE_CYCLES = 100;

interface TimePickerProps {
  isOpen: boolean;
  onClose?: () => void;
  onChange?: (value: { hour: number; minute: number }) => void;
  value?: { hour: number; minute: number };
  title?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

const generateInfiniteData = (max: number, cycles: number) => {
  const base = Array.from({ length: max }, (_, i) => i);
  return Array.from({ length: cycles }).flatMap(() => base);
};

export default function TimePickerWheel({
  isOpen,
  onClose,
  onChange,
  value,
  title = 'Pilih Waktu',
  cancelLabel = 'Batal',
  confirmLabel = 'Pilih',
}: TimePickerProps) {
  const [selectedHour, setSelectedHour] = useState<number>(value?.hour ?? 0);
  const [selectedMinute, setSelectedMinute] = useState<number>(
    value?.minute ?? 0
  );

  const hourRef = useRef<FlatList<any> | null>(null);
  const minuteRef = useRef<FlatList<any> | null>(null);

  const hourScrollY = useRef(new Animated.Value(0)).current;
  const minuteScrollY = useRef(new Animated.Value(0)).current;

  const hours = generateInfiniteData(24, INFINITE_CYCLES);
  const minutes = generateInfiniteData(60, INFINITE_CYCLES);

  // Posisi tengah untuk initial scroll
  const MIDDLE_HOUR_INDEX = Math.floor(hours.length / 2 / 24) * 24;
  const MIDDLE_MINUTE_INDEX = Math.floor(minutes.length / 2 / 60) * 60;

  // Update state ketika value prop berubah
  useEffect(() => {
    if (value) {
      setSelectedHour(value.hour);
      setSelectedMinute(value.minute);
    }
  }, [value]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        hourRef.current?.scrollToIndex({
          index: MIDDLE_HOUR_INDEX + selectedHour,
          animated: false,
        });
        minuteRef.current?.scrollToIndex({
          index: MIDDLE_MINUTE_INDEX + selectedMinute,
          animated: false,
        });
      }, 100);
    }
  }, [
    isOpen,
    selectedHour,
    selectedMinute,
    MIDDLE_HOUR_INDEX,
    MIDDLE_MINUTE_INDEX,
  ]);

  const getItemLayout = (_: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  const scrollToIndex = (
    ref: React.RefObject<FlatList | null>,
    index: number,
    animated: boolean = true
  ) => {
    ref.current?.scrollToIndex({ index, animated });
  };

  const handleScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
    type: 'hour' | 'minute'
  ) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);

    if (type === 'hour') {
      const realValue = index % 24;
      setSelectedHour(realValue);

      // Re-center jika mendekati ujung data
      const distanceFromStart = index;
      const distanceFromEnd = hours.length - index;

      if (distanceFromStart < 50 || distanceFromEnd < 50) {
        const newCenter = MIDDLE_HOUR_INDEX + realValue;
        setTimeout(() => {
          scrollToIndex(hourRef, newCenter, false);
        }, 50);
      }
    } else {
      const realValue = index % 60;
      setSelectedMinute(realValue);

      // Re-center jika mendekati ujung data
      const distanceFromStart = index;
      const distanceFromEnd = minutes.length - index;

      if (distanceFromStart < 50 || distanceFromEnd < 50) {
        const newCenter = MIDDLE_MINUTE_INDEX + realValue;
        setTimeout(() => {
          scrollToIndex(minuteRef, newCenter, false);
        }, 50);
      }
    }
  };

  const handleScrollToIndexFailed = (info: any) => {
    const wait = new Promise((resolve) => setTimeout(resolve, 100));
    wait.then(() => {
      if (info.averageItemLength && info.index) {
        scrollToIndex(
          info.index < hours.length ? hourRef : minuteRef,
          info.index,
          false
        );
      }
    });
  };

  const handleSubmit = () => {
    onChange?.({ hour: selectedHour, minute: selectedMinute });
    onClose?.();
  };

  const renderHourItem = ({ item, index }: { item: number; index: number }) => (
    <AnimatedItem
      index={index}
      value={item}
      type="hour"
      scrollY={hourScrollY}
    />
  );

  const renderMinuteItem = ({
    item,
    index,
  }: {
    item: number;
    index: number;
  }) => (
    <AnimatedItem
      index={index}
      value={item}
      type="minute"
      scrollY={minuteScrollY}
    />
  );

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <View style={styles.footer}>
          <View style={styles.flex1}>
            <Button
              title={cancelLabel}
              variant="tertiary"
              onPress={onClose}
              color="primary"
              size="medium"
            />
          </View>
          <View style={styles.flex1}>
            <Button
              title={confirmLabel}
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
        style={styles.hintTime}
      >
        {title}
      </Typography>

      <View style={styles.container}>
        {/* Highlight overlay */}
        <View style={styles.highlightOverlay} pointerEvents="none">
          <View style={styles.highlight} />
        </View>

        <View style={styles.scrollContainer}>
          {/* Hour Picker */}
          <View style={styles.pickerColumn}>
            <Animated.FlatList
              ref={hourRef}
              data={hours}
              renderItem={renderHourItem}
              keyExtractor={(_, index) => `hour-${index}`}
              showsVerticalScrollIndicator={false}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              onMomentumScrollEnd={(e) => handleScrollEnd(e, 'hour')}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: hourScrollY } } }],
                { useNativeDriver: true }
              )}
              scrollEventThrottle={16}
              getItemLayout={getItemLayout}
              onScrollToIndexFailed={handleScrollToIndexFailed}
              initialNumToRender={VISIBLE_ITEMS + 2}
              maxToRenderPerBatch={10}
              windowSize={11}
              removeClippedSubviews={true}
              contentContainerStyle={styles.scrollContent}
            />
          </View>

          {/* Minute Picker */}
          <View style={styles.pickerColumn}>
            <Animated.FlatList
              ref={minuteRef}
              data={minutes}
              renderItem={renderMinuteItem}
              keyExtractor={(_, index) => `minute-${index}`}
              showsVerticalScrollIndicator={false}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              onMomentumScrollEnd={(e) => handleScrollEnd(e, 'minute')}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: minuteScrollY } } }],
                { useNativeDriver: true }
              )}
              scrollEventThrottle={16}
              getItemLayout={getItemLayout}
              onScrollToIndexFailed={handleScrollToIndexFailed}
              initialNumToRender={VISIBLE_ITEMS + 2}
              maxToRenderPerBatch={10}
              windowSize={11}
              removeClippedSubviews={true}
              contentContainerStyle={styles.scrollContent}
            />
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
  hintTime: { marginBottom: 16 },
});
