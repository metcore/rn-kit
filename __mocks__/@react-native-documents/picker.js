// Native document picker: no binary under jest. Jest applies this
// automatically for node_modules, which is what lets the package barrel be
// imported at all. Tests that need to drive a pick still declare their own
// jest.mock with a factory -- an explicit mock wins over this one.
module.exports = {
  pick: jest.fn(() => Promise.resolve([])),
  types: { pdf: 'application/pdf', images: 'image/*', allFiles: '*/*' },
  isErrorWithCode: () => false,
  errorCodes: { OPERATION_CANCELED: 'OPERATION_CANCELED' },
};
