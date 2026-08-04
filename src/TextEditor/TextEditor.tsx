import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
  type KeyboardEvent,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Color from '../Color/Color';
import LabelForm from '../LabelForm/LabelForm';
import Typography from '../Typography/Typography';
import { buildEditorDocument } from './editorDocument';
import LinkSheet from './LinkSheet';
import Toolbar from './Toolbar';
import {
  BLOCK_COMMANDS,
  TOGGLE_COMMANDS,
  TOOLBAR_BUTTONS,
} from './toolbarButtons';
import type {
  ExtendedTextEditorType,
  TextCommand,
  TextEditorRef,
} from './types';

export type { TextEditorRef };

const TextEditor = forwardRef<TextEditorRef, ExtendedTextEditorType>(
  (
    {
      label,
      hasError,
      hint,
      onChange,
      height = 300,
      initialValue = '',
      placeholder = 'Tulis sesuatu di sini...',
      maxLength,
      onFocus,
      onBlur,
      inputLinkTextPlacholder = 'Link URL',
      inputLinkUrlPlacholder = 'https://www.example.com',
      inputLabelLinkText = 'Teks Link',
      inputLabelLinkUrl = 'Link URL',
      saveLinkButtonText = 'Simpan',
      cancelLinkButtonText = 'Batal',
      showToolbar = true,
      testID,
    },
    ref
  ) => {
    const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
    // Whether the caret is in THIS editor. The keyboard is global, so without
    // this every mounted editor would paint a toolbar the moment any field
    // anywhere opened it -- see the toolbar gate at the bottom of the render.
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
    const [characterCount, setCharacterCount] = useState(0);
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [linkText, setLinkText] = useState('');
    const [linkUrl, setLinkUrl] = useState('');
    const [isEditingLink, setIsEditingLink] = useState(false);
    // WebView is declared as `class WebView<P = undefined>` whose props are
    // `WebViewProps & P`; the default `P = undefined` collapses props to `never`
    // under React 19 types, so pin `P` to `object` to recover `WebViewProps`.
    const webviewRef = useRef<WebView<object>>(null);
    const inputUrlRef = useRef<TextInput>(null);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const handleOnChange = (data: string) => {
      const textOnly = data.replace(/<[^>]*>/g, '').trim();
      setCharacterCount(textOnly.length);

      onChange?.(data);
    };

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      getContent: () => {
        webviewRef.current?.postMessage('getContent');
      },
      setContent: (html: string) => {
        const escapedHtml = html.replace(/`/g, '\\`').replace(/\$/g, '\\$');
        webviewRef.current?.injectJavaScript(`
        (function () {
          const target = document.getElementById('editor');
          target.innerHTML = \`${escapedHtml}\`;
          if (target.textContent.trim()) {
            target.classList.remove('placeholder');
          }
        })();
        true;
      `);
      },
      clearContent: () => {
        webviewRef.current?.injectJavaScript(`
        (function () {
          const target = document.getElementById('editor');
          target.innerHTML = '';
          target.classList.add('placeholder');
          window.ReactNativeWebView.postMessage('');
        })();
        true;
      `);
      },
    }));

    const htmlEditor = buildEditorDocument({
      placeholder,
      initialValue,
      toggleCommands: TOGGLE_COMMANDS,
      blockCommands: BLOCK_COMMANDS,
    });

    const formatText = (command: string) => {
      if (webviewRef.current) {
        if (Platform.OS === 'ios') {
          // updateFormats() matters as much as the command itself: without it
          // iOS applied the format but left the button unlit until the editor
          // was touched again. Android gets this for free via handleMessage.
          webviewRef.current.injectJavaScript(`
            rnkitRunCommand(${JSON.stringify(command)});
            updateFormats();
            true; //di ios harus biar berfunsi boldnya
          `);
        } else {
          webviewRef.current.postMessage(command);
        }
      }
    };

    const openLinkModal = () => {
      setShowLinkModal(true);
      if (webviewRef.current) {
        webviewRef.current.postMessage('getSelectedText');
      }

      setTimeout(() => {
        inputUrlRef.current?.focus();
      }, 350);
    };

    const insertLink = () => {
      if (!linkUrl.trim()) {
        Alert.alert('Error', 'URL tidak boleh kosong');
        return;
      }

      let finalUrl = linkUrl.trim();
      if (!finalUrl.match(/^https?:\/\//i)) {
        finalUrl = 'https://' + finalUrl;
      }

      const linkData = JSON.stringify({
        text: linkText.trim() || finalUrl,
        url: finalUrl,
        isExisting: isEditingLink,
      });

      if (webviewRef.current) {
        if (Platform.OS === 'ios') {
          webviewRef.current.injectJavaScript(`
            rnkitInsertLink(${linkData});
            updateFormats();
            true;
          `);
        } else {
          webviewRef.current.postMessage('insertLink:' + linkData);
        }
      }

      setShowLinkModal(false);
      setLinkText('');
      setLinkUrl('');
      setIsEditingLink(false);
    };

    const closeLinkModal = () => {
      setShowLinkModal(false);

      setLinkText('');
      setLinkUrl('');
      setIsEditingLink(false);
    };

    const handleWebViewMessage = (event: any) => {
      const data = event.nativeEvent.data;

      try {
        const parsed = JSON.parse(data);

        if (parsed.type === 'formats') {
          requestAnimationFrame(() => {
            setActiveFormats(new Set(parsed.formats));
          });
        } else if (parsed.type === 'focus') {
          requestAnimationFrame(() => {
            setIsFocused(true);
            onFocus?.();
          });
        } else if (parsed.type === 'blur') {
          requestAnimationFrame(() => {
            setIsFocused(false);
            onBlur?.();
          });
        } else if (parsed.type === 'selectedText') {
          requestAnimationFrame(() => {
            setLinkText(parsed.text);
            const cleanUrl = parsed.url.replace(/^https?:\/\//, '');
            setLinkUrl(cleanUrl);
            setIsEditingLink(parsed.isExisting || false);
          });
        } else if (parsed.type === 'initialCount') {
          // Set initial character count saat pertama load
          setCharacterCount(parsed.characterCount);
        } else if (parsed.type === 'content') {
          // Update character count dari WebView
          setCharacterCount(parsed.characterCount);
          onChange?.(parsed.html);
        }
      } catch {
        // Fallback ke cara lama jika bukan JSON (untuk backward compatibility)
        handleOnChange(data);
      }
    };

    useEffect(() => {
      const showSub = Keyboard.addListener(
        'keyboardDidShow',
        (e: KeyboardEvent) => {
          setKeyboardVisible(true);
          setKeyboardHeight(e.endCoordinates.height);
        }
      );
      const hideSub = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardVisible(false);
        setKeyboardHeight(0);
      });

      return () => {
        showSub.remove();
        hideSub.remove();
      };
    }, []);

    const isFormatActive = (command: TextCommand) => activeFormats.has(command);

    const handleToolbarPress = (command: TextCommand) => {
      const button = TOOLBAR_BUTTONS.find((item) => item.command === command);
      if (button?.isSpecial) {
        openLinkModal();
        return;
      }
      formatText(command);
    };

    return (
      <View testID={testID} style={styles.container}>
        {label ? <LabelForm title={label} /> : null}
        <KeyboardAvoidingView
          style={[styles.editorWrapper, { minHeight: height, height: height }]}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <WebView<object>
            ref={webviewRef}
            originWhitelist={['*']}
            source={{ html: htmlEditor }}
            onMessage={handleWebViewMessage}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            mixedContentMode="always"
            allowUniversalAccessFromFileURLs={true}
            allowFileAccess={true}
            scrollEnabled={true}
          />
        </KeyboardAvoidingView>

        {hint || maxLength ? (
          <View style={styles.hintContainer}>
            {hint ? (
              <Typography
                color={hasError ? Color.danger[500] : Color.gray[700]}
                variant="t3"
                weight="medium"
              >
                {hint}
              </Typography>
            ) : null}
            {maxLength && (
              <Typography
                color={
                  characterCount > maxLength
                    ? Color.danger[500]
                    : Color.gray[600]
                }
                variant="t3"
                weight="medium"
              >
                {characterCount}/{maxLength}
              </Typography>
            )}
          </View>
        ) : null}

        {/* Link Modal */}
        <LinkSheet
          ref={inputUrlRef}
          isOpen={showLinkModal}
          text={linkText}
          url={linkUrl}
          onChangeText={setLinkText}
          onChangeUrl={setLinkUrl}
          onCancel={closeLinkModal}
          onSave={insertLink}
          onClose={() => setShowLinkModal(false)}
          labelText={inputLabelLinkText}
          labelUrl={inputLabelLinkUrl}
          placeholderText={inputLinkTextPlacholder}
          placeholderUrl={inputLinkUrlPlacholder}
          saveText={saveLinkButtonText}
          cancelText={cancelLinkButtonText}
        />

        {showToolbar && keyboardVisible && isFocused && (
          <Toolbar
            keyboardHeight={keyboardHeight}
            isActive={isFormatActive}
            onPress={handleToolbarPress}
            testID={testID}
          />
        )}
      </View>
    );
  }
);

TextEditor.displayName = 'TextEditor';

export default TextEditor;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    gap: 4,
    position: 'relative',
  },
  editorWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: Color.gray[200],
    borderRadius: 8,
    overflow: 'hidden',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  hintContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  toolbar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: Color.gray[200],
    backgroundColor: '#fff',
    paddingVertical: 8,
    position: 'absolute',
    width: Dimensions.get('screen').width,
    alignItems: 'center',
  },
  toolbarContent: {
    paddingHorizontal: 8,
    gap: 4,
  },
  toolButton: {
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 6,
    minWidth: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolButtonActive: {
    backgroundColor: Color.primary?.[1000],
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  modalBody: {
    gap: 16,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  flex1: {
    flex: 1,
  },
  mt10p: {
    marginTop: '10%',
  },
});
