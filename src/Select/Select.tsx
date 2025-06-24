import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useState, useEffect } from 'react';
import { type SelectProps } from './type';
import BottomSheet from '../BottomSheet/BottomSheet';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Chip from '../Chip/Chip';
import { type ChipSelectedProps } from '../Chip/type';
import { useToast } from '../Toast/ToastContext';
import Loading from '../Loading/Loading';
export default function Select({
  isOpen,
  data,
  renderItem,
  onClose,
  onSubmit,
  multiple,
  onSearch,
  required = false,
  loading = false,
  delaySearch = 300,
  height,
  onRefresh,
  refreshing,
}: SelectProps) {
  const [isOpenSelect, setIsOpenSelect] = useState<boolean | undefined>(false);
  const [selected, setSelected] = useState<ChipSelectedProps>();
  const { show } = useToast();
  useEffect(() => {
    setIsOpenSelect(isOpen);
  }, [isOpen]);

  const handleOnCloseBottom = (val: boolean) => {
    onClose?.(val);
  };

  const handleOnPresSubmitSelect = (): boolean => {
    if (required && (!selected || selected.length === 0)) {
      show('Please fill a item');
      return false;
    }
    setIsOpenSelect(false);
    onSubmit?.(selected ? selected : []);
    return true;
  };

  const handleOnSearch = (val: string) => {
    setTimeout(() => {
      onSearch?.(val);
    }, delaySearch);
  };
  return (
    <BottomSheet
      onClose={handleOnCloseBottom}
      isOpen={isOpenSelect}
      height={height}
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
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <Input
              submitBehavior="submit"
              icon="Search"
              placeholder="Search"
              onChangeText={(val) => handleOnSearch(val)}
            />
          </TouchableWithoutFeedback>
        </View>
        {loading ? (
          <Loading />
        ) : (
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
            onRefresh={onRefresh}
            block
            refreshing={refreshing}
          />
        )}
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
