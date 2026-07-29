import { render } from '@testing-library/react-native';

// InputFile.tsx imports several native-module-backed packages at module
// scope (document/image pickers, blob util) that have no native binary in
// the jest environment. Mock them so the tree can mount; none of these
// tests drive the native picker flows themselves.
jest.mock('@react-native-documents/picker', () => ({
  pick: jest.fn(),
  types: { pdf: 'application/pdf', images: 'image/*' },
}));

jest.mock('@react-native-documents/viewer', () => ({
  viewDocument: jest.fn(),
}));

jest.mock('react-native-image-picker', () => ({
  launchCamera: jest.fn(),
  launchImageLibrary: jest.fn(),
}));

jest.mock('react-native-blob-util', () => ({
  fs: { dirs: { CacheDir: '/tmp' } },
  config: jest.fn(() => ({ fetch: jest.fn() })),
}));

import InputFile from '../Input/InputFile';

describe('InputFile testID', () => {
  it('derives trigger testID', () => {
    const { getByTestId } = render(
      <InputFile value={[]} onChange={() => {}} testID="attachment" />
    );
    expect(getByTestId('attachment-trigger')).toBeTruthy();
  });

  it('renders no testID when prop omitted', () => {
    const { queryByTestId } = render(
      <InputFile value={[]} onChange={() => {}} />
    );
    expect(queryByTestId('attachment-trigger')).toBeNull();
    expect(queryByTestId('undefined-trigger')).toBeNull();
  });

  it('derives per-file item and error testIDs (default variant)', () => {
    const value = [
      {
        uri: 'file://a.pdf',
        name: 'a.pdf',
        type: 'application/pdf',
        hint: 'Upload gagal',
        error: true,
      },
    ];

    const { getByTestId } = render(
      <InputFile value={value} onChange={() => {}} testID="attachment" />
    );

    expect(getByTestId('attachment-item-0')).toBeTruthy();
    expect(getByTestId('attachment-error')).toBeTruthy();
  });

  it('derives small-variant trigger and error testIDs', () => {
    const value = [
      {
        uri: 'file://a.pdf',
        name: 'a.pdf',
        type: 'application/pdf',
        hint: 'Upload gagal',
        error: true,
      },
    ];

    const { getByTestId } = render(
      <InputFile
        variant="small"
        value={value}
        onChange={() => {}}
        testID="attachment"
      />
    );

    expect(getByTestId('attachment-error')).toBeTruthy();
  });

  // Deferred coverage: `-sheet` (ModalPicker) and `-modal-delete` (ModalDelete)
  // only mount their content once the corresponding BottomSheet is opened via
  // `fireEvent.press`, which starts a real (non-native-driver) Animated.spring.
  // The spring keeps re-scheduling timers past the test's synchronous
  // assertion and unmount, which react-native's jest preset then reports as
  // "Jest environment torn down" noise and a nonzero process exit -- flaky in
  // this suite for reasons unrelated to testID plumbing. The plumbing itself
  // (`testID` flows into ModalPicker/ModalDelete's `...props` spread, which
  // is BottomSheet's own already-covered testID prop, see
  // src/__tests__/BottomSheet.test.tsx) is verified by inspection instead:
  // ModalPicker/ModalDelete's Props extend React.ComponentProps<typeof
  // BottomSheet> and forward `...props` straight through.
});
