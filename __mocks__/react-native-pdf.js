// react-native-pdf renders a native view with no binary under jest. Jest
// applies this automatically for node_modules packages, so test files need no
// jest.mock call of their own.
const React = require('react');
const { View } = require('react-native');

module.exports = React.forwardRef((props, ref) =>
  React.createElement(View, { ...props, ref })
);
