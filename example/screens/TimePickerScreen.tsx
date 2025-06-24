import { Button, Container, TimePicker } from '@herca/kit';
import { useState } from 'react';

export default function TimePickerScreen() {
  const [isOpenTimePicker, setIsOpenTimePicker] = useState<boolean>(false);
  return (
    <Container style={{ gap: 8 }}>
      <Button
        onPress={() => setIsOpenTimePicker(true)}
        title="Open Yer Picker Single"
      />
      <TimePicker
        onClose={() => setIsOpenTimePicker(false)}
        isOpen={isOpenTimePicker}
        mode="single"
      />
    </Container>
  );
}
