import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useState, useEffect } from 'react';

import { SelectProps } from './type';
import BottomSheet from '../BottomSheet/BottomSheet';
import Card from '../Ui/Card';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import Color from '../Color/Color';
import Input from '../Input/Input';
export default function Select({
  isOpen,
  data,
  renderItem,
  onClose,
  onSubmit,
  onSearch,
}: SelectProps) {
  const [isOpenSelect, setIsOpenSelect] = useState<string | null>(false);
  const [selected, setSelected] = useState(null);

  const handleOnPressSelectItem = (val: string | number) => {
    setSelected(val);
  };

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

  const DefaultItem = ({ item }) => <Typography>{item.label}</Typography>;

  const renderItemWrapper = ({ item }) => {
    const content = renderItem ? (
      renderItem({ item, isSelected: selected === item.value })
    ) : (
      <DefaultItem item={item} />
    );
    return (
      <TouchableOpacity onPress={() => handleOnPressSelectItem(item?.value)}>
        <Card
          style={[
            { marginBottom: 6 },
            selected == item.value && {
              backgroundColor: Color.primary[50],
              borderColor: Color.primary[300],
            },
          ]}
        >
          {content}
        </Card>
      </TouchableOpacity>
    );
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
        <FlatList
          data={data}
          renderItem={renderItemWrapper}
          keyExtractor={(item) => item.value}
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
