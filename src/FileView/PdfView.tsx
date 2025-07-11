import { View, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';

type Source = {
  uri?: string;
  headers?: {
    [key: string]: string;
  };
  cache?: boolean;
  cacheFileName?: string;
  expiration?: number;
  method?: string;
};

const PdfView = ({ source }: { source: Source }) => {
  if (!source) return <View />;

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        onLoadComplete={(pages) => console.log('number of pages:', pages)}
        onPageChanged={(page) => console.log('current page:', page)}
        onError={(err) => console.error(err)}
        style={styles.pdf}
      />
    </View>
  );
};

export default PdfView;

const styles = StyleSheet.create({
  container: { flex: 1 },
  pdf: { flex: 1 },
});
