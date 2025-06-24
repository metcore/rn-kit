import { Container, Typography } from '@herca/rn-kit';
import { View } from 'react-native';

export default function ContainerScreen() {
  return (
    <View>
      <Typography>
        Container digunakan untuk membungkus content, karena terdapat margin
      </Typography>
      <Container>
        <Typography variant="h3">With Container</Typography>
      </Container>
      <Typography variant="h3">Without Container</Typography>
    </View>
  );
}
