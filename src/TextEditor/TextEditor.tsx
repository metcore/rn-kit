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
import { getTestID } from '../helpers/getTestID';
import Typography from '../Typography/Typography';
import Footer from '../Ui/Footer';
import { buildFormatStateScript } from './formatState';
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
  /**
   * Gates the floating toolbar. When true (default) it appears with the
   * keyboard, as before. When false it stays away even while the keyboard is
   * open -- it does not force the toolbar open on its own.
   */
  showToolbar?: boolean;
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
  | 'justifyRight'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'undo'
  | 'redo'
  | 'removeFormat';

interface ToolbarButton {
  command: TextCommand;
  /** Rendered as an icon, or as `text` when no icon fits (the headings). */
  icon?: IconNameProps;
  text?: string;
  label: string;
  /**
   * toggle  - on/off, answered by queryCommandState
   * block   - a block name compared against queryCommandValue('formatBlock')
   * action  - fires and forgets; never lights up
   * special - opens the link sheet instead of running a command
   */
  kind?: 'toggle' | 'block' | 'action' | 'special';
  isSpecial?: boolean;
}

// Single source of truth: the toolbar renders from this list, and the webview
// is asked about exactly these commands. Adding a button therefore cannot
// leave it without an active state -- the two used to be maintained apart, and
// five buttons were never queried at all.
const TOOLBAR_BUTTONS: ToolbarButton[] = [
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
  { command: 'h1', text: 'H1', label: 'Heading 1', kind: 'block' },
  { command: 'h2', text: 'H2', label: 'Heading 2', kind: 'block' },
  { command: 'h3', text: 'H3', label: 'Heading 3', kind: 'block' },
  {
    command: 'removeFormat',
    icon: 'ban-outline',
    label: 'Clear format',
    kind: 'action',
  },
  { command: 'undo', icon: 'ArrowBackAlt', label: 'Undo', kind: 'action' },
  { command: 'redo', icon: 'ArrowForwardAlt', label: 'Redo', kind: 'action' },
];

const TOGGLE_COMMANDS = TOOLBAR_BUTTONS.filter(
  (button) => !button.isSpecial && (button.kind ?? 'toggle') === 'toggle'
).map((button) => button.command);

const BLOCK_COMMANDS = TOOLBAR_BUTTONS.filter(
  (button) => button.kind === 'block'
).map((button) => button.command);

// Headings go through formatBlock rather than a command of their own.
const commandScript = (command: string) =>
  /^h[1-3]$/.test(command)
    ? `document.execCommand('formatBlock', false, '<${command}>')`
    : `document.execCommand('${command}', false, '')`;

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
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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

          // Kirim initial character count saat load
          setTimeout(() => {
            const charCount = editor.textContent.trim().length;
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'initialCount',
              characterCount: charCount
            }));
          }, 100);

          editor.addEventListener("input", () => {
            if (editor.textContent.trim()) {
              editor.classList.remove('placeholder');
            } else {
              editor.classList.add('placeholder');
            }

            // Kirim HTML dan character count
            const charCount = editor.textContent.trim().length;
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'content',
              html: editor.innerHTML,
              characterCount: charCount
            }));
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

          // Caret moves that are not a click or keyup -- arrow keys held down,
          // programmatic selection, autocorrect -- only surface here.
          document.addEventListener('selectionchange', function () {
            if (document.activeElement === editor) updateFormats();
          });

          ${buildFormatStateScript(TOGGLE_COMMANDS, BLOCK_COMMANDS)}

          function updateFormats() {
            var formats = rnkitActiveFormats();

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

                    // Update content dan character count
                    const charCount = editor.textContent.trim().length;
                    window.ReactNativeWebView.postMessage(JSON.stringify({
                      type: 'content',
                      html: editor.innerHTML,
                      characterCount: charCount
                    }));
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

              // Update content dan character count
              const charCount = editor.textContent.trim().length;
              updateFormats();
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'content',
                html: editor.innerHTML,
                characterCount: charCount
              }));
            } else {
              editor.focus();
              if (/^h[1-3]$/.test(command)) {
                document.execCommand('formatBlock', false, '<' + command + '>');
              } else {
                document.execCommand(command, false, null);
              }
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
          // updateFormats() matters as much as the command itself: without it
          // iOS applied the format but left the button unlit until the editor
          // was touched again. Android gets this for free via handleMessage.
          webviewRef.current.injectJavaScript(`
            ${commandScript(command)};
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
        (function () {

        const linkData = ${linkData};
        const editor = document.getElementById('editor');
        editor.focus();
        const selection = window.getSelection();

        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);

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

              const charCount = editor.textContent.trim().length;
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'content',
                html: editor.innerHTML,
                characterCount: charCount
              }));
              return;
            }
          }

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

        const charCount = editor.textContent.trim().length;
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'content',
          html: editor.innerHTML,
          characterCount: charCount
        }));
        })();
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
            onFocus?.();
          });
        } else if (parsed.type === 'blur') {
          requestAnimationFrame(() => {
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

    const isFormatActive = (format: string) => activeFormats.has(format);

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

        {showToolbar && keyboardVisible && (
          <Footer
            style={[
              styles.toolbar,
              {
                bottom:
                  Platform.OS === 'android' && Platform.Version < 35
                    ? keyboardHeight - keyboardHeight
                    : keyboardHeight,
              },
            ]}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.toolbarContent}
            >
              {TOOLBAR_BUTTONS.map((button) => (
                <TouchableOpacity
                  key={button.command}
                  testID={getTestID(testID, button.command)}
                  accessibilityLabel={button.label}
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
                  {button.icon ? (
                    <Icon
                      name={button.icon}
                      size={20}
                      color={
                        isFormatActive(button.command)
                          ? '#fff'
                          : Color.gray[900]
                      }
                    />
                  ) : (
                    <Typography
                      variant="t2"
                      weight="semibold"
                      color={
                        isFormatActive(button.command)
                          ? '#fff'
                          : Color.gray[900]
                      }
                    >
                      {button.text}
                    </Typography>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Footer>
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
