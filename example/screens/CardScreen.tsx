import { Card, Color, Container, Icon, Typography } from '@herca/rn-kit';
import { ScrollView } from 'react-native';

export default function CardScreen() {
  return (
    <ScrollView>
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
        <Typography variant="h4" weight="semibold">
          Border color
        </Typography>
        <Card
          backgroundColor={Color.purple[50]}
          borderColor={Color.purple[200]}
          style={{ width: '48%' }}
        >
          <Icon
            name="bookmark-user"
            size={30}
            color={Color.purple[500]}
            style={{ marginBottom: 8 }}
          />
          <Typography color={Color.gray[900]} weight="semibold" variant="p3">
            200 Juta Tiket
          </Typography>
          <Typography color={Color.gray[600]} variant="t3">
            Selesai Dikerjakan
          </Typography>
        </Card>
      </Container>
    </ScrollView>
  );
}
