import { Container, TextEditor } from '@herca/rn-kit';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, Keyboard, type KeyboardEvent } from 'react-native';

export default function TextEditorScreen() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const editorRef = useRef(null);

  useEffect(() => {
    const handleKeyboardShow = (e: KeyboardEvent) => {
      setKeyboardHeight(e.endCoordinates.height);
    };

    const handleKeyboardHide = () => {
      setKeyboardHeight(0);
    };

    const showSub = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
    const hideSub = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const screenHeight = Dimensions.get('window').height - 100;
  const editorHeight = screenHeight - keyboardHeight - 100;

  return (
    <Container>
      <TextEditor
        ref={editorRef}
        label="Deskripsi"
        height={editorHeight}
        maxLength={4000}
      />
    </Container>
  );
}
