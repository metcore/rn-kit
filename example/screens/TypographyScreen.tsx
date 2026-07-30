import { View } from 'react-native';
import { Color, Typography } from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoLabel } from '../components/demo';

const VARIANTS = [
  { variant: 'h1', size: '36 / 46' },
  { variant: 'h2', size: '32 / 42' },
  { variant: 'h3', size: '28 / 38' },
  { variant: 'h4', size: '24 / 34' },
  { variant: 'p1', size: '20 / 30' },
  { variant: 'p2', size: '18 / 28' },
  { variant: 'p3', size: '16 / 26' },
  { variant: 't1', size: '14 / 14' },
  { variant: 't2', size: '12 / 14' },
  { variant: 't3', size: '10 / 14' },
] as const;

const WEIGHTS = ['regular', 'medium', 'semibold', 'bold'] as const;

const COLORS = [
  { label: 'primary[1000]', value: Color.primary[1000] },
  { label: 'gray[600]', value: Color.gray[600] },
  { label: 'success[500]', value: Color.success[500] },
  { label: 'danger[500]', value: Color.danger[500] },
] as const;

export default function TypographyScreen() {
  return (
    <DemoScreen
      title="Typography"
      description="Komponen teks dengan skala ukuran, ketebalan, warna, perataan, dan pemotongan baris yang konsisten."
    >
      <DemoSection
        title="Skala varian"
        note="10 variant dari h1 (terbesar) sampai t3 (terkecil) mengatur ukuran font dan line-height."
      >
        {VARIANTS.map(({ variant, size }) => (
          <View key={variant}>
            <DemoLabel text={`variant="${variant}" (${size})`} />
            <Typography variant={variant} color={Color.gray[900]}>
              Contoh teks {variant}
            </Typography>
          </View>
        ))}
      </DemoSection>

      <DemoSection
        title="Ketebalan"
        note="Prop weight mengatur ketebalan huruf tanpa mengubah ukuran variant."
      >
        {WEIGHTS.map((weight) => (
          <View key={weight}>
            <DemoLabel text={`weight="${weight}"`} />
            <Typography variant="p2" weight={weight} color={Color.gray[900]}>
              Contoh teks {weight}
            </Typography>
          </View>
        ))}
      </DemoSection>

      <DemoSection
        title="Warna"
        note="Warna teks selalu dikirim eksplisit lewat prop color, bukan mengandalkan warna default."
      >
        {COLORS.map(({ label, value }) => (
          <View key={label}>
            <DemoLabel text={`color={Color.${label}}`} />
            <Typography variant="p2" color={value}>
              Contoh teks berwarna
            </Typography>
          </View>
        ))}
      </DemoSection>

      <DemoSection
        title="Perataan"
        note="Prop center dan right mengatur perataan teks di dalam baris."
      >
        <DemoLabel text="center" />
        <Typography variant="p2" center color={Color.gray[900]}>
          Teks ini rata tengah
        </Typography>
        <DemoLabel text="right" />
        <Typography variant="p2" right color={Color.gray[900]}>
          Teks ini rata kanan
        </Typography>
      </DemoSection>

      <DemoSection
        title="Pemotongan teks"
        note="numberOfLines memotong teks panjang dan menambahkan elipsis otomatis."
      >
        <DemoLabel text="numberOfLines={2}" />
        <Typography variant="p2" numberOfLines={2} color={Color.gray[900]}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s.
        </Typography>
      </DemoSection>
    </DemoScreen>
  );
}
