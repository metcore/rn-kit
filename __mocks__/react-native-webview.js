// TextEditor drives the WebView through a ref (postMessage / injectJavaScript)
// and receives editor state back via onMessage. The real editor runs inside the
// webview's JS context, which does not exist under jest, so the ref methods are
// recorded rather than executed -- tests assert on what TextEditor asked the
// webview to do. Reach them through `__spies`; clear them in beforeEach.
const React = require('react');
const { View } = require('react-native');

const spies = {
  injectJavaScript: jest.fn(),
  postMessage: jest.fn(),
  reload: jest.fn(),
  stopLoading: jest.fn(),
};

const WebView = React.forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => spies);

  return React.createElement(View, props);
});

module.exports = { WebView, default: WebView, __spies: spies };
