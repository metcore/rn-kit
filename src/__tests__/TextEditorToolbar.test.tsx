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
    // Keyboard has no emit() under the RN preset, so capture the listener
    // TextEditor registers and call it directly -- the toolbar only mounts on
    // keyboardDidShow.
    const listeners: Record<string, (e: unknown) => void> = {};
    jest
      .spyOn(Keyboard, 'addListener')
      .mockImplementation((event: string, cb: (e: never) => void) => {
        listeners[event] = cb as (e: unknown) => void;
        return { remove: jest.fn() } as never;
      });

    const { getByTestId } = render(
      <Provider>
        <TextEditor testID="editor" />
      </Provider>
    );

    act(() => {
      listeners.keyboardDidShow?.({ endCoordinates: { height: 300 } });
    });

    fireEvent.press(getByTestId('editor-bold'));

    // iOS goes through injectJavaScript rather than postMessage, and that path
    // used to run execCommand without asking for the state again -- so the
    // button stayed unlit until the editor was touched a second time.
    const script = __spies.injectJavaScript.mock.calls.at(-1)?.[0] ?? '';
    expect(script).toContain("execCommand('bold'");
    expect(script).toContain('updateFormats()');
  });
});

describe('TextEditor showToolbar prop', () => {
  const mountWithKeyboard = (showToolbar?: boolean) => {
    const listeners: Record<string, (e: unknown) => void> = {};
    jest
      .spyOn(Keyboard, 'addListener')
      .mockImplementation((event: string, cb: (e: never) => void) => {
        listeners[event] = cb as (e: unknown) => void;
        return { remove: jest.fn() } as never;
      });

    const tree = render(
      <Provider>
        <TextEditor testID="editor" showToolbar={showToolbar} />
      </Provider>
    );

    act(() => {
      listeners.keyboardDidShow?.({ endCoordinates: { height: 300 } });
    });

    return tree;
  };

  it('shows the toolbar with the keyboard by default', () => {
    expect(mountWithKeyboard().getByTestId('editor-bold')).toBeTruthy();
  });

  it('shows the toolbar with the keyboard when true', () => {
    expect(mountWithKeyboard(true).getByTestId('editor-bold')).toBeTruthy();
  });

  it('keeps the toolbar away even when the keyboard opens when false', () => {
    expect(mountWithKeyboard(false).queryByTestId('editor-bold')).toBeNull();
  });
});

describe('TextEditor added formats', () => {
  const openToolbar = () => {
    const listeners: Record<string, (e: unknown) => void> = {};
    jest
      .spyOn(Keyboard, 'addListener')
      .mockImplementation((event: string, cb: (e: never) => void) => {
        listeners[event] = cb as (e: unknown) => void;
        return { remove: jest.fn() } as never;
      });

    const tree = render(
      <Provider>
        <TextEditor testID="editor" />
      </Provider>
    );
    act(() => {
      listeners.keyboardDidShow?.({ endCoordinates: { height: 300 } });
    });
    __spies.injectJavaScript.mockClear();
    return tree;
  };

  const lastScript = () =>
    (__spies.injectJavaScript.mock.calls.at(-1)?.[0] as string) ?? '';

  it.each(['h1', 'h2', 'h3'])('routes %s through formatBlock', (heading) => {
    const { getByTestId } = openToolbar();

    fireEvent.press(getByTestId(`editor-${heading}`));

    expect(lastScript()).toContain(`formatBlock', false, '<${heading}>'`);
  });

  it.each(['undo', 'redo', 'removeFormat'])(
    'runs %s as a plain command',
    (command) => {
      const { getByTestId } = openToolbar();

      fireEvent.press(getByTestId(`editor-${command}`));

      expect(lastScript()).toContain(`execCommand('${command}', false, '')`);
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

  it('never asks whether undo or redo is "active"', () => {
    const html = htmlOf(render(<TextEditor testID="editor" />));
    const toggles = html.slice(0, html.indexOf('queryCommandValue'));

    expect(toggles).not.toContain('"undo"');
    expect(toggles).not.toContain('"redo"');
    expect(toggles).not.toContain('"removeFormat"');
  });
});
