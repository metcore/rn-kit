import { StyleSheet, View } from 'react-native';
import {
  Badge,
  Button,
  Color,
  Container,
  Select,
  Typography,
  type ChipOptionProps,
  type ChipSelectedProps,
} from '@herca/kit';
import { useState } from 'react';

const DATA = [
  {
    value: 1,
    label: 2,
    description: 'wkwkwkwkwkwkkw',
  },
  {
    value: 2,
    label: 'tes',
    description: 'wkwkwk',
  },
  {
    value: 3,
    label: 'tes',
    description: 'wkowowkowkwowo',
  },
  {
    value: 4,
    label: 'tes',
  },
  {
    value: 5,
    label: 'tes',
  },
  {
    value: 6,
    label: 'tes',
  },
  {
    value: 7,
    label: 'tes',
  },
  {
    value: 8,
    label: 'tes',
  },
  {
    value: 9,
    label: 'tes',
  },
  {
    value: 10,
    label: 'tes',
  },
  {
    value: 11,
    label: 'tes11',
  },
  {
    value: 12,
    label: 'tes',
  },
  {
    value: 13,
    label: 'tes',
  },
  {
    value: 14,
    label: 'tes',
  },
];

export default function SelectScreen() {
  const [isOpenSelectDefault, setIsOpenSelectDefault] =
    useState<boolean>(false);
  const [isOpenSelectCustom, setIsOpenSelectCustom] = useState<boolean>(false);
  const [submitValue, setSubmitValue] = useState<ChipSelectedProps>();

  const handleSubmitSelectCustom = (val: ChipSelectedProps) => {
    setSubmitValue(val);
    setIsOpenSelectCustom(false);
  };
  const renderItem = (item: ChipOptionProps) => {
    return (
      <View>
        <View style={styles.containerItem}>
          <Typography variant="t3" weight="medium" color={Color.gray[900]}>
            {item.label}
          </Typography>
          <Badge value="New" size="small" color="danger" />
        </View>
        <Typography color={Color.gray[600]} variant="t3" weight="regular">
          {item?.description}
        </Typography>
      </View>
    );
  };
  return (
    <View>
      <Container style={styles.containerButton}>
        <Button
          color="primary"
          onPress={() => setIsOpenSelectDefault(true)}
          title="Select Default"
        />
        <Button
          color="primary"
          onPress={() => setIsOpenSelectCustom(true)}
          title="Custom Item"
        />
        <Typography>submitValue: {submitValue}</Typography>
      </Container>
      <Select
        isOpen={isOpenSelectDefault}
        onClose={() => setIsOpenSelectDefault(false)}
        data={DATA}
        onSearch={(val) => console.log(val)}
        onSubmit={handleSubmitSelectCustom}
      />
      <Select
        isOpen={isOpenSelectCustom}
        onClose={() => setIsOpenSelectCustom(false)}
        data={DATA}
        multiple
        renderItem={renderItem}
        onSubmit={handleSubmitSelectCustom}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerItem: {
    flexDirection: 'row',
    gap: 4,
  },
  containerButton: {
    gap: 8,
  },
});
