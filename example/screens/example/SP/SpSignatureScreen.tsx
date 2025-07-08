import { Typography } from '@herca/rn-kit';
import React, { useRef, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import SignatureView from 'react-native-signature-canvas';

const SpSignatureScreen = () => {
  const [signature, setSignature] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef();

  const handleSignature = (signature) => {
    console.log('Signature captured:', signature);
    setSignature(signature);
    setIsLoading(false);
  };

  const handleEmpty = () => {
    console.log('Signature is empty');
    setIsLoading(false);
  };

  const handleClear = () => {
    console.log('Signature cleared');
    setSignature(null);
  };

  const handleError = (error) => {
    console.error('Signature pad error:', error);
    setIsLoading(false);
  };

  const handleEnd = () => {
    setIsLoading(true);
    ref.current?.readSignature();
  };

  return (
    <View style={styles.container}>
      <Typography>tes</Typography>
      <View style={styles.preview}>
        {signature && (
          <Image
            resizeMode="contain"
            style={{ width: 335, height: 114 }}
            source={{ uri: signature }}
          />
        )}
      </View>
      <SignatureView
        ref={ref}
        onEnd={handleEnd}
        onOK={handleSignature}
        onEmpty={handleEmpty}
        onClear={handleClear}
        onError={handleError}
        autoClear={true}
        descriptionText="Sign here"
        clearText="Clear"
        confirmText={isLoading ? 'Processing...' : 'Save'}
        penColor="#000000"
        backgroundColor="rgba(255,255,255,0)"
        webviewProps={{
          cacheEnabled: true,
          androidLayerType: 'hardware',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  preview: {
    width: 335,
    height: 114,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
});

export default SpSignatureScreen;
