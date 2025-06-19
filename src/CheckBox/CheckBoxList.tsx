import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography, Color, CheckBox } from '@herca/kit';

interface CheckBoxListItem {
  label: string;
  value: string;
}

interface CheckBoxListProps {
  items: CheckBoxListItem[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  direction?: 'vertical' | 'horizontal';
}

const CheckBoxList: React.FC<CheckBoxListProps> = ({
  items,
  selectedValues,
  onChange,
  direction = 'vertical',
}) => {
  const toggleValue = (value: string) => {
    const newSelected = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    onChange(newSelected);
  };

  return (
    <View
      style={[
        styles.container,
        direction === 'horizontal' && styles.horizontal,
      ]}
    >
      {items.map((item) => (
        <CheckBox
          key={item.value}
          checked={selectedValues.includes(item.value)}
          onChange={() => toggleValue(item.value)}
          renderLabel={() => (
            <Typography variant="t2" weight="medium" color={Color.gray[800]}>
              {item.label}
            </Typography>
          )}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  horizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default CheckBoxList;
