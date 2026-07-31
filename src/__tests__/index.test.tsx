// index.tsx re-exports multiply(), which resolves the RnKit turbo module at
// import time -- there is no native binary under jest. Stub the spec module so
// the barrel itself can be loaded.
jest.mock('../NativeRnKit', () => ({
  __esModule: true,
  default: { multiply: (a: number, b: number) => a * b },
}));

import * as rnKit from '../index';

// The barrel is the package's public surface -- a component that never reaches
// it might as well not exist. This guards the exports that consumers cannot
// work around, not every name in the file.
describe('package exports', () => {
  it.each([
    'TextEditor',
    'Chip',
    'ChipItem',
    'Button',
    'Input',
    'InputFile',
    'Select',
    'BottomSheet',
    'Modal',
    'Calendar',
    'Drawing',
    'PdfView',
  ])('exports %s', (name) => {
    expect(rnKit).toHaveProperty(name);
  });

  it('exports dateFormatter as a function', () => {
    expect(typeof rnKit.dateFormatter).toBe('function');
  });
});
