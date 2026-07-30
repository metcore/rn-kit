import { StyleSheet, View } from 'react-native';
import { PdfView } from '@herca/rn-kit';
import { DemoScreen, DemoSection } from '../components/demo';

export default function PdfViewScreen() {
  return (
    <DemoScreen
      title="Pdf Viewer"
      description="PdfView menampilkan file PDF dari URL memakai react-native-pdf, memenuhi kontainer flex yang membungkusnya."
    >
      <DemoSection
        title="Menampilkan PDF dari URL"
        note="source.uri menerima URL PDF; PdfView butuh kontainer dengan tinggi pasti (di sini tinggi tetap) agar dokumen bisa discroll dan di-zoom."
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
    height: 480,
    borderRadius: 16,
    overflow: 'hidden',
  },
});
