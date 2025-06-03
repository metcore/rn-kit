import { Card, Color, Container, Typography } from '@herca/ui-kit';
import { View } from 'react-native';

export default function CardScreen() {
  return (
    <View>
      <Container>
        <Typography variant="h4" weight="semibold">
          Default
        </Typography>
        <Card>
          <Typography color={Color.gray[800]} weight="bold">
            What is Lorem Ipsum?
          </Typography>
          <Typography color={Color.gray[800]}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </Typography>
        </Card>
        <Typography variant="h4" weight="semibold">
          Background
        </Typography>
        <Card backgroundImage={require('../assets/sp_banner.png')}>
          <Typography color={Color.gray[800]} weight="bold">
            What is Lorem Ipsum?
          </Typography>
          <Typography color={Color.gray[800]}>
            Lorem Ipsum is simply dummy text of
          </Typography>
        </Card>
      </Container>
    </View>
  );
}
