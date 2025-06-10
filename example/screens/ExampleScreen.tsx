import { Button, Container } from '@herca/ui-kit';
import { useNavigation } from '@react-navigation/native';

export default function ExampleScreen() {
  const navigation = useNavigation<any>();

  return (
    <Container style={{ gap: 8 }}>
      <Button title="sp" onPress={() => navigation.navigate('Sp')} />
      <Button title="Leave" onPress={() => navigation.navigate('Leave')} />
    </Container>
  );
}
