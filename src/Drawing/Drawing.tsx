import { useRef } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import SignatureCanvas, {
  type SignatureViewRef,
} from 'react-native-signature-canvas';
import Icon from '../Icon';
import Button from '../Button/Button';
import Color from '../Color/Color';

interface DrawingProps {
  onChange?: (value?: string | undefined | null) => void;
  onStart?: () => void;
  onEnd?: () => void;
}

const Drawing = ({ onChange, onEnd, onStart }: DrawingProps) => {
  const ref = useRef<SignatureViewRef | null>(null);

  const handleSignature = (signature: string) => {
    if (signature && onChange) {
      onChange(signature);
    }
  };

  const refreshSignature = () =>
    requestAnimationFrame(() => ref.current?.readSignature());

  const handleEmpty = () => {
    if (onChange) {
      onChange(null);
    }
  };

  const handleError = (error: Error) => {
    console.error('Signature pad error:', error);
  };

  const handleEnd = () => {
    refreshSignature();
    if (onEnd) {
      onEnd();
    }
  };

  const handleBegin = () => {
    if (onStart) {
      onStart();
    }
  };

  const undo = () => {
    ref.current?.undo();
    refreshSignature();
  };

  const redo = () => {
    ref.current?.redo();
    refreshSignature();
  };

  const clear = () => {
    ref.current?.clearSignature();
    if (onChange) {
      onChange(null);
    }
  };

  return (
    <View style={styles.container}>
      <SignatureCanvas
        ref={ref}
        onEnd={handleEnd}
        onBegin={handleBegin}
        onOK={handleSignature}
        onEmpty={handleEmpty}
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
