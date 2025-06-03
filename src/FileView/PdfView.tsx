import { View, Dimensions, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';

const PdfView = ({ source = null }) => {
  if (!source) {
    return <View></View>;
  }
  return (
    <View style={styles.flex}>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page) => {
          console.log(`current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        style={[styles.flex, { width: Dimensions.get('window').width }]}
      />
    </View>
  );
};

export default PdfView;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
