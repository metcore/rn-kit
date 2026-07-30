import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomSheet, Button, Color, Input, Typography } from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoLabel } from '../components/demo';

export default function BottomSheetScreen() {
  const [isOpenBasic, setIsOpenBasic] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isOpenTall, setIsOpenTall] = useState(false);
  const [isOpenClose, setIsOpenClose] = useState(false);
  const [email, setEmail] = useState('');
  const [savedEmail, setSavedEmail] = useState('-');

  return (
    <DemoScreen
      title="Bottom Sheet"
      description="Modal geser dari bawah dengan gesture drag, keyboard-aware, dan tinggi yang bisa diatur."
    >
      <DemoSection
        title="Sheet dasar"
        note="isOpen mengontrol tampil/sembunyi; onClose dipanggil saat backdrop ditarik atau ditekan."
      >
        <Button title="Buka sheet dasar" onPress={() => setIsOpenBasic(true)} />
        <BottomSheet isOpen={isOpenBasic} onClose={() => setIsOpenBasic(false)}>
          <View style={styles.gap12}>
            <Typography variant="p2" weight="semibold" color={Color.gray[900]}>
              Sheet dasar
            </Typography>
            <Typography variant="t2" color={Color.gray[600]}>
              Tarik ke bawah atau tekan area gelap untuk menutup.
            </Typography>
          </View>
        </BottomSheet>
      </DemoSection>

      <DemoSection
        title="Konten form & footer"
        note="footer menempelkan aksi di bawah konten yang bisa digulir; cocok untuk form dengan tombol simpan."
      >
        <Button title="Buka sheet form" onPress={() => setIsOpenForm(true)} />
        <BottomSheet
          isOpen={isOpenForm}
          onClose={() => setIsOpenForm(false)}
          footer={
            <Button
              title="Simpan"
              color="primary"
              block
              onPress={() => {
                setSavedEmail(email || '-');
                setIsOpenForm(false);
              }}
            />
          }
        >
          <Input
            label="Email customer"
            placeholder="Masukkan email"
            autoFocus
            value={email}
            onChangeText={setEmail}
          />
        </BottomSheet>
        <Typography variant="t3" color={Color.gray[700]}>
          {`Email tersimpan: ${savedEmail}`}
        </Typography>
      </DemoSection>

      <DemoSection
        title="Tinggi kustom"
        note="height mengatur tinggi sheet: angka, persen, atau 'auto' (default) mengikuti tinggi konten."
      >
        <DemoLabel text='height="90%"' />
        <Button
          title="Buka sheet tinggi 90%"
          onPress={() => setIsOpenTall(true)}
        />
        <BottomSheet
          isOpen={isOpenTall}
          height="90%"
          onClose={() => setIsOpenTall(false)}
        >
          <View style={styles.gap12}>
            <Typography variant="p2" weight="semibold" color={Color.gray[900]}>
              Sheet tinggi
            </Typography>
            <Typography variant="t2" color={Color.gray[600]}>
              Sheet ini memakai height=&quot;90%&quot; dari layar.
            </Typography>
          </View>
        </BottomSheet>
      </DemoSection>

      <DemoSection
        title="Tombol close"
        note="buttonClose menambahkan tombol X di pojok sheet sebagai cara tutup tambahan selain drag dan backdrop."
      >
        <DemoLabel text="buttonClose" />
        <Button
          title="Buka sheet dengan tombol X"
          onPress={() => setIsOpenClose(true)}
        />
        <BottomSheet
          isOpen={isOpenClose}
          buttonClose
          onClose={() => setIsOpenClose(false)}
        >
          <View style={styles.gap12}>
            <Typography variant="p2" weight="semibold" color={Color.gray[900]}>
              Sheet dengan tombol X
            </Typography>
          </View>
        </BottomSheet>
      </DemoSection>
    </DemoScreen>
  );
}

const styles = StyleSheet.create({
  gap12: {
    gap: 12,
  },
});
