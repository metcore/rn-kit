import { StyleSheet, View, Image } from 'react-native';
import { useRef, useState } from 'react';
import SignatureCanvas, {
  type SignatureViewRef,
} from 'react-native-signature-canvas';

export default function Drawing() {
  const [signature, setSignature] = useState<string>();
  const ref = useRef<SignatureViewRef>();

  const handleSignature = (signature: string) => {
    setSignature(signature);
  };

  const handleEmpty = () => {
    console.log('Empty');
  };

  const handleClear = () => {
    console.log('Clear success!');
  };

  const handleEnd = () => {
    ref.current.readSignature(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {signature && (
          <Image
            resizeMode="contain"
            style={{ width: 335, height: 114 }}
            source={{ uri: signature }}
          />
        )}
      </View>
      <SignatureCanvas
        ref={ref}
        onEnd={handleEnd}
        onOK={handleSignature}
        onEmpty={handleEmpty}
        onClear={handleClear}
        autoClear={true}
        descriptionText="Sign here"
        clearText="Clear"
        confirmText="Save"
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
