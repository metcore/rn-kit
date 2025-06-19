import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Typography, Color } from '@herca/kit';

interface RadioButtonItem {
  label: string;
  value: string;
  disabled?: boolean;
}

interface RadioButtonProps {
  items: RadioButtonItem[];
  selectedValue: string | null;
  onChange: (value: string) => void;
  direction?: 'vertical' | 'horizontal';
  value?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  items,
  selectedValue,
  onChange,
  direction = 'vertical',
}) => {
  return (
    <View
      style={[
        styles.container,
        direction === 'horizontal' && styles.horizontal,
      ]}
    >
      {items.map((item) => {
        const isChecked = selectedValue === item.value;
        return (
          <View key={item.value} style={styles.item}>
            <Pressable
              onPress={() => !item.disabled && onChange(item.value)}
              style={[styles.radioContainer, item.disabled && styles.disabled]}
            >
              <View
                style={[styles.outerCircle, isChecked && styles.checkedOuter]}
              >
                {isChecked && <View style={styles.innerCircle} />}
              </View>
            </Pressable>
            <Typography variant="t2" weight="medium" color={Color.gray[800]}>
              {item.label}
            </Typography>
          </View>
        );
      })}
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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginRight: 16,
  },
  radioContainer: {
    marginRight: 8,
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
