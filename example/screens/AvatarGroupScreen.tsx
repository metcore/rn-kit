import { AvatarGroup, Container } from '@herca/ui-kit';

export default function AvatarGroupScreen() {
  const avatars = [
    { src: 'https://i.pravatar.cc/150?img=1', name: 'Jane Doe' },
    { name: 'Alice' },
    {},
    { src: 'https://i.pravatar.cc/150?img=1', name: 'Jane Doe' },
    { src: '', name: 'Charlie Brown' },
  ];
  return (
    <Container>
      <AvatarGroup avatars={avatars} size="large" maxVisible={4} />
      <AvatarGroup avatars={avatars} size="medium" maxVisible={4} />
      <AvatarGroup avatars={avatars} size="small" maxVisible={4} />
    </Container>
  );
}
