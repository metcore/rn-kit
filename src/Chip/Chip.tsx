import React, { useState, useEffect, useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, type ViewStyle } from 'react-native';
import {
  CHIP_COLOR_MAP,
  type ChipColor,
  type ChipOption,
  type ChipProps,
  type ChipSelectedProps,
} from './type';
import Typography from '../Typography/Typography';

const Chip: React.FC<ChipProps> = ({
  options,
  selected = [],
  onSelect,
  onPress,
  direction = 'horizontal',
  color = 'default',
  renderItem,
  multiple = false,
  scrollable = true,
  block = false,
  size = 'medium',
}) => {
  const isHorizontal = direction === 'horizontal';

  const validColors: ChipColor[] = [
    'default',
    'success',
    'danger',
    'primary',
    'warning',
    'info',
    'purple',
    'orange',
  ];
  const safeColor = validColors.includes(color) ? color : 'default';
  const colors = CHIP_COLOR_MAP[safeColor];

  const normalizeSelected = (val: ChipSelectedProps): string[] =>
    Array.isArray(val) ? val : val ? [val] : [];

  const [internalSelected, setInternalSelected] = useState<string[]>(
    normalizeSelected(selected)
  );

  useEffect(() => {
    const newSelected = normalizeSelected(selected);
    if (JSON.stringify(newSelected) !== JSON.stringify(internalSelected)) {
      setInternalSelected(newSelected);
    }
  }, [selected, internalSelected]);

  const isSelected = (value: string) => internalSelected.includes(value);

  const handleSelect = (value: string) => {
    let newSelected: string[];
    if (!multiple) {
      newSelected = [value];
    } else {
      newSelected = isSelected(value)
        ? internalSelected.filter((v) => v !== value)
        : [...internalSelected, value];
    }

    setInternalSelected(newSelected);

    if (onSelect) {
      if (multiple) {
        onSelect(newSelected);
      } else if (newSelected[0]) {
        onSelect(newSelected[0]);
      }
    }
  };

  const numColumns = useMemo(() => {
    if (isHorizontal || block) return 1;
    return 2;
  }, [block, isHorizontal]);

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.chipSmall;
      case 'large':
        return styles.chipLarge;
      case 'medium':
      default:
        return styles.chipMedium;
    }
  };

  const handleOnPres = (isDisabled: boolean, item: ChipOption) => {
    !isDisabled && handleSelect(item.value);
    onPress?.(item.value);
  };

  const renderChip = ({ item }: { item: (typeof options)[number] }) => {
    const selectedState = isSelected(item.value);
    const isDisabled = item.disabled ?? false;

    const dynamicStyle: ViewStyle = {
      borderColor: colors.borderColor,
      backgroundColor: colors.backgroundColor,
    };

    if (selectedState) {
      dynamicStyle.borderColor = colors.selectedBorderColor;
      dynamicStyle.backgroundColor = colors.selectedBackgroundColor;
    }

    if (isDisabled) {
      dynamicStyle.borderColor = colors.disabledBorderColor;
      dynamicStyle.backgroundColor = colors.disabledBackgroundColor;
    }

    const isBlockMode = block && !isHorizontal;

    return (
      <Pressable
        key={item.value}
        style={[
          styles.chip,
          getSizeStyle(),
          dynamicStyle,
          isBlockMode && styles.blockChip,
        ]}
        onPress={() => handleOnPres(isDisabled, item)}
        disabled={isDisabled}
      >
        {renderItem ? (
          renderItem(item, selectedState, isDisabled)
        ) : (
          <Typography
            variant="t2"
            style={{
              fontSize: size === 'small' ? 12 : size === 'large' ? 16 : 14,
              color: isDisabled
                ? colors.disabledTextColor
                : selectedState
                  ? colors.selectedTextColor
                  : colors.textColor,
            }}
          >
            {item.label}
          </Typography>
        )}
      </Pressable>
    );
  };

  return (
    <FlatList
      data={options}
      renderItem={renderChip}
      keyExtractor={(item) => item.value}
      horizontal={isHorizontal}
      scrollEnabled={scrollable}
      numColumns={numColumns}
      contentContainerStyle={[
        styles.container,
        {
          flexDirection: isHorizontal ? 'row' : 'column',
          alignItems: block ? 'stretch' : 'flex-start',
        },
      ]}
      columnWrapperStyle={
        numColumns > 1 ? { gap: 8, flexWrap: 'wrap' } : undefined
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  chip: {
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  chipSmall: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  chipMedium: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  chipLarge: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  blockChip: {
    width: '100%',
    alignSelf: 'stretch',
  },
});

export default Chip;
