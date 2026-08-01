import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Color, Container, Typography } from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoLabel } from '../components/demo';

/**
 * A frame with no padding of its own.
 *
 * This screen cannot use DemoSurface: that is a Container now, so its padding
 * would be indistinguishable from the padding this screen is demonstrating,
 * and the "without Container" comparison would come out padded anyway.
 */
const Stage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.stage}>{children}</View>
);

export default function ContainerScreen() {
  return (
    <DemoScreen
      title="Container"
      description="Container membungkus konten dengan padding horizontal dan vertikal yang konsisten, cocok untuk membungkus seluruh tampilan layar."
    >
      <DemoSection
        title="Padding default"
        note="Container menambah paddingHorizontal 24 dan paddingVertical 8; blok pastel di dalam memperlihatkan tepinya. Panggung di layar ini sengaja tanpa padding agar yang terlihat murni milik Container."
      >
        <Stage>
          <Container style={styles.whiteBg}>
            <View style={styles.block} />
          </Container>
        </Stage>
      </DemoSection>

      <DemoSection
        title="Dengan vs tanpa Container"
        note="Tanpa Container, konten menempel langsung ke tepi panggungnya."
      >
        <DemoLabel text="<Container>" />
        <Stage>
          <Container style={styles.whiteBg}>
            <Typography variant="t2" color={Color.gray[900]}>
              Ada jarak di sekeliling konten
            </Typography>
          </Container>
        </Stage>
        <DemoLabel text="tanpa Container" />
        <Stage>
          <View style={styles.whiteBg}>
            <Typography variant="t2" color={Color.gray[900]}>
              Menempel ke tepi panggung
            </Typography>
          </View>
        </Stage>
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

      <DemoSection
        title="Dipakai DemoSurface"
        note="Panggung berbingkai di layar-layar lain adalah Container yang diberi border dan radius, jadi tiap demo sudah kebagian padding yang sama tanpa perlu membungkusnya sendiri."
      >
        <DemoLabel text="<Container style={{ borderWidth: 1, borderRadius: 16 }}>" />
        <Container style={styles.surfaceLike}>
          <Typography variant="t2" color={Color.gray[900]}>
            Persis bentuk panggung yang dipakai layar lain
          </Typography>
        </Container>
      </DemoSection>
    </DemoScreen>
  );
}

const styles = StyleSheet.create({
  stage: {
    borderWidth: 1,
    borderColor: Color.gray[300],
    borderRadius: 16,
    overflow: 'hidden',
    gap: 12,
  },
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
  surfaceLike: {
    borderWidth: 1,
    borderColor: Color.gray[300],
    borderRadius: 16,
  },
});
