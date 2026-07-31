import { fireEvent, render } from '@testing-library/react-native';
import { TouchableOpacity } from 'react-native';

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

const pdfFile = [
  {
    uri: 'file://a.pdf',
    name: 'a.pdf',
    type: 'application/pdf',
    hint: 'Upload gagal',
    error: true,
  },
];

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
    const { getByTestId } = render(
      <InputFile value={pdfFile} onChange={() => {}} testID="attachment" />
    );

    expect(getByTestId('attachment-item-0')).toBeTruthy();
    expect(getByTestId('attachment-error-0')).toBeTruthy();
  });

  it('derives small-variant trigger and error testIDs', () => {
    const { getByTestId } = render(
      <InputFile
        variant="small"
        value={pdfFile}
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

  it('derives per-file replace and delete action testIDs', () => {
    const { getByTestId } = render(
      <InputFile value={pdfFile} onChange={() => {}} testID="attachment" />
    );

    expect(getByTestId('attachment-item-0-replace')).toBeTruthy();
    expect(getByTestId('attachment-item-0-delete')).toBeTruthy();
  });

  // ModalDelete sits behind a Modal that mounts its children only once
  // confirmDeleteFile has run, so the delete action is the only way in.
  it('derives delete modal testIDs once a file delete is confirmed', () => {
    const { getByTestId } = render(
      <InputFile value={pdfFile} onChange={() => {}} testID="attachment" />
    );

    fireEvent.press(getByTestId('attachment-item-0-delete'));

    expect(getByTestId('attachment-modal-delete')).toBeTruthy();
    expect(getByTestId('attachment-modal-delete-backdrop')).toBeTruthy();
  });

  it('renders no delete modal testID when prop omitted', () => {
    const { getByText, queryByTestId, UNSAFE_getAllByType } = render(
      <InputFile value={pdfFile} onChange={() => {}} />
    );

    // No testID to grab without a base, so reach the delete action by type.
    const actions = UNSAFE_getAllByType(TouchableOpacity);
    fireEvent.press(actions[actions.length - 1]!);

    // Prove the modal really opened, so the null assertions below can only
    // pass because getTestID returned undefined -- not because nothing moved.
    expect(getByText('Hapus Dokumen')).toBeTruthy();
    expect(queryByTestId('undefined-modal-delete')).toBeNull();
    expect(queryByTestId('undefined-modal-delete-backdrop')).toBeNull();
  });
});
