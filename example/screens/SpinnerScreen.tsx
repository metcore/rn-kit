import { View } from 'react-native';
import Spinner from '../../src/Spinner/Spinner';
import { Container } from '@herca/rn-kit';

export default function SpinnerScreen() {
  return (
    <Container>
      <View style={{ backgroundColor: 'black' }}>
        <Spinner />
      </View>
    </Container>
  );
}
