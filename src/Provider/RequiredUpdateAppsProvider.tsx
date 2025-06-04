import { Image, View } from 'react-native';
import { Button, Color, Container, Modal, Typography } from '..';

export default function RequiredUpdateAppsProvider({
  title,
  description,
  buttonText = 'Update Sekarang',
}) {
  return (
    <View>
      <Modal height={300} isOpen={true} closable={false}>
        <Image
          source={require('../../example/assets/updateapps.png')}
          style={{ position: 'absolute', marginTop: -60, left: 30 }}
        />
        <Container style={{ gap: 20, marginTop: 80 }}>
          <Typography
            variant="h4"
            weight="semibold"
            color={Color.gray[800]}
            center
          >
            {title}
          </Typography>
          <Typography
            variant="xs"
            weight="regular"
            color={Color.gray[600]}
            center
          >
            {description}.
          </Typography>
          <View style={{}}>
            <Button title={buttonText} color="primary" />
          </View>
        </Container>
      </Modal>
    </View>
  );
}
