import { fireEvent, render } from '@testing-library/react-native';

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
    expect(getByTestId('attachment-error-0')).toBeTruthy();
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

    expect(getByTestId('attachment-error-0')).toBeTruthy();
  });

  // ModalPicker's BottomSheet renders behind a Modal that only mounts its
  // children once open, so the sheet ids are unreachable until the trigger is
  // pressed.
  it('derives sheet testIDs once the picker is opened', () => {
    const { getByTestId } = render(
      <InputFile value={[]} onChange={() => {}} testID="attachment" />
    );

    fireEvent.press(getByTestId('attachment-trigger'));

    expect(getByTestId('attachment-sheet')).toBeTruthy();
    expect(getByTestId('attachment-sheet-backdrop')).toBeTruthy();
  });

  it('renders no sheet testID when prop omitted', () => {
    const { getByText, queryByTestId } = render(
      <InputFile value={[]} onChange={() => {}} />
    );

    fireEvent.press(getByText('Choose File'));

    // Prove the sheet really opened, so the null assertions below can only
    // pass because getTestID returned undefined -- not because nothing moved.
    expect(getByText('Upload Dokumen')).toBeTruthy();
    expect(queryByTestId('undefined-sheet')).toBeNull();
    expect(queryByTestId('undefined-sheet-backdrop')).toBeNull();
  });

  // Deferred coverage: `-modal-delete` (ModalDelete) mounts only after
  // confirmDeleteFile runs, which is reachable exclusively through
  // ItemPreview's delete TouchableOpacity -- and that button carries no
  // testID of its own (neither does the ItemPreview that CardTriggerSmall
  // nests). Opening it from a test would mean an UNSAFE_getAllByType index
  // into the action row, which breaks on any layout change. Covering this
  // properly needs a testID on ItemPreview's replace/delete actions first.
});
