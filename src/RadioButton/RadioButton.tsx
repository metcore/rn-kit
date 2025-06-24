import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Typography, Color } from '@herca/rn-kit';

interface RadioButtonItem {
  label: string;
  value: string;
  disabled?: boolean;
}

interface RadioButtonProps {
  items: RadioButtonItem[];
  selectedValue: string | null;
  onChange?: (value: string) => void;
  direction?: 'vertical' | 'horizontal';
}

const RadioButton: React.FC<RadioButtonProps> = ({
  items,
  selectedValue,
  onChange,
  direction = 'vertical',
}) => {
  const [internalValue, setInternalValue] = useState<string | null>(
    selectedValue
  );

  useEffect(() => {
    // If no value is selected, set the first non-disabled item as selected
    if (selectedValue === null) {
      const firstValidItem = items.find((item) => !item.disabled);
      if (firstValidItem) {
        setInternalValue(firstValidItem.value);
        onChange?.(firstValidItem.value);
      }
    } else {
      setInternalValue(selectedValue);
    }
  }, [selectedValue, items, onChange]);

  const handleOnPress = (item: RadioButtonItem) => {
    if (!item.disabled) {
      setInternalValue(item.value);
      onChange?.(item.value);
    }
  };

  return (
    <View
      style={[
        styles.container,
        direction === 'horizontal' && styles.horizontal,
      ]}
    >
      {items.map((item) => {
        const isChecked = internalValue === item.value;
        return (
          <View key={item.value} style={styles.item}>
            <Pressable
              onPress={() => handleOnPress(item)}
              style={[styles.radioContainer, item.disabled && styles.disabled]}
            >
              <View
                style={[styles.outerCircle, isChecked && styles.checkedOuter]}
              >
                {isChecked && <View style={styles.innerCircle} />}
              </View>
              <Typography variant="t2" weight="medium" color={Color.gray[800]}>
                {item.label}
              </Typography>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  horizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  radioContainer: {
    gap: 8,
    flexDirection: 'row',
  },
  outerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Color.gray[500] || '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedOuter: {
    borderColor: Color.primary[1000] || '#007bff',
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Color.primary[1000] || '#007bff',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default RadioButton;
