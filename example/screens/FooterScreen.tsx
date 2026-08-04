import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Color, Container, Footer, Typography } from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoLabel } from '../components/demo';

export default function FooterScreen() {
  const [buttonCount, setButtonCount] = useState<1 | 2>(1);

  return (
    <DemoScreen
      title="Footer"
      description="Footer menempelkan area aksi ke bagian paling bawah layar lewat context, cocok untuk tombol utama yang harus selalu terlihat."
    >
      <DemoSection
        title="Satu tombol"
        note="Footer aslinya menempel ke bawah layar (bukan ke posisi lokalnya), jadi pratinjau ini dibingkai frame tetap untuk perbandingan."
      >
        <DemoLabel text='<Footer><Button title="Simpan" block /></Footer>' />
        <View style={styles.frame}>
          <Container style={styles.frameContent}>
            <Button title="Simpan" block />
          </Container>
        </View>
      </DemoSection>

      <DemoSection
        title="Dua tombol"
        note="Dua Button berdampingan cocok untuk aksi sekunder dan primer, misal Batal dan Simpan."
      >
        <DemoLabel text="<Footer><Button .../><Button .../></Footer>" />
        <View style={styles.frame}>
          <Container style={[styles.frameContent, styles.row]}>
            <View style={styles.flexButton}>
              <Button title="Batal" variant="outline" block />
            </View>
            <View style={styles.flexButton}>
              <Button title="Simpan" block />
            </View>
          </Container>
        </View>
      </DemoSection>

      <DemoSection
        title="Contoh nyata"
        note="Footer sungguhan ditempel lewat context provider sehingga selalu berada di bagian paling bawah layar, terlepas dari posisinya di kode."
      >
        <Button
          title={`Ganti ke ${buttonCount === 1 ? 2 : 1} tombol`}
          variant="outline"
          onPress={() => setButtonCount(buttonCount === 1 ? 2 : 1)}
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Footer aktif menampilkan ${buttonCount} tombol di bawah layar.`}
        </Typography>
        <Footer>
          <Container style={styles.row}>
            <View style={styles.flexButton}>
              <Button title="Simpan" block />
            </View>
            {buttonCount === 2 ? (
              <View style={styles.flexButton}>
                <Button title="Lanjut" variant="outline" block />
              </View>
            ) : null}
          </Container>
        </Footer>
        <View style={styles.footerSpacer} />
      </DemoSection>
    </DemoScreen>
  );
}

const styles = StyleSheet.create({
  frame: {
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Color.gray[300],
    justifyContent: 'flex-end',
    backgroundColor: Color.base.white100,
  },
  frameContent: {
    paddingVertical: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  flexButton: {
    flex: 1,
  },
  footerSpacer: {
    height: 96,
  },
});
