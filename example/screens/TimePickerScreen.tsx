import { Button, Container, TimePicker, Typography } from '@herca/rn-kit';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

export default function TimePickerScreen() {
  const [isOpenTimePicker, setIsOpenTimePicker] = useState<boolean>(false);
  const [value, setValue] = useState<{ hour: number; minute: number }>();

  return (
    <Container style={styles.container}>
      <Button
        onPress={() => setIsOpenTimePicker(true)}
        title="Open Time picker"
      />
      <TimePicker
        onClose={() => setIsOpenTimePicker(false)}
        isOpen={isOpenTimePicker}
        onChange={(val) => setValue(val)}
      />

      <Typography>
        {value?.hour}:{value?.minute}
      </Typography>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
});
