import { Avatar, Container, Typography } from '@herca/rn-kit';

export default function AvatarScreen() {
  return (
    <Container>
      <Typography variant="h2" weight="semibold">
        Initial Name
      </Typography>
      <Avatar
        name="OP"
        size="large"
        backgroundColor="#3b82f6"
        textColor="#fff"
      />
      <Avatar name="OP" backgroundColor="#3b82f6" textColor="#fff" />
      <Avatar
        name="OP"
        size="small"
        backgroundColor="#3b82f6"
        textColor="#fff"
      />

      <Typography variant="h2" weight="semibold">
        Image{' '}
      </Typography>
      <Avatar size="large" source={require('../assets/avatar.png')} />
    </Container>
  );
}
