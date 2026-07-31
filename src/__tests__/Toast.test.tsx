import { fireEvent, render } from '@testing-library/react-native';
import Toast from '../Toast/Toast';

describe('Toast testID', () => {
  it('forwards testID to the root view and derives -clear', () => {
    const { getByTestId } = render(
      <Toast visible message="Saved" testID="toast" />
    );
    expect(getByTestId('toast')).toBeTruthy();
    expect(getByTestId('toast-clear')).toBeTruthy();
    expect(getByTestId('toast-message')).toBeTruthy();
  });

  it('renders no testID when prop omitted', () => {
    const { getByText, queryByTestId } = render(
      <Toast visible message="Saved" />
    );

    expect(getByText('Saved')).toBeTruthy();
    expect(queryByTestId('toast')).toBeNull();
    expect(queryByTestId('toast-clear')).toBeNull();
    expect(queryByTestId('undefined-message')).toBeNull();
  });
});

describe('Toast behaviour', () => {
  it('reports a clear when the clear button is pressed', () => {
    const onClear = jest.fn();
    const { getByTestId } = render(
      <Toast visible message="Saved" testID="toast" onClear={onClear} />
    );

    fireEvent.press(getByTestId('toast-clear'));

    expect(onClear).toHaveBeenCalledWith(true);
  });

  it('renders nothing while not visible', () => {
    const { queryByTestId, queryByText } = render(
      <Toast visible={false} message="Saved" testID="toast" />
    );

    expect(queryByTestId('toast')).toBeNull();
    expect(queryByText('Saved')).toBeNull();
  });

  it('shows the message it was given', () => {
    const { getByTestId } = render(
      <Toast visible message="Berhasil disimpan" testID="toast" />
    );

    expect(getByTestId('toast-message')).toHaveTextContent('Berhasil disimpan');
  });
});
