import { Button, Container, TimePicker } from '@herca/rn-kit';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

export default function TimePickerScreen() {
  const [isOpenTimePicker, setIsOpenTimePicker] = useState<boolean>(false);
  return (
    <Container style={styles.container}>
      <Button
        onPress={() => setIsOpenTimePicker(true)}
        title="Open Time picker"
      />
      <TimePicker
        onClose={() => setIsOpenTimePicker(false)}
        isOpen={isOpenTimePicker}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
});
