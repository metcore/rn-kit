import React from 'react';
import { View, StyleSheet } from 'react-native';
import Typography from '../Typography/Typography';
import Color from '../Color/Color';
import CheckBox from './CheckBox';
import { getTestID } from '../helpers/getTestID';
import type { Variant } from './type';

interface CheckBoxListItem {
  label: string;
  value: string;
  hint?: string;
}

interface CheckBoxListProps {
  items: CheckBoxListItem[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  direction?: 'vertical' | 'horizontal';
  color?: Variant;
  testID?: string;
}

const CheckBoxList: React.FC<CheckBoxListProps> = ({
  items,
  selectedValues,
  onChange,
  direction = 'vertical',
  color = 'primary',
  testID,
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
          testID={getTestID(testID, `option-${item.value}`)}
          checked={selectedValues.includes(item.value)}
          color={color}
          onChange={() => toggleValue(item.value)}
          renderLabel={() => (
            <Typography variant="t2" weight="medium" color={Color.gray[800]}>
              {item.label}
            </Typography>
          )}
          renderHint={() =>
            item.hint ? (
              <Typography variant="t3" weight="medium" color={Color.gray[700]}>
                {item.hint}
              </Typography>
            ) : undefined
          }
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
