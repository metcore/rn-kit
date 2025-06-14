import { AvatarGroup, Container } from '@herca/ui-kit';
const avatarPng = require('../assets/avatar.png');
export default function AvatarGroupScreen() {
  const avatars = [
    { source: avatarPng },
    { name: 'AC' },
    { source: { uri: 'https://i.pravatar.cc/150?img=1' }, name: 'Jane Doe' },
    { src: '', name: 'BH' },
    { src: '', name: 'Charlie Brown' },
    { source: avatarPng },
    { src: '', name: 'Charlie Brown' },
    {},
    { src: '', name: 'Charlie Brown' },
  ];
  return (
    <Container>
      <AvatarGroup avatars={avatars} size="large" maxVisible={4} />
      <AvatarGroup avatars={avatars} size="medium" maxVisible={10} />
      <AvatarGroup avatars={avatars} size="small" maxVisible={4} />
    </Container>
  );
}
