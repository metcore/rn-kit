import { Button, Container, MonthPicker } from '@herca/kit';
import { useState } from 'react';

export default function MonthPickerScreen() {
  const [isOpenMonthPickerSingle, setIsOpenMonthPickerSingle] =
    useState<boolean>(false);
  const [isOpenMonthPickerRange, setIsOpenMonthPickerRange] =
    useState<boolean>(false);
  return (
    <Container style={{ gap: 8 }}>
      <Button
        onPress={() => setIsOpenMonthPickerSingle(true)}
        title="Open Yer Picker Single"
      />
      <Button
        onPress={() => setIsOpenMonthPickerRange(true)}
        title="Open Yer Picker Range"
      />

      <MonthPicker
        onClose={() => setIsOpenMonthPickerSingle(false)}
        isOpen={isOpenMonthPickerSingle}
        mode="single"
      />
      <MonthPicker
        onClose={() => setIsOpenMonthPickerRange(false)}
        isOpen={isOpenMonthPickerRange}
        mode="range"
      />
    </Container>
  );
}
