import { Button, Container, useToast } from '@herca/ui-kit';

export default function ToastScreen() {
  const toast = useToast();

  const showTast = () => {
    toast.show('Tes', {
      color: 'danger',
    });
  };
  return (
    <Container>
      <Button title="Tes" onPress={showTast} />
    </Container>
  );
}
