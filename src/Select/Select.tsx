import { View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { type SelectProps } from './type';
import BottomSheet from '../BottomSheet/BottomSheet';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Chip from '../Chip/Chip';
import { type ChipSelectedProps } from '../Chip/type';
export default function Select({
  isOpen,
  data,
  renderItem,
  onClose,
  onSubmit,
  multiple,
  onSearch,
}: SelectProps) {
  const [isOpenSelect, setIsOpenSelect] = useState<boolean | undefined>(false);
  const [selected, setSelected] = useState<ChipSelectedProps>(null);

  useEffect(() => {
    setIsOpenSelect(isOpen);
  }, [isOpen]);

  const handleOnCloseBottom = (val: boolean) => {
    onClose?.(val);
  };

  const handleOnPresSubmitSelect = () => {
    setIsOpenSelect(false);
    onSubmit?.(selected);
  };

  return (
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
      <View style={styles.container}>
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
          scrollable={true}
          selected={selected}
          multiple={multiple}
          onSelect={setSelected}
          color="primary"
          size="large"
          renderItem={renderItem}
          block
        />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 190,
  },
  containerSearch: {
    gap: 14,
    padding: 12,
  },
});
