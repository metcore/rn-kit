import Color from '../Color/Color';
import {
  buildCommandScript,
  buildFormatStateScript,
  buildLinkScript,
} from './formatState';

interface EditorDocumentOptions {
  placeholder: string;
  initialValue: string;
  /** Commands answered by queryCommandState. */
  toggleCommands: readonly string[];
  /** Block names compared against queryCommandValue('formatBlock'). */
  blockCommands: readonly string[];
}

/**
 * Builds the HTML document the editor webview loads.
 *
 * It lives apart from the component because it is the single largest thing in
 * this folder and has nothing to do with React: it is a document plus the
 * scripts that run inside it. The behavioural pieces it embeds
 * (rnkitActiveFormats, rnkitRunCommand) come from formatState.ts, where they
 * are executed against a stubbed DOM in tests.
 */
export const buildEditorDocument = ({
  placeholder,
  initialValue,
  toggleCommands,
  blockCommands,
}: EditorDocumentOptions) => `
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

        ${buildFormatStateScript(toggleCommands, blockCommands)}

        ${buildCommandScript()}

          ${buildLinkScript()}

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
            rnkitInsertLink(JSON.parse(command.replace('insertLink:', '')));
            updateFormats();
          } else {
            editor.focus();
            rnkitRunCommand(command);
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
