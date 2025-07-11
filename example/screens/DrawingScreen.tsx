import { Container, Drawing } from '@herca/rn-kit';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text } from 'react-native';

export default function DrawingScreen() {
  const [value, setValue] = useState<string | undefined | null>();
  const [enableScroll, setEnableScroll] = useState(true);
  return (
    <Container>
      <ScrollView scrollEnabled={enableScroll}>
        <Drawing
          onChange={(val) => setValue(val)}
          onEnd={() => setEnableScroll(true)}
          onStart={() => setEnableScroll(false)}
        />
        {value && (
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: value }}
          />
        )}
        <Text>{value}</Text>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 335,
    height: 114,
  },
});
