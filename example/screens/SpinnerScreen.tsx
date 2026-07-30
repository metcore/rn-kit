import { StyleSheet, View } from 'react-native';
import { Color, Spinner } from '@herca/rn-kit';
import {
  DemoScreen,
  DemoSection,
  DemoLabel,
  DemoRow,
} from '../components/demo';

const SIZES = [24, 48, 72] as const;

const COLORS = [
  { label: 'primary[1000]', value: Color.primary[1000] },
  { label: 'danger[500]', value: Color.danger[500] },
  { label: 'success[500]', value: Color.success[500] },
] as const;

export default function SpinnerScreen() {
  return (
    <DemoScreen
      title="Spinner"
      description="Spinner menampilkan indikator loading berbentuk lingkaran berputar dengan ukuran dan warna yang bisa diatur."
    >
      <DemoSection
        title="Ukuran"
        note="Prop size mengatur diameter spinner dalam piksel."
      >
        <DemoRow>
          {SIZES.map((size) => (
            <View key={size} style={styles.item}>
              <Spinner size={size} color={Color.primary[1000]} />
              <DemoLabel text={`size={${size}}`} />
            </View>
          ))}
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Warna"
        note="Prop color mengatur warna awal gradasi stroke spinner."
      >
        <DemoRow>
          {COLORS.map(({ label, value }) => (
            <View key={label} style={styles.item}>
              <Spinner size={40} color={value} />
              <DemoLabel text={`color={Color.${label}}`} />
            </View>
          ))}
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Warna default"
        note="Tanpa prop color, spinner berwarna putih (#FFFFFF) sehingga perlu latar gelap agar terlihat."
      >
        <View style={styles.darkSurface}>
          <Spinner />
        </View>
        <DemoLabel text="<Spinner />" />
      </DemoSection>
    </DemoScreen>
  );
}

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    gap: 8,
  },
  darkSurface: {
    backgroundColor: Color.gray[900],
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
});
