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
import type { DateProps } from '../../src/Calendar/CalendarPropsType';
import { spacing } from '../../src/styles/spacing';

export default function DatePickerScreen() {
  const [isOpenDatePickerSingle, setIsOpenDatePickerSingle] = useState(false);
  const [isOpenDatePickerRange, setIsOpenDatePickerRange] = useState(false);
  const [hintMessage, setHintMessage] = useState<string>('Error');
  const [valueSingle, setValueSingle] = useState<DateProps>();
  const [valueRange, setValueRange] = useState<{
    startDate: DateProps;
    endDate: DateProps;
  }>();
  return (
    <Container>
      <View style={spacing.gap[4]}>
        <Button
          title="Open Date picker single"
          color="primary"
          onPress={() => setIsOpenDatePickerSingle(true)}
        />
        <Typography>Value selected :{valueSingle?.toString()}</Typography>
        <Button
          title="Open Date Picker Range"
          color="primary"
          onPress={() => setIsOpenDatePickerRange(true)}
        />
        <Typography>
          Value selected : {valueRange?.startDate?.toString()}-
          {valueRange?.endDate?.toString()}
        </Typography>
      </View>
      <DatePicker
        mode={'single'}
        isOpen={isOpenDatePickerSingle}
        onChange={(value: DateRangeProps) => {
          setValueSingle(value.date);
        }}
        onClose={() => setIsOpenDatePickerSingle(false)}
        placholder={'Pilih tanggal'}
        value={{ date: valueSingle }}
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
            startDate: value.startDate,
            endDate: value.endDate,
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
        value={{
          startDate: valueRange?.startDate,
          endDate: valueRange?.endDate,
        }}
        onClose={() => setIsOpenDatePickerRange(false)}
        placholder={'Pilih tanggal'}
        required={true}
      />
    </Container>
  );
}
