import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  findNodeHandle,
  UIManager,
  Modal,
} from 'react-native';
import Color from '../Color/Color';
import type { DropDownProps } from './type';
import type { ChipOptionProps } from '../Chip/type';

const Dropdown = ({
  options,
  maxHeight = 200,
  onSelect,
  renderButton,
  renderItem,
  width,
  value,
}: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | number>();
  const [align, setAlign] = useState<'left' | 'right'>('right');
  const [buttonLayout, setButtonLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const buttonRef = useRef<View>(null);
  const windowWidth = useWindowDimensions().width;

  const handleToggle = () => {
    if (!isOpen) {
      const handle = findNodeHandle(buttonRef.current);
      if (handle) {
        UIManager.measureInWindow(handle, (x, y, w, height) => {
          const middle = windowWidth / 2;
          setAlign(x + w / 2 > middle ? 'right' : 'left');
          setButtonLayout({ x, y, width: w, height });
          setIsOpen(true);
        });
      }
    } else {
      setIsOpen(false);
    }
  };

  const handlePressOption = (selectedOption: ChipOptionProps) => {
    setSelected(selectedOption.value);
    setIsOpen(false);
    onSelect?.(selectedOption.value);
  };

  useEffect(() => {
    if (value !== undefined) {
      setSelected(value as string | number);
    }
  }, [value]);

  return (
    <>
      <TouchableOpacity ref={buttonRef} onPress={handleToggle}>
        {renderButton}
      </TouchableOpacity>
      {isOpen && (
        <Modal transparent animationType="none" visible>
          <Pressable
            style={StyleSheet.absoluteFillObject}
            onPress={() => setIsOpen(false)}
          />

          <View
            style={[
              styles.dropdownList,
              {
                top: buttonLayout.y + buttonLayout.height,
                left: align === 'left' ? buttonLayout.x : undefined,
                right:
                  align === 'right'
                    ? windowWidth - (buttonLayout.x + buttonLayout.width)
                    : undefined,
                width: width,
              },
            ]}
          >
            <ScrollView nestedScrollEnabled style={{ maxHeight }}>
              {options.map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => handlePressOption(item)}
                  style={[
                    styles.option,
                    selected === item.value && styles.optionSelected,
                  ]}
                >
                  {renderItem ? (
                    renderItem(item, idx)
                  ) : (
                    <Text style={{ color: Color.gray[900] }}>{item.label}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Modal>
      )}
    </>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  button: {},
  dropdownList: {
    position: 'absolute',
    padding: 8,
    zIndex: 10,
    gap: 4,
    borderWidth: 1,
    borderColor: Color.gray[50],
    borderRadius: 8,
    backgroundColor: Color.base.white100,
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
