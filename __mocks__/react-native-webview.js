// TextEditor drives the WebView through a ref (postMessage / injectJavaScript)
// and receives editor state back via onMessage. Both are no-ops here: the
// real editor runs inside the webview's JS context, which does not exist
// under jest. Tests assert on TextEditor's own chrome, not on editor content.
const React = require('react');
const { View } = require('react-native');

const WebView = React.forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    postMessage: () => {},
    injectJavaScript: () => {},
    reload: () => {},
    stopLoading: () => {},
  }));

  return React.createElement(View, props);
});

module.exports = { WebView, default: WebView };
