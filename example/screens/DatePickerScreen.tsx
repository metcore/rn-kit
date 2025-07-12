import {
  Button,
  Color,
  Container,
  DatePicker,
  Typography,
  type DateRangeProps,
} from '@herca/rn-kit';
import { useState } from 'react';
import { View } from 'react-native';
import { formatDate } from '../../src/Calendar/Calendar';

export default function DatePickerScreen() {
  const [isOpenDatePickerSingle, setIsOpenDatePickerSingle] = useState(false);
  const [isOpenDatePickerRange, setIsOpenDatePickerRange] = useState(false);
  const [hintMessage, setHintMessage] = useState<string>('Error');
  const [valueSingle, setValueSingle] = useState<string | null>();
  const [valueRange, setValueRange] = useState<{
    startDate: string | null;
    endDate: string | null;
  }>();
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
        onChange={(value: DateRangeProps) => {
          setValueSingle(formatDate(value.date));
        }}
        onClose={() => setIsOpenDatePickerSingle(false)}
        placholder={'Pilih tanggal'}
        disabledDays={{
          0: {
            backgroundColor: Color.danger[50],
            textColor: Color.danger[400],
          },
          6: true,
          5: false,
        }}
      />

      <DatePicker
        mode="range"
        isOpen={isOpenDatePickerRange}
        onChange={(value: DateRangeProps) => {
          setValueRange({
            startDate: formatDate(value.startDate),
            endDate: formatDate(value.endDate),
          });
        }}
        disabledDays={{
          0: {
            backgroundColor: Color.danger[50],
            textColor: Color.danger[400],
          },
          6: true,
          5: false,
        }}
        onHasError={(_val: boolean) => {
          setHintMessage(
            'Tanggal belum dipilih. Harap tentukan periode tanggal sebelum melanjutkan.'
          );
        }}
        hint={hintMessage}
        onClose={() => setIsOpenDatePickerRange(false)}
        placholder={'Pilih tanggal'}
        required={true}
      />
    </Container>
  );
}
