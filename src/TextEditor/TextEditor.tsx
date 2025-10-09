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
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  type KeyboardEvent,
} from 'react-native';
import { WebView } from 'react-native-webview';
import BottomSheet from '../BottomSheet/BottomSheet';
import Button from '../Button/Button';
import Color from '../Color/Color';
import Icon, { type IconNameProps } from '../Icon';
import Input from '../Input/Input';
import LabelForm from '../LabelForm/LabelForm';
import Typography from '../Typography/Typography';
import type { TextEditorType } from './types';

export interface TextEditorRef {
  getContent: () => void;
  setContent: (html: string) => void;
  clearContent: () => void;
}

interface ExtendedTextEditorType extends TextEditorType {
  initialValue?: string;
  placeholder?: string;
  maxLength?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  inputLabelLinkText?: string;
  inputLinkTextPlacholder?: string;
  inputLabelLinkUrl?: string;
  inputLinkUrlPlacholder?: string;
  saveLinkButtonText?: string;
  cancelLinkButtonText?: string;
}

type TextCommand =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikeThrough'
  | 'link'
  | 'insertUnorderedList'
  | 'insertOrderedList'
  | 'justifyLeft'
  | 'justifyCenter'
  | 'justifyRight';

interface ToolbarButton {
  command: TextCommand;
  icon: IconNameProps;
  label: string;
  isSpecial?: boolean;
}

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
    },
    ref
  ) => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [showToolbar, setShowToolbar] = useState<boolean>(false);
    const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
    const [characterCount, setCharacterCount] = useState(0);
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [linkText, setLinkText] = useState('');
    const [linkUrl, setLinkUrl] = useState('');
    const [isEditingLink, setIsEditingLink] = useState(false);
    const webviewRef = useRef<WebView>(null);
    const inputUrlRef = useRef<TextInput>(null);

    const handleOnChange = (data: string) => {
      // Remove HTML tags untuk hitung karakter
      const textOnly = data.replace(/<[^>]*>/g, '');
      setCharacterCount(textOnly.length);

      if (maxLength && textOnly.length > maxLength) {
        return;
      }

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
        const editor = document.getElementById('editor');
        editor.innerHTML = \`${escapedHtml}\`;
        if (editor.textContent.trim()) {
          editor.classList.remove('placeholder');
        }
        true;
      `);
      },
      clearContent: () => {
        webviewRef.current?.injectJavaScript(`
        const editor = document.getElementById('editor');
        editor.innerHTML = '';
        editor.classList.add('placeholder');
        window.ReactNativeWebView.postMessage('');
        true;
      `);
      },
    }));

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
            height: 100%;
            width: 100%;
            max-width: 100%;
            font-size: 14px;
            line-height: 1.5;
            border-radius: 6px;
            outline: none;
            transition: border 0.2s;
            overflow-wrap: break-word;
            font-weight: 400;
            word-wrap: break-word;
            word-break: break-word;
            color: #333;
          }
          #editor.placeholder:empty:before {
            content: '${placeholder}';
            color: ${Color.gray[400]};
            font-style: italic;
          }
          #editor:focus {
            outline: none;
          }
          /* Style untuk list */
          #editor ul, #editor ol {
            margin: 8px 0;
            padding-left: 24px;
          }
          #editor li {
            margin: 4px 0;
          }
          /* Style untuk heading */
          #editor h1 { font-size: 24px; font-weight: bold; margin: 12px 0; }
          #editor h2 { font-size: 20px; font-weight: bold; margin: 10px 0; }
          #editor h3 { font-size: 16px; font-weight: bold; margin: 8px 0; }
          /* Style untuk link */
          #editor a {
            color: #3b82f6;
            text-decoration: underline;
            cursor: pointer;
          }
          #editor a:hover {
            color: #2563eb;
          }
        </style>
      </head>
      <body>
        <div id="editor" contenteditable="true" class="placeholder">${initialValue}</div>
        <script>
          const editor = document.getElementById("editor");

          // Handle placeholder
          if (editor.textContent.trim()) {
            editor.classList.remove('placeholder');
          }

          editor.addEventListener("input", () => {
            if (editor.textContent.trim()) {
              editor.classList.remove('placeholder');
            } else {
              editor.classList.add('placeholder');
            }
            window.ReactNativeWebView.postMessage(editor.innerHTML);
          });

          editor.addEventListener("focus", () => {
            editor.classList.add("focused");
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'focus' }));
          });

          editor.addEventListener("blur", () => {
            editor.classList.remove("focused");
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'blur' }));
          });

          // Update active formats
          editor.addEventListener("mouseup", updateFormats);
          editor.addEventListener("keyup", updateFormats);
          editor.addEventListener("click", updateFormats);

          function updateFormats() {
            const formats = [];
            if (document.queryCommandState('bold')) formats.push('bold');
            if (document.queryCommandState('italic')) formats.push('italic');
            if (document.queryCommandState('underline')) formats.push('underline');
            if (document.queryCommandState('strikeThrough')) formats.push('strikeThrough');

            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'formats',
              formats: formats
            }));
          }

          function getSelectedLinkInfo() {
            const selection = window.getSelection();
            if (!selection || selection.rangeCount === 0) {
              return { text: '', url: '' };
            }

            const range = selection.getRangeAt(0);
            let linkElement = null;

            // Check if selection contains or is within a link
            if (range.startContainer.nodeType === Node.ELEMENT_NODE) {
              linkElement = range.startContainer.querySelector('a');
            }

            // Check parent nodes for link
            let node = range.startContainer;
            while (node && node !== editor) {
              if (node.nodeName === 'A') {
                linkElement = node;
                break;
              }
              node = node.parentNode;
            }

            // Check if any node in selection is a link
            if (!linkElement && range.commonAncestorContainer) {
              const container = range.commonAncestorContainer;
              if (container.nodeType === Node.ELEMENT_NODE) {
                linkElement = container.querySelector('a');
              }
            }

            if (linkElement) {
              return {
                text: linkElement.textContent || '',
                url: linkElement.href || '',
                isExisting: true
              };
            }

            return {
              text: selection.toString(),
              url: '',
              isExisting: false
            };
          }

          const handleMessage = (command) => {
            if (command === 'getContent') {
              window.ReactNativeWebView.postMessage(editor.innerHTML);
            } else if (command === 'getSelectedText') {
              const linkInfo = getSelectedLinkInfo();
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'selectedText',
                text: linkInfo.text,
                url: linkInfo.url,
                isExisting: linkInfo.isExisting
              }));
            } else if (command.startsWith('insertLink:')) {
              const linkData = command.replace('insertLink:', '');
              const { text, url, isExisting } = JSON.parse(linkData);
              editor.focus();
              const selection = window.getSelection();

              if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);

                // If editing existing link, find and update it
                if (isExisting) {
                  let linkElement = null;
                  let node = range.startContainer;

                  while (node && node !== editor) {
                    if (node.nodeName === 'A') {
                      linkElement = node;
                      break;
                    }
                    node = node.parentNode;
                  }

                  if (!linkElement && range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE) {
                    linkElement = range.commonAncestorContainer.querySelector('a');
                  }

                  if (linkElement) {
                    linkElement.href = url;
                    linkElement.textContent = text;
                    // Move cursor after link
                    range.setStartAfter(linkElement);
                    range.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(range);
                    window.ReactNativeWebView.postMessage(editor.innerHTML);
                    return;
                  }
                }

                // Create new link
                const link = document.createElement('a');
                link.href = url;
                link.textContent = text;
                link.target = '_blank';
                range.deleteContents();
                range.insertNode(link);
                // Add space after link
                const space = document.createTextNode(' ');
                link.parentNode.insertBefore(space, link.nextSibling);
                // Move cursor after space
                range.setStartAfter(space);
                range.collapse(true);
                selection.removeAllRanges();
                selection.addRange(range);
              }
              window.ReactNativeWebView.postMessage(editor.innerHTML);
            } else {
              editor.focus();
              document.execCommand(command, false, null);
              updateFormats();
            }
          };

          // untuk Android
          document.addEventListener("message", (event) => {
            handleMessage(event.data);
          });

          // untuk iOS
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
        document.execCommand('${command}', false, null);
        const formats = [];
        if (document.queryCommandState('bold')) formats.push('bold');
        if (document.queryCommandState('italic')) formats.push('italic');
        if (document.queryCommandState('underline')) formats.push('underline');
        if (document.queryCommandState('strikeThrough')) formats.push('strikeThrough');
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'formats',
          formats: formats
        }));
        true;
      `);
        } else {
          webviewRef.current.postMessage(command);
        }
      }
    };

    const openLinkModal = () => {
      // Get selected text first
      if (webviewRef.current) {
        webviewRef.current.postMessage('getSelectedText');
      }
      setShowLinkModal(true);
      setTimeout(() => {
        inputUrlRef.current?.focus();
      }, 300);
    };

    console.log(showLinkModal);

    const insertLink = () => {
      if (!linkUrl.trim()) {
        Alert.alert('Error', 'URL tidak boleh kosong');
        return;
      }

      let finalUrl = linkUrl.trim();
      // Add https:// if no protocol
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
          const linkData = ${linkData};
          const editor = document.getElementById('editor');
          editor.focus();
          const selection = window.getSelection();

          if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);

            // If editing existing link
            if (linkData.isExisting) {
              let linkElement = null;
              let node = range.startContainer;

              while (node && node !== editor) {
                if (node.nodeName === 'A') {
                  linkElement = node;
                  break;
                }
                node = node.parentNode;
              }

              if (!linkElement && range.commonAncestorContainer.nodeType === 1) {
                linkElement = range.commonAncestorContainer.querySelector('a');
              }

              if (linkElement) {
                linkElement.href = linkData.url;
                linkElement.textContent = linkData.text;
                range.setStartAfter(linkElement);
                range.collapse(true);
                selection.removeAllRanges();
                selection.addRange(range);
                window.ReactNativeWebView.postMessage(editor.innerHTML);
                true;
                return;
              }
            }

            // Create new link
            const link = document.createElement('a');
            link.href = linkData.url;
            link.textContent = linkData.text;
            link.target = '_blank';
            range.deleteContents();
            range.insertNode(link);
            const space = document.createTextNode(' ');
            link.parentNode.insertBefore(space, link.nextSibling);
            range.setStartAfter(space);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
          }
          window.ReactNativeWebView.postMessage(editor.innerHTML);
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
          setActiveFormats(new Set(parsed.formats));
        } else if (parsed.type === 'focus') {
          onFocus?.();
        } else if (parsed.type === 'blur') {
          onBlur?.();
        } else if (parsed.type === 'selectedText') {
          setLinkText(parsed.text);
          // Clean URL (remove protocol prefix for editing)
          const cleanUrl = parsed.url.replace(/^https?:\/\//, '');
          setLinkUrl(cleanUrl);
          setIsEditingLink(parsed.isExisting || false);
        }
      } catch {
        // Jika bukan JSON, berarti itu HTML content
        handleOnChange(data);
      }
    };

    useEffect(() => {
      const showSub = Keyboard.addListener(
        'keyboardDidShow',
        (e: KeyboardEvent) => {
          setKeyboardHeight(e.endCoordinates.height - 35);
          setShowToolbar(true);
        }
      );
      const hideSub = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardHeight(0);
        setShowToolbar(false);
      });

      return () => {
        showSub.remove();
        hideSub.remove();
      };
    }, []);

    const gap = Platform.OS === 'ios' ? 200 : 185;

    const isFormatActive = (format: string) => activeFormats.has(format);

    const toolbarButtons: ToolbarButton[] = [
      { command: 'bold', icon: 'Bold', label: 'Bold' },
      { command: 'italic', icon: 'Italic', label: 'Italic' },
      { command: 'underline', icon: 'UnderLine', label: 'Underline' },
      { command: 'strikeThrough', icon: 'strike-through', label: 'Strike' },
      { command: 'link', icon: 'Link', label: 'Link', isSpecial: true },
      {
        command: 'insertUnorderedList',
        icon: 'list-un-ordered',
        label: 'Bullet',
      },
      { command: 'insertOrderedList', icon: 'list-ordered', label: 'Number' },
      { command: 'justifyLeft', icon: 'align-left', label: 'Left' },
      { command: 'justifyCenter', icon: 'align-center', label: 'Center' },
      { command: 'justifyRight', icon: 'align-right', label: 'Right' },
    ];

    return (
      <View style={styles.container}>
        {label ? <LabelForm title={label} /> : null}
        <KeyboardAvoidingView
          style={[styles.editorWrapper, { minHeight: height, height: height }]}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <WebView
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

        {showToolbar ? (
          <SafeAreaView
            style={[
              styles.toolbar,
              { top: Dimensions.get('screen').height - keyboardHeight - gap },
            ]}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.toolbarContent}
            >
              {toolbarButtons.map((button) => (
                <TouchableOpacity
                  key={button.command}
                  onPress={() =>
                    button.isSpecial
                      ? openLinkModal()
                      : formatText(button.command)
                  }
                  style={[
                    styles.toolButton,
                    isFormatActive(button.command) && styles.toolButtonActive,
                  ]}
                >
                  <Icon
                    name={button.icon}
                    size={20}
                    color={
                      isFormatActive(button.command) ? '#fff' : Color.gray[900]
                    }
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </SafeAreaView>
        ) : null}

        {/* Link Modal */}
        <BottomSheet
          isOpen={showLinkModal}
          onClose={() => setShowLinkModal(false)}
        >
          <View style={styles.modalBody}>
            <Input
              label={inputLabelLinkText}
              value={linkText}
              onChangeText={setLinkText}
              placeholder={inputLinkTextPlacholder}
              autoCapitalize="none"
            />
            <Input
              ref={inputUrlRef}
              keyboardType="url"
              label={inputLabelLinkUrl}
              value={linkUrl}
              onChangeText={setLinkUrl}
              placeholder={inputLinkUrlPlacholder}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.modalActions}>
            <View style={styles.flex1}>
              <Button
                title={cancelLinkButtonText}
                color="primary"
                onPress={closeLinkModal}
                variant="outline"
              />
            </View>
            <View style={styles.flex1}>
              <Button
                title={saveLinkButtonText}
                color="primary"
                onPress={insertLink}
              />
            </View>
          </View>
        </BottomSheet>
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
    left: -24,
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
});
