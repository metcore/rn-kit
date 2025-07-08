import { useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SignatureView from 'react-native-signature-canvas';

export default function Drawing() {
  const ref = useRef();

  return (
    <View style={styles.container}>
      <Text>Sedang di bangun</Text>
      <SignatureView
        ref={ref}
        autoClear={true}
        descriptionText="Sign here"
        clearText="Clear"
        confirmText={'Processing...'}
        penColor="#000000"
        backgroundColor="rgba(255,255,255,0)"
        webviewProps={{
          cacheEnabled: true,
          androidLayerType: 'hardware',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    width: 335,
    height: 114,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
});
