import { useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  type KeyboardEvent,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Color from '../Color/Color';
import type { TextEditorType } from './types';
import LabelForm from '../LabelForm/LabelForm';
import Typography from '../Typography/Typography';
import Icon from '../Icon';

export default function TextEditor({
  label,
  hasError,
  hint,
  onChange,
  height = 300,
}: TextEditorType) {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const webviewRef = useRef<WebView>(null);
  const handleOnChange = (data: string) => {
    onChange?.(data);
  };

  const htmlEditor = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <style>
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }
          html, body {
            margin: 0;
            padding: 0;
            width: 99.9%;
            height: 100%;
            overflow-x: hidden;
          }
          #editor {
            min-height: ${height};
            width: 100%;
            max-width: 100%;
            padding: 12px;
            font-size: 12px;
            border: 1px solid ${Color.gray[200]};
            border-radius: 6px;
            outline: none;
            transition: border 0.2s;
            overflow-wrap: break-word;
            font-weight: 500;
            word-wrap: break-word;
            word-break: break-word;
          }
          #editor.focused {
            border-color: ${Color.gray[200]}
          }
        </style>
      </head>
      <body>
        <div id="editor" contenteditable="true">Tulis sesuatu di sini...</div>
        <script>
          const editor = document.getElementById("editor");
          
          editor.addEventListener("focus", () => {
            editor.classList.add("focused");
          });

          editor.addEventListener("blur", () => {
            editor.classList.remove("focused");
          });
          const handleMessage = (command) => {
            if (command === 'getContent') {
              window.ReactNativeWebView.postMessage(editor.innerHTML);
            } else {
              editor.focus();
              document.execCommand(command, false, '');
            }
          };

          // ini untuk Android
          document.addEventListener("message", (event) => {
            handleMessage(event.data);
          });

          // ini untuk iOS
          window.addEventListener("message", (event) => {
            handleMessage(event.data);
          });
        </script>
      </body>
    </html>
  `;

  const formatText = (command: string) => {
    if (webviewRef.current) {
      if (Platform.OS === 'ios') {
        webviewRef.current.injectJavaScript(`
          document.execCommand('${command}', false, '');
          true; //di ios harus biar berfunsi boldnya
        `);
      } else {
        webviewRef.current.postMessage(command);
      }
    }
  };

  useEffect(() => {
    const showSub = Keyboard.addListener(
      'keyboardDidShow',
      (e: KeyboardEvent) => {
        if (Platform.OS === 'ios')
          setKeyboardHeight(e.endCoordinates.height - 35);
      }
    );
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      if (Platform.OS === 'ios') setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      {label ? <LabelForm title={label} /> : null}
      <KeyboardAvoidingView
        style={styles.editorWrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <WebView
          ref={webviewRef}
          originWhitelist={['*']}
          source={{ html: htmlEditor }}
          onMessage={(event) => {
            handleOnChange(event.nativeEvent.data);
          }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          mixedContentMode="always"
          allowUniversalAccessFromFileURLs={true}
          allowFileAccess={true}
        />
      </KeyboardAvoidingView>

      {hint ? (
        <Typography
          color={hasError ? Color.danger[500] : Color.gray[700]}
          variant="t3"
          weight="medium"
        >
          {hint}
        </Typography>
      ) : null}

      <View style={[styles.toolbar, { bottom: keyboardHeight }]}>
        <TouchableOpacity
          onPress={() => formatText('bold')}
          style={styles.toolButton}
        >
          <Icon name="Bold" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => formatText('italic')}
          style={styles.toolButton}
        >
          <Icon name="Italic" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => formatText('underline')}
          style={styles.toolButton}
        >
          <Icon name="UnderLine" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    gap: 4,
  },
  editorWrapper: { flex: 1 },
  toolbar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: Color.gray[200],
    paddingVertical: 8,
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    alignItems: 'center',
  },
  toolButton: {
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 6,
  },
  toolText: {
    fontWeight: 'bold',
  },
  webview: { flex: 1 },
});
