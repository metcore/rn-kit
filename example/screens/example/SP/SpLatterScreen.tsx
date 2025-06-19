import {
  Alert,
  Button,
  Color,
  Container,
  Footer,
  Typography,
} from '@herca/kit';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProps } from '../../../type/navigation';

export default function SpLatterScreen() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <Container>
      <Footer>
        <Container style={{ gap: 12 }}>
          <Alert
            color="info"
            message="Ini adalah surat peringatan yang akan di Tandatangani"
          />
          <Button
            color="primary"
            onPress={() => navigation.navigate('SpSignature')}
          >
            <Typography
              variant="t1"
              weight="semibold"
              color={Color.base.white100}
            >
              Lanjutkan Tanda Tangan
            </Typography>
          </Button>
        </Container>
      </Footer>
    </Container>
  );
}
