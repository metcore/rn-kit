import { useCallback, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import BottomSheet from '../BottomSheet/BottomSheet';
import Button from '../Button/Button';
import Chip from '../Chip/Chip';
import { type ChipSelectedProps } from '../Chip/type';
import Input from '../Input/Input';
import Loading from '../Loading/Loading';
import { useToast } from '../Toast/ToastContext';
import { type SelectProps } from './type';
import { useRef } from 'react';
export default function Select({
  isOpen,
  data,
  renderItem,
  onClose,
  onSubmit,
  multiple = false,
  onSearch,
  required = false,
  loading = false,
  delaySearch = 300,
  height,
  onRefresh,
  refreshing,
  footer,
  header,
  onEndReached,
  submitBtnLabel,
}: SelectProps) {
  // const [isOpenSelect, setIsOpenSelect] = useState<boolean | undefined>(false);
  const [selected, setSelected] = useState<ChipSelectedProps>();
  const [searchQuery, setSearchQuery] = useState<string>();
  const { show } = useToast();
  // useEffect(() => {
  //   setIsOpenSelect(isOpen);
  // }, [isOpen]);

  const handleOnCloseBottom = useCallback(
    (val: boolean) => {
      if (onClose) {
        onClose?.(val);
      }
    },
    [onClose]
  );

  const handleOnPresSubmitSelect = (): boolean => {
    if (required && (!selected || selected.length === 0)) {
      show('Please fill a item');
      return false;
    }
    onSubmit?.(selected ? selected : []);
    return true;
  };

  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleOnSearch = (val: string) => {
    setSearchQuery(val);

    // clear timeout sebelumnya
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // set timeout baru
    searchTimeout.current = setTimeout(() => {
      onSearch?.(val);
    }, delaySearch);
  };

  return (
    <BottomSheet
      onClose={(val: boolean) => handleOnCloseBottom(val)}
      isOpen={isOpen}
      height={height}
      footer={
        multiple ? (
          <Button
            title={submitBtnLabel ?? 'Lanjutkan'}
            color="primary"
            disabled={(!selected || selected.length === 0) && required}
            onPress={handleOnPresSubmitSelect}
          />
        ) : undefined
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
              value={searchQuery}
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
            onEndReached={onEndReached}
            color="primary"
            size="large"
            renderItem={renderItem}
            onRefresh={onRefresh}
            block
            refreshing={refreshing}
            footer={footer}
            header={header}
            contentContainerStyle={styles.chipContainer}
            onSelect={(item) => {
              setSelected(item);
              if (!multiple && required) {
                onSubmit?.(item);
                handleOnCloseBottom(false);
              } else if (!multiple && !required) {
                const isSame =
                  Array.isArray(item) && Array.isArray(selected)
                    ? item[0] === selected?.[0]
                    : item === selected;

                const nextValue = !multiple && !required && isSame ? [] : item;

                setSelected(nextValue);
                onSubmit?.(nextValue);
                handleOnCloseBottom(false);
              }
            }}
          />
        )}
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 140,
  },
  containerSearch: {
    gap: 14,
    paddingBottom: 12,
  },
  chipContainer: {
    paddingBottom: 14,
  },
});
