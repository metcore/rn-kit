import { View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

import { SelectProps } from './type';
import BottomSheet from '../BottomSheet/BottomSheet';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Chip from '../Chip/Chip';
export default function Select({
  isOpen,
  data,
  renderItem,
  onClose,
  onSubmit,
  multiple,
  onSearch,
}: SelectProps) {
  const [isOpenSelect, setIsOpenSelect] = useState<string | null>(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setIsOpenSelect(isOpen);
  }, [isOpen]);

  const handleOnCloseBottom = (val) => {
    onClose?.(val);
  };

  const handleOnPresSubmitSelect = () => {
    setIsOpenSelect(false);
    onSubmit?.(selected);
  };

  return (
    <View>
      <BottomSheet
        onClose={handleOnCloseBottom}
        isOpen={isOpenSelect}
        footer={
          <Button
            title="lanjutkan"
            color="primary"
            onPress={handleOnPresSubmitSelect}
          />
        }
      >
        <View style={styles.containerSearch}>
          <Input
            icon="Search"
            placeholder="Search"
            onChangeText={(val) => onSearch?.(val)}
          />
        </View>
        <Chip
          options={data}
          direction="vertical"
          scrollable={false}
          selected={selected}
          multiple={multiple}
          onSelect={setSelected}
          color="primary"
          size="large"
          renderItem={renderItem}
          block
        />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  containerSearch: {
    gap: 14,
    padding: 12,
  },
});
