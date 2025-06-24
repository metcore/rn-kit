import {
  Button,
  Center,
  Color,
  Container,
  Modal,
  Typography,
} from '@herca/rn-kit';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image, View } from 'react-native';
import type { NavigationProps } from '../type/navigation';

export default function ModalScreen() {
  const navigation = useNavigation<NavigationProps>();
  const [isOpenModalDefault, setOpenModalDefault] = useState(false);
  const [isOpenModalDefaultCannotClose, setOpenModalDefaultCannotClose] =
    useState(false);
  return (
    <View>
      <Container style={{ gap: 8 }}>
        <Button
          title="Modal Default"
          onPress={() => setOpenModalDefault(true)}
          color="primary"
        />
        <Button
          title="Modal Default Cannot Close"
          onPress={() => setOpenModalDefaultCannotClose(true)}
          color="primary"
        />
      </Container>
      <Modal
        onClose={() => setOpenModalDefault(false)}
        isOpen={isOpenModalDefault}
      >
        <Container>
          <View style={{ gap: 32, alignItems: 'center' }}>
            <Image source={require('../assets/positive-vote-1.png')} />
            <View>
              <Center style={{ gap: 4 }}>
                <Typography
                  variant="p2"
                  weight="semibold"
                  color={Color.gray[800]}
                >
                  Berhasil disetujui
                </Typography>
                <Typography
                  variant="t2"
                  weight="regular"
                  color={Color.gray[500]}
                >
                  Surat Peringatan berlaku selama 6 bulan, jika dalam masa
                  tersebut kamu menerima Surat Peringatan lain, maka level surat
                  Peringatan akan ditingkatkan.
                </Typography>
              </Center>
            </View>
            <Button title="Ok, Mengerti" block color="primary" />
          </View>
        </Container>
      </Modal>
      <Modal
        onClose={() => setOpenModalDefaultCannotClose(false)}
        closable={false}
        isOpen={isOpenModalDefaultCannotClose}
      >
        <Container>
          <View style={{ gap: 32, alignItems: 'center' }}>
            <Image source={require('../assets/positive-vote-1.png')} />
            <View>
              <Center style={{ gap: 4 }}>
                <Typography
                  variant="p2"
                  weight="semibold"
                  color={Color.gray[800]}
                >
                  Berhasil disetujui
                </Typography>
                <Typography
                  variant="t2"
                  weight="regular"
                  center
                  color={Color.gray[500]}
                >
                  Surat Peringatan berlaku selama 6 bulan, jika dalam masa
                  tersebut kamu menerima Surat Peringatan lain, maka level surat
                  Peringatan akan ditingkatkan.
                </Typography>
              </Center>
            </View>
            <Button
              title="Ok, Mengerti"
              block
              color="primary"
              onPress={() => navigation.replace('Home')}
            />
          </View>
        </Container>
      </Modal>
    </View>
  );
}
