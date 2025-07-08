import { useRef } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import SignatureCanvas, {
  type SignatureViewRef,
} from 'react-native-signature-canvas';
import Icon from '../Icon';
import Button from '../Button/Button';
import Color from '../Color/Color';

interface DrawingProps {
  onDraw?: (value?: string | undefined) => void;
}

const Drawing = ({ onDraw }: DrawingProps) => {
  const ref = useRef<SignatureViewRef | null>(null);

  const handleSignature = (signature: string) => {
    if (signature && onDraw) {
      onDraw(signature);
    }
  };

  const handleEmpty = () => {
    console.log('Signature is empty');
  };

  const handleClear = () => {
    console.log('Signature cleared');
  };

  const handleError = (error: Error) => {
    console.error('Signature pad error:', error);
  };

  const handleEnd = () => {
    ref.current?.readSignature();
  };

  const undo = () => ref.current?.undo();
  const redo = () => ref.current?.redo();
  const clear = () => ref.current?.clearSignature();

  return (
    <View style={styles.container}>
      <SignatureCanvas
        ref={ref}
        onEnd={handleEnd}
        onOK={handleSignature}
        onEmpty={handleEmpty}
        onClear={handleClear}
        onError={handleError}
        descriptionText=" "
        webStyle={`
          .m-signature-pad {box-shadow: none; border-color:${Color.gray[200]}; border-radius: 12px;} 
          .m-signature-pad--body {border-color:${Color.gray[200]}; border-radius:12px;}
          .m-signature-pad--footer{
            display: none; margin: 0,
          }
        `}
        clearText={'Clear'}
        penColor={Color.gray[900]}
        backgroundColor={Color.base.white100}
        webviewProps={{
          cacheEnabled: true,
          androidLayerType: 'hardware',
        }}
      />
      <View style={styles.footerConteiner}>
        <View style={styles.actionButtonContainer}>
          <TouchableOpacity onPress={undo}>
            <Icon name="ArrowBackAlt" />
          </TouchableOpacity>
          <TouchableOpacity onPress={redo}>
            <Icon name="ArrowForwardAlt" />
          </TouchableOpacity>
        </View>
        <Button
          variant="outline"
          color="primary"
          title="Clear"
          size="small"
          onPress={clear}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 350,
  },
  footerConteiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  actionButtonContainer: {
    flexDirection: 'row',
    gap: 10,
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

export default Drawing;
