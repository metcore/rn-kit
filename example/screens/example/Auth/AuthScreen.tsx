import { Button, Container } from '@herca/ui-kit';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../../type/navigation';

export default function AuthScreen() {
  const navigation = useNavigation<NavigationProps>();
  return (
    <Container>
      <Button
        color="primary"
        title="Login"
        onPress={navigation.navigate('Login')}
      />
      <Button
        color="primary"
        title="Forgot Password"
        onPress={navigation.navigate('ForgotPassword')}
      />
    </Container>
  );
}
