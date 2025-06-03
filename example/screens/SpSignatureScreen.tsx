import {
  Button,
  Card,
  Color,
  Container,
  Footer,
  Typography,
} from '@herca/ui-kit';
import { View } from 'react-native';

export default function SpSignatureScreen() {
  return (
    <View>
      <Container style={{ gap: 16 }}>
        <Typography variant="p2" weight="semibold" color={Color.gray[800]}>
          Tanda Tangan Persetujuan Peringatan.
        </Typography>
        <View style={{ gap: 12 }}>
          <Typography variant="t2" weight="medium" color={Color.gray[800]}>
            Tanda Tangan Persetujuan Peringatan.
          </Typography>
          <Card style={{ height: 327 }}></Card>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Button title="tes" variant="tertiary" />
            <Button title="Clear" variant="outline" color="primary" />
          </View>
          <Typography variant="t3" weight="regular" color={Color.gray[800]}>
            Tanda tangan-mu aman, Tanda tangan ini hanya akan digunakan untuk
            menyetujui dokumen Surat Peringatan, dan hanya Kamu serta Pembuat
            Surat Peringatan yang dapat melihatnya.
          </Typography>
        </View>
      </Container>
      <Footer>
        <Container>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{ flex: 1 }}>
              <Button title="Kembali" variant="tertiary" color="danger" />
            </View>
            <View style={{ flex: 1 }}>
              <Button title="Lanjutkan" variant="default" color="primary" />
            </View>
          </View>
        </Container>
      </Footer>
    </View>
  );
}
