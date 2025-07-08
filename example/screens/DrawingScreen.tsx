import { Container, Drawing } from '@herca/rn-kit';
import { useState } from 'react';
import { ScrollView, Text } from 'react-native';

export default function DrawingScreen() {
  const [value, setValue] = useState(null);
  const [enableScroll, setEnableScroll] = useState(true);
  return (
    <Container>
      <ScrollView scrollEnabled={enableScroll}>
        <Drawing
          onChange={() => setValue}
          onEnd={() => setEnableScroll(true)}
          onStart={() => setEnableScroll(false)}
        />
        <Text>{value}</Text>
      </ScrollView>
    </Container>
  );
}
