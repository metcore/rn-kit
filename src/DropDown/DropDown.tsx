import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  findNodeHandle,
  UIManager,
} from 'react-native';
import Color from '../Color/Color';
import type { DropDownProps } from './type';

const Dropdown = ({
  options,
  maxHeight = 200,
  onSelect,
  renderButton,
}: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<'left' | 'right'>(
    'left'
  );

  const buttonRef = useRef<TouchableOpacity>(null);
  const windowWidth = useWindowDimensions().width;

  const handleToggle = () => {
    if (!isOpen) {
      const handle = findNodeHandle(buttonRef.current);
      if (handle) {
        UIManager.measureInWindow(handle, (x, _y, width, _height) => {
          const middle = windowWidth / 2;
          setDropdownPosition(x + width / 2 > middle ? 'right' : 'left');
          setIsOpen(true);
        });
      }
    } else {
      setIsOpen(false);
    }
  };

  const handlePressOption = (value: string) => {
    setSelected(value.value);
    setIsOpen(false);
    onSelect?.(value.value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        ref={buttonRef}
        style={styles.dropdownButton}
        onPress={handleToggle}
      >
        {renderButton ? (
          renderButton
        ) : (
          <Text>{selected || 'Select an option'}</Text>
        )}
      </TouchableOpacity>

      {isOpen && (
        <View
          style={[
            styles.dropdownList,
            dropdownPosition === 'left' ? { left: 0 } : { right: 0 },
          ]}
        >
          <ScrollView nestedScrollEnabled style={{ maxHeight }}>
            {options.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePressOption(item)}
                style={[
                  styles.option,
                  selected === item.value ? styles.optionSelected : null,
                ]}
              >
                <Text>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    // width: 200, // or flexible
  },
  dropdownButton: {
    // borderWidth: 1,
    // borderColor: '#ccc',
    // padding: 12,
    // borderRadius: 6,
    // backgroundColor: '#fff',
  },
  dropdownList: {
    position: 'absolute',
    marginTop: 18,
    padding: 8,
    zIndex: 9999,
    gap: 4,
    borderWidth: 1,
    borderColor: Color.gray[50],
    borderRadius: 8,
    backgroundColor: Color.base.white100,
    width: 100,
  },
  option: {
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Color.base.white100,
  },
  optionSelected: {
    backgroundColor: Color.primary[50],
    borderColor: Color.primary[300],
  },
});
