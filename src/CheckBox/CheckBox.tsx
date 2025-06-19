import React, { useState, useEffect } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Color, Icon } from '@herca/kit'; // Pastikan Icon sudah tersedia

interface CheckBoxProps {
  checked?: boolean;
  onChange: (checked: boolean) => void;
  label?: string | React.ReactNode;
  disabled?: boolean;
  renderLabel?: () => React.ReactNode;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  checked = false,
  onChange,
  label,
  disabled = false,
  renderLabel,
}) => {
  const [value, setValue] = useState<boolean>(false);

  const handlePress = () => {
    const newValue = !value;
    setValue(newValue);
    onChange?.(newValue);
  };

  useEffect(() => {
    setValue(checked);
  }, [checked]);

  return (
    <Pressable
      onPress={() => !disabled && handlePress()}
      style={styles.container}
    >
      <View
        style={[
          styles.checkBox,
          value && styles.checked,
          disabled && styles.disabled,
        ]}
      >
        {value && <Icon name="Check" size={14} color={Color.base.white100} />}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
      {renderLabel?.()}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: Color.gray[500],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginRight: 8,
  },
  checked: {
    backgroundColor: Color.primary[1000],
    borderColor: Color.primary[1000],
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: 14,
    color: '#333',
  },
});

export default CheckBox;
