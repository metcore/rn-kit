import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Color, Container, Modal, Typography } from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoLabel } from '../components/demo';
import summaryData from '../assets/loremipsum.json';

export default function ModalScreen() {
  const [isOpenBasic, setIsOpenBasic] = useState(false);
  const [isOpenFooter, setIsOpenFooter] = useState(false);
  const [isOpenScroll, setIsOpenScroll] = useState(false);
  const [isOpenLocked, setIsOpenLocked] = useState(false);
  const [lastClosedVia, setLastClosedVia] = useState('-');

  return (
    <DemoScreen
      title="Modal"
      description="Dialog pop-up di tengah layar dengan animasi skala, backdrop, dan tombol close opsional."
    >
      <DemoSection
        title="Buka & tutup dasar"
        note="isOpen mengontrol tampil/sembunyi; onClose dipanggil saat backdrop atau tombol X ditekan."
      >
        <Button title="Buka modal dasar" onPress={() => setIsOpenBasic(true)} />
        <Modal isOpen={isOpenBasic} onClose={() => setIsOpenBasic(false)}>
          <Container style={styles.gap12}>
            <Typography variant="p2" weight="semibold" color={Color.gray[900]}>
              Modal dasar
            </Typography>
            <Typography variant="t2" color={Color.gray[600]}>
              Tekan backdrop atau tombol X di kanan atas untuk menutup.
            </Typography>
          </Container>
        </Modal>
      </DemoSection>

      <DemoSection
        title="Aksi di footer"
        note="Modal tidak punya prop footer khusus; aksi ditempatkan sebagai children biasa, dibingkai agar terlihat seperti footer."
      >
        <Button
          title="Buka modal dengan aksi"
          onPress={() => setIsOpenFooter(true)}
        />
        <Modal isOpen={isOpenFooter} onClose={() => setIsOpenFooter(false)}>
          <Container style={styles.gap16}>
            <Typography variant="p2" weight="semibold" color={Color.gray[900]}>
              Setujui pengajuan?
            </Typography>
            <View style={styles.row}>
              <View style={styles.flex1}>
                <Button
                  title="Batal"
                  variant="outline"
                  block
                  onPress={() => {
                    setIsOpenFooter(false);
                    setLastClosedVia('tombol Batal');
                  }}
                />
              </View>
              <View style={styles.flex1}>
                <Button
                  title="Setujui"
                  color="primary"
                  block
                  onPress={() => {
                    setIsOpenFooter(false);
                    setLastClosedVia('tombol Setujui');
                  }}
                />
              </View>
            </View>
          </Container>
        </Modal>
      </DemoSection>

      <DemoSection
        title="Konten panjang"
        note="Tinggi modal dibatasi maxHeight 80% layar; bungkus konten panjang dengan ScrollView sendiri agar bisa digulir."
      >
        <Button
          title="Buka modal konten panjang"
          onPress={() => setIsOpenScroll(true)}
        />
        <Modal isOpen={isOpenScroll} onClose={() => setIsOpenScroll(false)}>
          <Container style={styles.gap12}>
            <Typography variant="p2" weight="semibold" color={Color.gray[900]}>
              Syarat & ketentuan
            </Typography>
            <Typography variant="t2" color={Color.gray[600]}>
              {summaryData.summary}
            </Typography>
          </Container>
        </Modal>
      </DemoSection>

      <DemoSection
        title="Tidak bisa ditutup"
        note="closable={false} menyembunyikan tombol X dan menonaktifkan tutup lewat backdrop; hanya tombol di dalam yang bisa menutupnya."
      >
        <DemoLabel text="closable={false}" />
        <Button
          title="Buka modal terkunci"
          onPress={() => setIsOpenLocked(true)}
        />
        <Modal
          isOpen={isOpenLocked}
          closable={false}
          onClose={() => setIsOpenLocked(false)}
        >
          <Container style={styles.gap12Center}>
            <Typography variant="p2" weight="semibold" color={Color.gray[900]}>
              Baca sampai selesai
            </Typography>
            <Button
              title="Saya mengerti"
              color="primary"
              onPress={() => {
                setIsOpenLocked(false);
                setLastClosedVia('tombol Saya mengerti');
              }}
            />
          </Container>
        </Modal>
      </DemoSection>

      <DemoSection
        title="Status penutupan"
        note="Readout ini hanya terisi dari tombol aksi di dalam modal (footer & terkunci), karena Modal tidak membedakan sumber saat backdrop/X ditekan."
      >
        <Typography variant="t3" color={Color.gray[700]}>
          {`Terakhir ditutup lewat: ${lastClosedVia}`}
        </Typography>
      </DemoSection>
    </DemoScreen>
  );
}

const styles = StyleSheet.create({
  gap12: {
    gap: 12,
  },
  gap16: {
    gap: 16,
  },
  gap12Center: {
    gap: 12,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  flex1: {
    flex: 1,
  },
});
