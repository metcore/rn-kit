import {
  BottomSheet,
  Button,
  Card,
  Center,
  Color,
  Container,
  Footer,
  Icon,
  Modal,
  Typography,
} from '@herca/ui-kit';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import type { NavigationProps } from '../../../type/navigation';

export default function SpSignatureScreen() {
  const navigation = useNavigation<NavigationProps>();
  const [isOpenConfirmSubmit, setIsOpenConfirmSubmit] = useState(false);
  const [isOpenConfirmBack, setIsOpenConfirmBack] = useState(false);
  const [isOpenModalSuccess, setIsOpenModalSuccess] = useState(false);
  const [pendingBackAction, setPendingBackAction] = useState<any>(null);
  const [hasSuccess, setHasSuccess] = useState(false);

  const handleConfirm = () => {
    setHasSuccess(true);
    setIsOpenConfirmSubmit(false);
    setIsOpenModalSuccess(true);
  };
  useEffect(() => {
    if (!hasSuccess) {
      const unsubscribe = navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
        setPendingBackAction(e.data.action);
        setIsOpenConfirmBack(true);
      });
      return unsubscribe;
    }
    return undefined;
  }, [navigation, hasSuccess]);

  return (
    <View>
      <Container style={{ gap: 16 }}>
        <Typography variant="p2" weight="semibold" color={Color.gray[800]}>
          Tanda Tangan Persetujuan Peringatan.
        </Typography>
        <View style={{ gap: 16 }}>
          <Typography variant="t2" weight="medium" color={Color.gray[800]}>
            Tanda Tangan Persetujuan Peringatan.
          </Typography>
          <Card style={{ height: 327 }}>
            <Typography>tes</Typography>
          </Card>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Button variant="tertiary">
                <Typography>
                  <Icon name="ArrowBackAlt" />
                </Typography>
              </Button>
              <Button variant="tertiary">
                <Typography>
                  <Icon name="ArrowForwardAlt" />
                </Typography>
              </Button>
            </View>
            <Button
              title="Clear"
              variant="outline"
              size="small"
              color="primary"
            />
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
              <Button
                title="Kembali"
                variant="tertiary"
                color="danger"
                onPress={() => setIsOpenConfirmBack(true)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                title="Lanjutkan"
                variant="default"
                color="primary"
                onPress={() => setIsOpenConfirmSubmit(true)}
              />
            </View>
          </View>
        </Container>
      </Footer>

      {/* BottomSheet Konfirmasi Submit */}
      <BottomSheet
        isOpen={isOpenConfirmSubmit}
        onClose={() => setIsOpenConfirmSubmit(false)}
      >
        <View style={{ gap: 15 }}>
          <View style={styles.containerBottomSheet}>
            <Typography
              variant="p2"
              weight="semibold"
              color={Color.gray[800]}
              center
            >
              Apakah Kamu yakin ingin menyetujui surat peringatan ini?
            </Typography>
            <Typography
              variant="t1"
              weight="regular"
              color={Color.gray[500]}
              center
            >
              Jika kamu konfirmasi, tanda tanganmu akan digunakan sebagai bukti
              persetujuan surat peringatan.
            </Typography>
          </View>
          <Button
            title="Konfirmasi Persetujuan"
            color="primary"
            onPress={handleConfirm}
          />
          <Button
            title="Cek kembali"
            color="primary"
            variant="tertiary"
            onPress={() => setIsOpenConfirmSubmit(false)}
          />
        </View>
      </BottomSheet>

      {/* BottomSheet Konfirmasi Back */}
      <BottomSheet
        isOpen={isOpenConfirmBack}
        onClose={() => {
          setIsOpenConfirmBack(false);
          setPendingBackAction(null);
        }}
      >
        <View style={{ gap: 15 }}>
          <View style={styles.containerBottomSheet}>
            <Typography
              variant="p2"
              weight="semibold"
              color={Color.gray[800]}
              center
            >
              Hapus Tanda Tangan?
            </Typography>
            <Typography
              variant="t1"
              weight="regular"
              color={Color.gray[500]}
              center
            >
              Jika kamu kembali sekarang, kamu akan kehilangan Tanda Tangan yang
              telah dibuat.
            </Typography>
          </View>

          <Button
            title="Lanjutkan tanda tangan"
            color="primary"
            onPress={() => {
              setIsOpenConfirmBack(false);
              setPendingBackAction(null);
            }}
          />
          <Button
            title="Kembali"
            color="danger"
            variant="tertiary"
            onPress={() => {
              setIsOpenConfirmBack(false);
              if (pendingBackAction) {
                navigation.dispatch(pendingBackAction); // Trigger kembali
              }
            }}
          />
        </View>
      </BottomSheet>
      <Modal isOpen={isOpenModalSuccess} closable={false}>
        <Container>
          <View style={{ gap: 32, alignItems: 'center' }}>
            <Image source={require('../../../assets/positive-vote-1.png')} />
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

const styles = StyleSheet.create({
  containerBottomSheet: {
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
