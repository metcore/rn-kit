import React, { useRef, useState, useEffect, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';
import BottomSheet from '../BottomSheet/BottomSheet';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';
import Color from '../Color/Color';

const ITEM_HEIGHT = 40;
const SCREEN_WIDTH = Dimensions.get('window').width;
const VISIBLE_ITEMS = 5;
const MIDDLE_INDEX = Math.floor(VISIBLE_ITEMS / 2);
const REPEAT_COUNT = 5;

interface TimePickerProps {
  isOpen: boolean;
  onClose?: () => void;
  onChange?: (value: { hour: number; minute: number }) => void;
}

const generateItems = (max: number) => Array.from({ length: max }, (_, i) => i);

const repeatItems = (items: number[], repeatCount: number) =>
  Array.from({ length: repeatCount }).flatMap(() => items);

export default function TimePickerWheel({
  isOpen,
  onClose,
  onChange,
}: TimePickerProps) {
  const [selectedHour, setSelectedHour] = useState<number>(0);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);

  const hourRef = useRef<Animated.ScrollView>(null);
  const minuteRef = useRef<Animated.ScrollView>(null);

  const hourScrollY = useRef(new Animated.Value(0)).current;
  const minuteScrollY = useRef(new Animated.Value(0)).current;

  const hoursBase = generateItems(24);
  const minutesBase = generateItems(60);

  const hours = useMemo(
    () => repeatItems(hoursBase, REPEAT_COUNT),
    [hoursBase]
  );
  const minutes = useMemo(
    () => repeatItems(minutesBase, REPEAT_COUNT),
    [minutesBase]
  );

  const CENTER_INDEX_HOUR =
    Math.floor(hours.length / 2 / 24) * 24 + selectedHour;
  const CENTER_INDEX_MINUTE =
    Math.floor(minutes.length / 2 / 60) * 60 + selectedMinute;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        scrollToIndex(hourRef, CENTER_INDEX_HOUR);
        scrollToIndex(minuteRef, CENTER_INDEX_MINUTE);
      }, 100);
    }
  }, [
    isOpen,
    selectedMinute,
    selectedHour,
    CENTER_INDEX_HOUR,
    CENTER_INDEX_MINUTE,
  ]);

  const scrollToIndex = (
    ref: React.RefObject<Animated.ScrollView | null>,
    index: number,
    animated: boolean = true
  ) => {
    ref.current?.scrollTo({ y: index * ITEM_HEIGHT, animated });
  };

  const handleScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
    type: 'hour' | 'minute'
  ) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);

    if (type === 'hour') {
      const realValue = hours[index % 24];
      setSelectedHour(realValue);

      const newCenter = Math.floor(hours.length / 2 / 24) * 24 + realValue;
      if (Math.abs(index - newCenter) > 12) {
        scrollToIndex(hourRef, newCenter, false);
      }
    } else {
      const realValue = minutes[index % 60];
      setSelectedMinute(realValue);

      const newCenter = Math.floor(minutes.length / 2 / 60) * 60 + realValue;
      if (Math.abs(index - newCenter) > 12) {
        scrollToIndex(minuteRef, newCenter, false);
      }
    }
  };

  const handleSubmit = () => {
    onChange?.({ hour: selectedHour, minute: selectedMinute });
    onClose?.();
  };

  const renderAnimatedItem = (
    value: number,
    type: 'hour' | 'minute',
    index: number,
    scrollY: Animated.Value
  ) => {
    const normalizedValue =
      type === 'hour' ? ((value % 24) + 24) % 24 : ((value % 60) + 60) % 60;

    const inputRange = [
      (index - 2) * ITEM_HEIGHT,
      (index - 1) * ITEM_HEIGHT,
      index * ITEM_HEIGHT,
      (index + 1) * ITEM_HEIGHT,
      (index + 2) * ITEM_HEIGHT,
    ];

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.7, 0.85, 1, 0.85, 0.7],
      extrapolate: 'clamp',
    });

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.3, 0.6, 1, 0.6, 0.3],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        key={`${type}-${index}`}
        style={[styles.item, { transform: [{ scale }], opacity }]}
      >
        <Text style={styles.itemText}>
          {normalizedValue.toString().padStart(2, '0')}
        </Text>
      </Animated.View>
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
        style={styles.hintTime}
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
            <Animated.ScrollView
              ref={hourRef}
              showsVerticalScrollIndicator={false}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              onMomentumScrollEnd={(e) => handleScrollEnd(e, 'hour')}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: hourScrollY } } }],
                { useNativeDriver: true }
              )}
              scrollEventThrottle={16}
              contentContainerStyle={styles.scrollContent}
            >
              {hours.map((h, i) =>
                renderAnimatedItem(h, 'hour', i, hourScrollY)
              )}
            </Animated.ScrollView>
          </View>

          <View style={styles.pickerColumn}>
            <Animated.ScrollView
              ref={minuteRef}
              showsVerticalScrollIndicator={false}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              onMomentumScrollEnd={(e) => handleScrollEnd(e, 'minute')}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: minuteScrollY } } }],
                { useNativeDriver: true }
              )}
              scrollEventThrottle={16}
              contentContainerStyle={styles.scrollContent}
            >
              {minutes.map((m, i) =>
                renderAnimatedItem(m, 'minute', i, minuteScrollY)
              )}
            </Animated.ScrollView>
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
    fontSize: 22,
    color: Color.gray[900],
    fontWeight: '600',
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
