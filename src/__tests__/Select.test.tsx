import { fireEvent, render } from '@testing-library/react-native';
import Select from '../Select/Select';
import { ToastProvider } from '../Toast/ToastContext';

const data = [
  { label: 'A', value: 'a' },
  { label: 'B', value: 'b' },
];

describe('Select testID', () => {
  it('derives search and per-option testIDs', () => {
    const { getByTestId } = render(
      <ToastProvider>
        <Select testID="picker" data={data} isOpen />
      </ToastProvider>
    );

    expect(getByTestId('picker-sheet')).toBeTruthy();
    expect(getByTestId('picker-search-input')).toBeTruthy();
    expect(getByTestId('picker-option-a')).toBeTruthy();
    expect(getByTestId('picker-option-b')).toBeTruthy();
  });

  it('derives submit testID when multiple', () => {
    const { getByTestId } = render(
      <ToastProvider>
        <Select testID="picker" data={data} isOpen multiple />
      </ToastProvider>
    );

    expect(getByTestId('picker-submit')).toBeTruthy();
  });

  it('renders no testID when prop omitted', () => {
    const { queryByTestId } = render(
      <ToastProvider>
        <Select data={data} isOpen />
      </ToastProvider>
    );

    expect(queryByTestId('undefined-sheet')).toBeNull();
    expect(queryByTestId('undefined-search-input')).toBeNull();
    expect(queryByTestId('undefined-option-a')).toBeNull();
  });
});

describe('Select submit', () => {
  it('closes after submitting a multiple selection', () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn();
    const { getByTestId } = render(
      <ToastProvider>
        <Select
          testID="picker"
          data={data}
          isOpen
          multiple
          onClose={onClose}
          onSubmit={onSubmit}
        />
      </ToastProvider>
    );

    fireEvent.press(getByTestId('picker-option-a'));
    fireEvent.press(getByTestId('picker-submit'));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    // The single-select path already closed itself; multiple never did.
    expect(onClose).toHaveBeenCalledWith(false);
  });

  // Guarded twice, like Switch and CounterButton: an early return here and
  // `disabled` on the submit button. Either alone keeps this green; strip both
  // and it goes red. Verified by mutation.
  it('stays open when required and nothing is selected', () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn();
    const { getByTestId } = render(
      <ToastProvider>
        <Select
          testID="picker"
          data={data}
          isOpen
          multiple
          required
          onClose={onClose}
          onSubmit={onSubmit}
        />
      </ToastProvider>
    );

    fireEvent.press(getByTestId('picker-submit'));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('closes after picking in single-select, without a submit button', () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn();
    const { getByTestId, queryByTestId } = render(
      <ToastProvider>
        <Select
          testID="picker"
          data={data}
          isOpen
          onClose={onClose}
          onSubmit={onSubmit}
        />
      </ToastProvider>
    );

    // Single-select commits on the tap itself; there is no submit button.
    expect(queryByTestId('picker-submit')).toBeNull();

    fireEvent.press(getByTestId('picker-option-a'));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledWith(false);
  });

  it('closes after picking in single-select when required', () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn();
    const { getByTestId } = render(
      <ToastProvider>
        <Select
          testID="picker"
          data={data}
          isOpen
          required
          onClose={onClose}
          onSubmit={onSubmit}
        />
      </ToastProvider>
    );

    fireEvent.press(getByTestId('picker-option-a'));

    // Single-select has two close sites, one per required branch; both need
    // covering or a regression hides in whichever is untested.
    expect(onSubmit).toHaveBeenCalledWith(['a']);
    expect(onClose).toHaveBeenCalledWith(false);
  });
});
