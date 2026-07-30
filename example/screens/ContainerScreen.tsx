import { StyleSheet, View } from 'react-native';
import { Color, Container, Typography } from '@herca/rn-kit';
import {
  DemoScreen,
  DemoSection,
  DemoLabel,
  DemoSurface,
} from '../components/demo';

export default function ContainerScreen() {
  return (
    <DemoScreen
      title="Container"
      description="Container membungkus konten dengan padding horizontal dan vertikal yang konsisten, cocok untuk membungkus seluruh tampilan layar."
    >
      <DemoSection
        title="Padding default"
        note="Container menambah paddingHorizontal 24 dan paddingVertical 8; blok pastel di dalam memperlihatkan tepinya."
      >
        <DemoSurface>
          <Container style={styles.whiteBg}>
            <View style={styles.block} />
          </Container>
        </DemoSurface>
      </DemoSection>

      <DemoSection
        title="Dengan vs tanpa Container"
        note="Tanpa Container, konten menempel langsung ke tepi panggungnya."
      >
        <DemoLabel text="<Container>" />
        <DemoSurface>
          <Container style={styles.whiteBg}>
            <Typography variant="t2" color={Color.gray[900]}>
              Ada jarak di sekeliling konten
            </Typography>
          </Container>
        </DemoSurface>
        <DemoLabel text="tanpa Container" />
        <DemoSurface>
          <View style={styles.whiteBg}>
            <Typography variant="t2" color={Color.gray[900]}>
              Menempel ke tepi panggung
            </Typography>
          </View>
        </DemoSurface>
      </DemoSection>

      <DemoSection
        title="Style override"
        note="style menambah atau menimpa gaya default Container, misalnya background dan radius."
      >
        <DemoLabel text="style={{ backgroundColor: Color.primary[50] }}" />
        <Container style={styles.overrideBg}>
          <Typography variant="t2" color={Color.gray[900]}>
            Background kustom lewat style
          </Typography>
        </Container>
      </DemoSection>
    </DemoScreen>
  );
}

const styles = StyleSheet.create({
  whiteBg: {
    backgroundColor: Color.base.white100,
    borderRadius: 8,
  },
  block: {
    height: 40,
    borderRadius: 6,
    backgroundColor: Color.purple[200],
  },
  overrideBg: {
    backgroundColor: Color.primary[50],
    borderRadius: 8,
  },
});
