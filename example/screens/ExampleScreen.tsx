import { Button, Container } from '@herca/kit';
import { useNavigation } from '@react-navigation/native';

export default function ExampleScreen() {
  const navigation = useNavigation<any>();

  return (
    <Container style={{ gap: 8 }}>
      <Button title="sp" onPress={() => navigation.navigate('Sp')} />
      <Button title="Leave" onPress={() => navigation.navigate('Leave')} />
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </Container>
  );
}
