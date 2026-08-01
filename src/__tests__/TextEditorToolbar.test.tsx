import { act, fireEvent, render } from '@testing-library/react-native';
import { Keyboard } from 'react-native';
import { WebView } from 'react-native-webview';

const { __spies } = require('react-native-webview');
import Provider from '../Provider/Provider';
import TextEditor from '../TextEditor/TextEditor';

// What can and cannot be proven here: the editor's formatting state is decided
// by document.queryCommandState inside the webview, and there is no webview
// under jest. So these tests assert the two halves that ARE observable from
// React Native -- the document TextEditor hands the webview, and the script it
// injects when a toolbar button is pressed. Whether queryCommandState reports
// accurately on a real device is out of reach here.

const commands = [
  'bold',
  'italic',
  'underline',
  'strikeThrough',
  'insertUnorderedList',
  'insertOrderedList',
  'justifyLeft',
  'justifyCenter',
  'justifyRight',
];

const htmlOf = (tree: ReturnType<typeof render>) =>
  tree.UNSAFE_getByType(WebView).props.source.html as string;

/**
 * Puts an editor in the only state that shows a toolbar: focused, with the
 * keyboard up.
 *
 * Keyboard has no emit() under the RN preset, so the listener TextEditor
 * registers is captured and called directly. Focus arrives as a webview
 * message -- the caret lives in the document, not in any native node.
 */
const mountFocusedWithKeyboard = (props?: { showToolbar?: boolean }) => {
  const listeners: Record<string, (e: unknown) => void> = {};
  jest
    .spyOn(Keyboard, 'addListener')
    .mockImplementation((event: string, cb: (e: never) => void) => {
      listeners[event] = cb as (e: unknown) => void;
      return { remove: jest.fn() } as never;
    });

  const tree = render(
    <Provider>
      <TextEditor testID="editor" {...props} />
    </Provider>
  );

  act(() => {
    fireEvent(tree.UNSAFE_getByType(WebView), 'message', {
      nativeEvent: { data: JSON.stringify({ type: 'focus' }) },
    });
    jest.advanceTimersByTime(20);
  });

  act(() => {
    listeners.keyboardDidShow?.({ endCoordinates: { height: 300 } });
  });

  return tree;
};

describe('TextEditor active-state wiring', () => {
  beforeEach(() => {
    __spies.injectJavaScript.mockClear();
    __spies.postMessage.mockClear();
  });

  it.each(commands)('asks the editor whether %s is active', (command) => {
    const html = htmlOf(render(<TextEditor testID="editor" />));

    // The command list is interpolated into the script as JSON, so a quoted
    // name proves this button is among the ones actually queried.
    expect(html).toContain(`"${command}"`);
  });

  it('refreshes on selectionchange, not only on click and keyup', () => {
    const html = htmlOf(render(<TextEditor testID="editor" />));

    expect(html).toContain("addEventListener('selectionchange'");
  });

  it('re-reads the state after applying a command on iOS', () => {
    const { getByTestId } = mountFocusedWithKeyboard();

    fireEvent.press(getByTestId('editor-bold'));

    // iOS goes through injectJavaScript rather than postMessage, and that path
    // used to run execCommand without asking for the state again -- so the
    // button stayed unlit until the editor was touched a second time.
    const script = __spies.injectJavaScript.mock.calls.at(-1)?.[0] ?? '';
    expect(script).toContain('rnkitRunCommand("bold")');
    expect(script).toContain('updateFormats()');
  });
});

describe('TextEditor showToolbar prop', () => {
  it('shows the toolbar with the keyboard by default', () => {
    expect(mountFocusedWithKeyboard().getByTestId('editor-bold')).toBeTruthy();
  });

  it('shows the toolbar with the keyboard when true', () => {
    expect(
      mountFocusedWithKeyboard({ showToolbar: true }).getByTestId('editor-bold')
    ).toBeTruthy();
  });

  it('keeps the toolbar away even when focused with the keyboard up', () => {
    expect(
      mountFocusedWithKeyboard({ showToolbar: false }).queryByTestId(
        'editor-bold'
      )
    ).toBeNull();
  });
});

describe('TextEditor toolbar ownership', () => {
  const mount = (props?: { showToolbar?: boolean; testID?: string }) => {
    const listeners: Record<string, (e: unknown) => void> = {};
    jest
      .spyOn(Keyboard, 'addListener')
      .mockImplementation((event: string, cb: (e: never) => void) => {
        listeners[event] = cb as (e: unknown) => void;
        return { remove: jest.fn() } as never;
      });

    const tree = render(
      <Provider>
        <TextEditor testID="editor" {...props} />
      </Provider>
    );

    const openKeyboard = () =>
      act(() => {
        listeners.keyboardDidShow?.({ endCoordinates: { height: 300 } });
      });

    // The editor lives in a webview and reports its own focus by message;
    // there is no native node to fireEvent 'focus' on.
    const sendFromEditor = (payload: object) =>
      act(() => {
        fireEvent(tree.UNSAFE_getByType(WebView), 'message', {
          nativeEvent: { data: JSON.stringify(payload) },
        });
        jest.advanceTimersByTime(20);
      });

    return { ...tree, openKeyboard, sendFromEditor };
  };

  // Toolbar renders into a single global Footer slot, so an editor that paints
  // one while unfocused puts it on screen over whatever the user is actually
  // typing in -- including another editor that asked for no toolbar at all.
  it('stays away when the keyboard opens for something else', () => {
    const { openKeyboard, queryByTestId } = mount();

    openKeyboard();

    expect(queryByTestId('editor-bold')).toBeNull();
  });

  it('appears once this editor reports focus', () => {
    const { openKeyboard, sendFromEditor, getByTestId } = mount();

    sendFromEditor({ type: 'focus' });
    openKeyboard();

    expect(getByTestId('editor-bold')).toBeTruthy();
  });

  it('goes away again when this editor reports blur', () => {
    const { openKeyboard, sendFromEditor, getByTestId, queryByTestId } =
      mount();

    sendFromEditor({ type: 'focus' });
    openKeyboard();
    expect(getByTestId('editor-bold')).toBeTruthy();

    sendFromEditor({ type: 'blur' });

    expect(queryByTestId('editor-bold')).toBeNull();
  });
});

describe('TextEditor added formats', () => {
  const openToolbar = () => {
    const tree = mountFocusedWithKeyboard();
    __spies.injectJavaScript.mockClear();
    return tree;
  };

  const lastScript = () =>
    (__spies.injectJavaScript.mock.calls.at(-1)?.[0] as string) ?? '';

  // What a command *does* is formatState's job and is executed for real in
  // formatState.test.ts. All TextEditor owes is dispatching the right name.
  it.each(['h1', 'h2', 'h3'])('dispatches %s to the editor', (heading) => {
    const { getByTestId } = openToolbar();

    fireEvent.press(getByTestId(`editor-${heading}`));

    expect(lastScript()).toContain(`rnkitRunCommand("${heading}")`);
  });

  it.each(['undo', 'redo', 'removeFormat'])(
    'dispatches %s to the editor',
    (command) => {
      const { getByTestId } = openToolbar();

      fireEvent.press(getByTestId(`editor-${command}`));

      expect(lastScript()).toContain(`rnkitRunCommand("${command}")`);
    }
  );

  it('labels the heading buttons with text, having no icon for them', () => {
    const { getByText } = openToolbar();

    expect(getByText('H1')).toBeTruthy();
    expect(getByText('H2')).toBeTruthy();
    expect(getByText('H3')).toBeTruthy();
  });

  it('asks the editor about the headings as blocks, not as toggles', () => {
    const html = htmlOf(render(<TextEditor testID="editor" />));

    expect(html).toContain("queryCommandValue('formatBlock')");
    expect(html).toContain('"h1"');
  });

  it('ships one command runner that both platforms call', () => {
    const html = htmlOf(render(<TextEditor testID="editor" />));

    expect(html).toContain('function rnkitRunCommand(');
  });

  it('never asks whether undo or redo is "active"', () => {
    const html = htmlOf(render(<TextEditor testID="editor" />));
    const toggles = html.slice(0, html.indexOf('queryCommandValue'));

    expect(toggles).not.toContain('"undo"');
    expect(toggles).not.toContain('"redo"');
    expect(toggles).not.toContain('"removeFormat"');
  });
});
