import { Card, Color, Container, Typography } from '@herca/kit';
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
          Background Image
        </Typography>
        <Card backgroundImage={require('../assets/sp_banner.png')}>
          <Typography color={Color.base.white100} weight="bold">
            What is Lorem Ipsum?
          </Typography>
          <Typography color={Color.base.white100}>
            Lorem Ipsum is simply dummy text of
          </Typography>
        </Card>
        <Typography variant="h4" weight="semibold">
          Background Color
        </Typography>
        <Card backgroundColor={Color.primary[1000]}>
          <Typography color={Color.base.white100} weight="bold">
            What is Lorem Ipsum?
          </Typography>
          <Typography color={Color.base.white100}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </Typography>
        </Card>
      </Container>
    </View>
  );
}
