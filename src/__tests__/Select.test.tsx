import { render } from '@testing-library/react-native';
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
