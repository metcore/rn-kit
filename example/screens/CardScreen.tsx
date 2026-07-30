import { StyleSheet } from 'react-native';
import { Card, Color, Icon, Label, Typography } from '@herca/rn-kit';
import {
  DemoScreen,
  DemoSection,
  DemoLabel,
  DemoSurface,
} from '../components/demo';

export default function CardScreen() {
  return (
    <DemoScreen
      title="Card"
      description="Card membungkus konten dengan border, padding, dan background yang konsisten; cocok untuk kartu informasi."
    >
      <DemoSection
        title="Default"
        note="Card putih dengan border tipis default, ditampilkan di atas panggung pastel agar tepinya terlihat."
      >
        <DemoSurface>
          <Card>
            <Typography variant="p3" weight="bold" color={Color.gray[900]}>
              Judul Kartu
            </Typography>
            <Typography variant="t2" color={Color.gray[600]}>
              Deskripsi singkat isi kartu ditampilkan di sini.
            </Typography>
          </Card>
        </DemoSurface>
      </DemoSection>

      <DemoSection
        title="Konten komposit"
        note="Card dapat memuat kombinasi icon, judul, teks, dan Label sekaligus."
      >
        <DemoSurface>
          <Card>
            <Icon
              name="bookmark-user"
              size={28}
              color={Color.purple[500]}
              style={styles.icon}
            />
            <Typography variant="p3" weight="semibold" color={Color.gray[900]}>
              200 Juta Tiket
            </Typography>
            <Typography variant="t3" color={Color.gray[600]}>
              Selesai dikerjakan bulan ini
            </Typography>
            <Label label="Selesai" color="success" />
          </Card>
        </DemoSurface>
      </DemoSection>

      <DemoSection
        title="Warna & style override"
        note="backgroundColor, borderColor, dan style menimpa tampilan default Card."
      >
        <DemoLabel text="backgroundColor={Color.primary[1000]}" />
        <DemoSurface>
          <Card
            backgroundColor={Color.primary[1000]}
            borderColor={Color.primary[1000]}
          >
            <Typography variant="p3" weight="bold" color={Color.base.white100}>
              Kartu gelap
            </Typography>
            <Typography variant="t2" color={Color.primary[200]}>
              Teks tetap terbaca di atas background gelap.
            </Typography>
          </Card>
        </DemoSurface>

        <DemoLabel text="borderColor={Color.purple[200]} style={{ width: '60%' }}" />
        <DemoSurface>
          <Card
            backgroundColor={Color.purple[50]}
            borderColor={Color.purple[200]}
            style={styles.compactCard}
          >
            <Typography variant="t2" color={Color.purple[500]}>
              Border ungu, lebar dibatasi style
            </Typography>
          </Card>
        </DemoSurface>
      </DemoSection>
    </DemoScreen>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginBottom: 8,
  },
  compactCard: {
    width: '60%',
  },
});
