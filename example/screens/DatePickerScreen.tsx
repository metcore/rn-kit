import { Button, Container, DatePicker, Typography } from '@herca/ui-kit';
import { useState } from 'react';
import { View } from 'react-native';
const formatDate = (date: Date) => {
  if (!date) return null;
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, '0');
  const d = `${date.getDate()}`.padStart(2, '0');
  return `${y}-${m}-${d}`;
};
interface OnChangeProps {
  startDate: Date;
  endDate: Date;
}

export default function DatePickerScreen() {
  const [isOpenDatePickerSingle, setIsOpenDatePickerSingle] = useState(false);
  const [isOpenDatePickerRange, setIsOpenDatePickerRange] = useState(false);
  const [valueSingle, setValueSingle] = useState<string>();
  const [valueRange, setValueRange] = useState<OnChangeProps>();
  return (
    <Container>
      <View style={{ gap: 4 }}>
        <Button
          title="Open Date picker single"
          color="primary"
          onPress={() => setIsOpenDatePickerSingle(true)}
        />
        <Typography>Value selected :{valueSingle}</Typography>
        <Button
          title="Open Date Picker Range"
          color="primary"
          onPress={() => setIsOpenDatePickerRange(true)}
        />
        <Typography>
          Value selected : {valueRange?.startDate} - {valueRange?.endDate}
        </Typography>
      </View>
      <DatePicker
        mode={'single'}
        isOpen={isOpenDatePickerSingle}
        onChange={(value) => setValueSingle(formatDate(value.date))}
        onClose={() => setIsOpenDatePickerSingle(false)}
        placholder={'Pilih tanggal'}
      />

      <DatePicker
        mode="range"
        isOpen={isOpenDatePickerRange}
        onChange={(value: OnChangeProps) => {
          setValueRange({
            startDate: formatDate(value.startDate),
            endDate: formatDate(value.endDate),
          });
        }}
        onClose={() => setIsOpenDatePickerRange(false)}
        placholder={'Pilih tanggal'}
      />
    </Container>
  );
}
