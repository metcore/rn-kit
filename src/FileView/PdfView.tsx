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

interface Props extends React.ComponentProps<typeof Pdf> {
  source: Source;
}

const PdfView = ({ source, ...props }: Props) => {
  if (!source) return <View />;

  return (
    <View style={styles.container}>
      <Pdf source={source} style={styles.pdf} {...props} />
    </View>
  );
};

export default PdfView;

const styles = StyleSheet.create({
  container: { flex: 1 },
  pdf: { flex: 1 },
});
