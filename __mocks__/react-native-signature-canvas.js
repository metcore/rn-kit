// SignatureCanvas is itself a webview wrapper, so it cannot draw under jest.
// Drawing calls readSignature/clearSignature through a ref; the real callbacks
// (onOK / onEmpty) are driven by the canvas, so tests that need them should
// invoke the props directly rather than expect drawing to happen.
const React = require('react');
const { View } = require('react-native');

const SignatureCanvas = React.forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    readSignature: () => {},
    clearSignature: () => {},
    undo: () => {},
    redo: () => {},
    getData: () => {},
  }));

  return React.createElement(View, props);
});

module.exports = SignatureCanvas;
module.exports.default = SignatureCanvas;
