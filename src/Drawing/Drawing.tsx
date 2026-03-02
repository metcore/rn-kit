import { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import SignatureCanvas, {
  type SignatureViewRef,
} from 'react-native-signature-canvas';
import Button from '../Button/Button';
import Color from '../Color/Color';
import Icon from '../Icon';

interface DrawingProps {
  onChange?: (value?: string | undefined | null) => void;
  onStart?: () => void;
  onEnd?: () => void;
  dataURL?: string;
}

const Drawing = ({ onChange, onEnd, onStart, dataURL }: DrawingProps) => {
  const ref = useRef<SignatureViewRef | null>(null);

  const [internalDataURL, setInternalDataURL] = useState<any>(null);
  const [stepCount, setStepCount] = useState(0);
  const [undoCount, setUndoCount] = useState(0);

  const canUndo = stepCount - undoCount > 0;
  const canRedo = undoCount > 0;

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
    setStepCount((prev) => prev + 1);
    setUndoCount(0);
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
    if (!canUndo) return;
    ref.current?.undo();
    setUndoCount((prev) => prev + 1);
    refreshSignature();
  };

  const redo = () => {
    if (!canRedo) return;
    ref.current?.redo();
    setUndoCount((prev) => prev - 1);
    refreshSignature();
  };

  const clear = () => {
    ref.current?.clearSignature();
    if (onChange) {
      onChange(null);
      setInternalDataURL('');
    }
    setStepCount(0);
    setUndoCount(0);
  };

  useEffect(() => {
    onChange?.(dataURL);
    setInternalDataURL(dataURL);

    setStepCount(dataURL ? 1 : 0);
    setUndoCount(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataURL]);

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
          .m-signature-pad {box-shadow: none; border-color:${Color.gray[200]}; border-radius: 12px; overflow: auto;} 
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
        dataURL={internalDataURL}
      />
      <View style={styles.footerConteiner}>
        <View style={styles.actionButtonContainer}>
          <TouchableOpacity
            onPress={undo}
            disabled={!canUndo}
            style={!canUndo && styles.disabledButton}
          >
            <Icon name="ArrowBackAlt" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={redo}
            disabled={!canRedo}
            style={!canRedo && styles.disabledButton}
          >
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
  disabledButton: {
    opacity: 0.3,
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
