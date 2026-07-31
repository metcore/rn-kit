import { act, fireEvent, render } from '@testing-library/react-native';
import { Keyboard } from 'react-native';
import { createRef } from 'react';
import vm from 'vm';

const { __spies } = require('react-native-webview');
import Provider from '../Provider/Provider';
import TextEditor, { type TextEditorRef } from '../TextEditor/TextEditor';

// injectJavaScript hands the string to WKWebView's evaluateJavaScript, which
// runs it as a *program* -- not as a function body. So a top-level `return` is
// a SyntaxError that kills the whole injection silently, and a top-level
// `const editor` collides with the one the page script already declared.
// Either one means nothing runs at all.
const parses = (script: string) => {
  try {
    // eslint-disable-next-line no-new
    new vm.Script(script);
    return null;
  } catch (error) {
    return (error as Error).message;
  }
};

const openToolbar = () => {
  const listeners: Record<string, (e: unknown) => void> = {};
  jest
    .spyOn(Keyboard, 'addListener')
    .mockImplementation((event: string, cb: (e: never) => void) => {
      listeners[event] = cb as (e: unknown) => void;
      return { remove: jest.fn() } as never;
    });
  return listeners;
};

describe('TextEditor injected scripts', () => {
  beforeEach(() => {
    __spies.injectJavaScript.mockClear();
  });

  it('injects a link script that parses as a program', () => {
    const listeners = openToolbar();
    const { getByTestId, getByText, getByPlaceholderText } = render(
      <Provider>
        <TextEditor testID="ed" />
      </Provider>
    );

    act(() => {
      listeners.keyboardDidShow?.({ endCoordinates: { height: 300 } });
    });

    fireEvent.press(getByTestId('ed-link'));
    fireEvent.changeText(
      getByPlaceholderText('https://www.example.com'),
      'contoh.com'
    );
    fireEvent.press(getByText('Simpan'));

    const script = __spies.injectJavaScript.mock.calls.at(-1)?.[0] ?? '';

    expect(script).not.toBe('');
    expect(parses(script)).toBeNull();
  });

  it('injects setContent and clearContent scripts that parse', () => {
    const ref = createRef<TextEditorRef>();
    render(<TextEditor ref={ref} testID="ed" />);

    act(() => ref.current?.setContent('<p>halo</p>'));
    act(() => ref.current?.clearContent());

    const scripts = __spies.injectJavaScript.mock.calls.map(
      (call: unknown[]) => call[0] as string
    );

    expect(scripts).toHaveLength(2);
    scripts.forEach((script: string) => {
      expect(parses(script)).toBeNull();
    });
  });

  it('never redeclares the page script own bindings', () => {
    const ref = createRef<TextEditorRef>();
    const listeners = openToolbar();
    const { getByTestId, getByText, getByPlaceholderText } = render(
      <Provider>
        <TextEditor ref={ref} testID="ed" />
      </Provider>
    );

    act(() => {
      listeners.keyboardDidShow?.({ endCoordinates: { height: 300 } });
    });
    fireEvent.press(getByTestId('ed-link'));
    fireEvent.changeText(
      getByPlaceholderText('https://www.example.com'),
      'contoh.com'
    );
    fireEvent.press(getByText('Simpan'));
    act(() => ref.current?.setContent('<p>halo</p>'));
    act(() => ref.current?.clearContent());

    const scripts = __spies.injectJavaScript.mock.calls.map(
      (call: unknown[]) => call[0] as string
    );

    // Run each script in a realm that already declares `const editor`, the way
    // the page script does. A clashing top-level declaration is a SyntaxError
    // raised at instantiation, before a line executes -- so it survives the
    // absence of a DOM here. A ReferenceError for `document` is the expected
    // outcome and proves the script got past instantiation.
    scripts.forEach((script: string) => {
      const context = vm.createContext({});
      vm.runInContext('const editor = {};', context);

      let thrown: Error | null = null;
      try {
        vm.runInContext(script, context);
      } catch (error) {
        thrown = error as Error;
      }

      expect(thrown?.name).not.toBe('SyntaxError');
    });
  });
});
