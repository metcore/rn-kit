import { act, fireEvent, render } from '@testing-library/react-native';
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
  it('reports a clear once it has slid away after the clear button is pressed', () => {
    jest.useFakeTimers();
    const onClear = jest.fn();
    const { getByTestId } = render(
      <Toast visible message="Saved" testID="toast" onClear={onClear} />
    );

    act(() => jest.advanceTimersByTime(500));
    fireEvent.press(getByTestId('toast-clear'));

    expect(onClear).not.toHaveBeenCalled();

    act(() => jest.advanceTimersByTime(500));

    expect(onClear).toHaveBeenCalledWith(true);
    jest.useRealTimers();
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

describe('Toast closable', () => {
  it('hides the close button when it is not closable', () => {
    const { getByText, queryByTestId } = render(
      <Toast testID="toast" visible message="Tersimpan" closable={false} />
    );

    expect(getByText('Tersimpan')).toBeTruthy();
    expect(queryByTestId('toast-clear')).toBeNull();
  });
});

describe('Toast lifecycle', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('keeps showing when it re-renders with a new onHide', () => {
    const { queryByText, rerender } = render(
      <Toast visible message="Tersimpan" onHide={() => {}} />
    );

    act(() => jest.advanceTimersByTime(1000));
    rerender(<Toast visible message="Tersimpan" onHide={() => {}} />);
    act(() => jest.advanceTimersByTime(1000));

    expect(queryByText('Tersimpan')).toBeTruthy();
  });

  it('reports a hide once its duration has run out', () => {
    const onHide = jest.fn();

    render(<Toast visible message="Tersimpan" onHide={onHide} />);
    act(() => jest.advanceTimersByTime(4000));

    expect(onHide).toHaveBeenCalledWith(true);
  });

  it('applies the style it was given', () => {
    const { getByTestId } = render(
      <Toast
        testID="toast"
        visible
        message="Tersimpan"
        style={{ bottom: 120 }}
      />
    );

    expect(getByTestId('toast')).toHaveStyle({ bottom: 120 });
  });

  it('slides up into place as it fades in', () => {
    const { getByTestId } = render(
      <Toast testID="toast" visible message="Tersimpan" />
    );

    const style = getByTestId('toast').props.style;
    const flat = Array.isArray(style) ? Object.assign({}, ...style) : style;

    expect(flat.transform).toBeDefined();
  });

  it('gives the close button a touch area larger than its icon', () => {
    const { getByTestId } = render(
      <Toast testID="toast" visible message="Tersimpan" />
    );

    expect(getByTestId('toast-clear').props.hitSlop).toEqual({
      top: 12,
      bottom: 12,
      left: 12,
      right: 12,
    });
  });
});
