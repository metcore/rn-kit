import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Color, Icon, Typography } from '@herca/rn-kit';
import {
  DemoScreen,
  DemoSection,
  DemoRow,
  DemoLabel,
} from '../components/demo';

const VARIANTS = ['default', 'outline', 'tertiary'] as const;
const SIZES = ['small', 'medium', 'large'] as const;
const COLORS = [
  'default',
  'primary',
  'success',
  'danger',
  'warning',
  'info',
  'orange',
  'purple',
] as const;

export default function ButtonScreen() {
  const [pressCount, setPressCount] = useState(0);

  return (
    <DemoScreen
      title="Button"
      description="Tombol serbaguna dengan varian, ukuran, warna, dan status disabled/loading yang bisa dikombinasikan."
    >
      <DemoSection
        title="Varian"
        note="variant mengubah gaya tampilan: default (penuh warna), outline (border saja), atau tertiary (minimalis)."
      >
        <DemoRow>
          {VARIANTS.map((variant) => (
            <View key={variant} style={styles.item}>
              <Button title="Simpan" variant={variant} color="primary" />
              <DemoLabel text={`variant="${variant}"`} />
            </View>
          ))}
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Ukuran"
        note="size mengatur padding tombol: small, medium, atau large."
      >
        <DemoRow>
          {SIZES.map((size) => (
            <View key={size} style={styles.item}>
              <Button title="Simpan" size={size} color="primary" />
              <DemoLabel text={`size="${size}"`} />
            </View>
          ))}
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Warna"
        note="color memilih tema warna tombol pada variant default."
      >
        <DemoRow>
          {COLORS.map((color) => (
            <Button key={color} title={color} size="small" color={color} />
          ))}
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Keadaan nonaktif & loading"
        note="disabled mengunci tombol; loading menampilkan indikator sambil menyembunyikan title."
      >
        <DemoRow>
          <View style={styles.item}>
            <Button title="Nonaktif" disabled color="primary" />
            <DemoLabel text="disabled" />
          </View>
          <View style={styles.item}>
            <Button title="Memuat" loading color="primary" />
            <DemoLabel text="loading" />
          </View>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Lebar tombol"
        note="block membuat tombol memenuhi lebar kontainer; width mengatur lebar spesifik dalam piksel."
      >
        <DemoLabel text="block" />
        <Button title="Lebar penuh" block color="primary" />
        <DemoLabel text="width={160}" />
        <Button title="Lebar tetap" width={160} color="primary" />
      </DemoSection>

      <DemoSection
        title="Konten kustom"
        note="children menggantikan title sehingga isi tombol bisa berupa kombinasi ikon dan teks bebas."
      >
        <DemoLabel text="children" />
        <Button color="primary">
          <Icon name="Plus" size={16} color={Color.base.white100} />
          <Typography variant="t1" weight="medium" color={Color.base.white100}>
            {' '}
            Tambah data
          </Typography>
        </Button>
      </DemoSection>

      <DemoSection
        title="Interaksi onPress"
        note="Callback onPress dipanggil setiap tombol ditekan; readout di bawah menghitung jumlah tekan."
      >
        <Button
          title="Tekan saya"
          color="primary"
          onPress={() => setPressCount((count) => count + 1)}
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Ditekan: ${pressCount}x`}
        </Typography>
      </DemoSection>
    </DemoScreen>
  );
}

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    gap: 8,
  },
});
