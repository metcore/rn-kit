import React, { useState, useEffect, useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import {
  type ChipOptionProps,
  type ChipProps,
  type ChipSelectedProps,
  type ChipValue,
} from './type';
import ChipItem from './ChipItem';

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
  onRefresh,
  refreshing = false,
  onEndReached,
  footer,
  header,
  contentContainerStyle,
}) => {
  const isHorizontal = direction === 'horizontal';

  const normalizeSelected = (val: ChipSelectedProps) =>
    Array.isArray(val) ? val : val ? [val] : [];

  const [internalSelected, setInternalSelected] = useState<ChipSelectedProps>(
    normalizeSelected(selected)
  );

  useEffect(() => {
    const newSelected = normalizeSelected(selected);
    if (JSON.stringify(newSelected) !== JSON.stringify(internalSelected)) {
      setInternalSelected(newSelected);
    }
  }, [selected, internalSelected]);

  const isSelected = (value: ChipValue) => internalSelected.includes(value);

  const handleSelect = (value: string | number) => {
    let newSelected: ChipSelectedProps;

    if (multiple || (!multiple && internalSelected.length === 0)) {
      newSelected = isSelected(value)
        ? internalSelected.filter((v) => v !== value)
        : [...internalSelected, value];
    } else {
      newSelected = [value];
    }

    setInternalSelected(newSelected);

    if (onSelect) {
      onSelect(newSelected);
    }
  };

  const numColumns = useMemo(() => {
    if (isHorizontal || block) return 1;
    return 2;
  }, [block, isHorizontal]);

  const handleOnPresChipItem = (isDisabled: boolean, item: ChipOptionProps) => {
    !isDisabled && handleSelect(item.value);
    onPress?.(item.value);
  };

  const flexDirectionStyle = isHorizontal ? 'row' : 'column';
  const alignItemsStyle = block ? 'stretch' : 'flex-start';

  return (
    <FlatList
      data={options}
      renderItem={({ item }) => (
        <ChipItem
          item={item}
          isSelected={() => isSelected(item.value)}
          color={color}
          block={block}
          onPress={handleOnPresChipItem}
          size={size}
          renderItem={renderItem}
        />
      )}
      keyExtractor={(item) => String(item.value)}
      horizontal={isHorizontal}
      onEndReached={onEndReached}
      onRefresh={onRefresh}
      refreshing={refreshing}
      scrollEnabled={scrollable}
      keyboardShouldPersistTaps="always"
      numColumns={numColumns}
      contentContainerStyle={[
        styles.container,
        contentContainerStyle,
        {
          flexDirection: flexDirectionStyle,
          alignItems: alignItemsStyle,
        },
      ]}
      columnWrapperStyle={numColumns > 1 ? styles.wrapperStyle : undefined}
      ListFooterComponent={footer}
      ListHeaderComponent={header}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  wrapperStyle: {
    gap: 8,
    flexWrap: 'wrap',
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
