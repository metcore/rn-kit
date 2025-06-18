import { Button, Container, YearPicker } from '@herca/ui-kit';
import { useState } from 'react';

export default function YearPickerScreen() {
  const [isOpenYearPickerSingle, setIsOpenYearPickerSingle] =
    useState<boolean>(false);
  const [isOpenYearPickerRange, setIsOpenYearPickerRange] =
    useState<boolean>(false);
  return (
    <Container style={{ gap: 8 }}>
      <Button
        onPress={() => setIsOpenYearPickerSingle(true)}
        title="Open Yer Picker Single"
      />
      <Button
        onPress={() => setIsOpenYearPickerRange(true)}
        title="Open Yer Picker Range"
      />

      <YearPicker
        onClose={() => setIsOpenYearPickerSingle(false)}
        isOpen={isOpenYearPickerSingle}
        mode="single"
      />
      <YearPicker
        onClose={() => setIsOpenYearPickerRange(false)}
        isOpen={isOpenYearPickerRange}
        mode="range"
      />
    </Container>
  );
}
