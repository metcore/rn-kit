import { Avatar, Container, Typography } from '@herca/ui-kit';

export default function AvatarScreen() {
  return (
    <Container>
      <Typography variant="h2" weight="semibold">
        Initial Name
      </Typography>
      <Avatar name="Hercules Dev" backgroundColor="#3b82f6" textColor="#fff" />
      <Typography variant="h2" weight="semibold">
        Image{' '}
      </Typography>
      <Avatar size="large" source={require('../assets/avatar.png')} />
    </Container>
  );
}
