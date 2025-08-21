import { Button, Container, Typography } from '@herca/rn-kit';
import { Animated } from 'react-native';
import { useRef } from 'react';

export default function TabDefaultScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <Container style={{ flex: 1 }}>
      <Animated.ScrollView
        style={{ flex: 1 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {/* Konten luar */}
        <Button>
          <Typography>Tes nama headernnya Tes nama headernnya</Typography>
        </Button>

        {/* Tab */}
      </Animated.ScrollView>
    </Container>
  );
}
