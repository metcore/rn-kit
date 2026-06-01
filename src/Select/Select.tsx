import { useCallback, useState, useEffect } from 'react';
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
  searchValue,
  value,
  onSelectedChange,
}: SelectProps) {
  const [selected, setSelected] = useState<ChipSelectedProps>();
  const [searchQuery, setSearchQuery] = useState<string>(searchValue || '');
  const { show } = useToast();

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

  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    if (!multiple && value !== undefined) {
      setSelected(value);
    }
  }, [value, multiple]);

  useEffect(() => {
    if (multiple && isOpen) {
      setSelected(value ?? []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (searchValue !== undefined) {
      setSearchQuery(searchValue);
    }
  }, [searchValue]);
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
          <View style={styles.containerChip}>
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
              onSelect={(item) => {
                setSelected(item);
                console.log('selected item', item);
                const selectedData = data.filter(
                  (option) => Array.isArray(item) && item.includes(option.value)
                );

                onSelectedChange?.(selectedData);

                if (!multiple && required) {
                  onSubmit?.(item);
                  handleOnCloseBottom(false);
                } else if (!multiple && !required) {
                  const isSame =
                    Array.isArray(item) && Array.isArray(selected)
                      ? item[0] === selected?.[0]
                      : item === selected;

                  const nextValue =
                    !multiple && !required && isSame ? [] : item;

                  setSelected(nextValue);
                  onSubmit?.(nextValue);
                  handleOnCloseBottom(false);
                }
              }}
            />
          </View>
        )}
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 195,
  },
  containerSearch: {
    gap: 14,
    paddingBottom: 12,
  },
  containerChip: {
    paddingBottom: 12,
  },
});
