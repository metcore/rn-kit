import { StyleSheet, View } from 'react-native';
import { PdfView } from '@herca/rn-kit';
import { DemoScreen, DemoSection } from '../components/demo';

export default function PdfViewScreen() {
  return (
    <DemoScreen
      title="PdfView"
      description="PdfView menampilkan file PDF dari URL memakai react-native-pdf, memenuhi kontainer flex yang membungkusnya."
      scrollable={false}
    >
      <DemoSection
        title="Menampilkan PDF dari URL"
        note="source.uri menerima URL PDF; PdfView butuh kontainer dengan tinggi pasti (di sini flex:1) agar dokumen bisa discroll dan di-zoom."
      >
        <View style={styles.viewer}>
          <PdfView
            trustAllCerts={false}
            source={{ uri: 'https://pdfobject.com/pdf/sample.pdf' }}
          />
        </View>
      </DemoSection>
    </DemoScreen>
  );
}

const styles = StyleSheet.create({
  viewer: {
    flex: 1,
  },
});
