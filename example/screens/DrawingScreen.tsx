import { Container, Drawing } from '@herca/rn-kit';
import { useState } from 'react';
import { ScrollView, Text } from 'react-native';

export default function DrawingScreen() {
  const [value, setValue] = useState(null);
  return (
    <Container>
      <ScrollView>
        <Drawing onDraw={setValue} />
        <Text>{value}</Text>
      </ScrollView>
    </Container>
  );
}
