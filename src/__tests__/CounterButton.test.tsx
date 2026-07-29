import { render } from '@testing-library/react-native';
import CounterButton from '../CounterButton/CounterButton';

describe('CounterButton testID', () => {
  it('derives increment/decrement/input testIDs', () => {
    const { getByTestId } = render(
      <CounterButton value={1} onChange={() => {}} testID="qty" />
    );
    expect(getByTestId('qty-decrement')).toBeTruthy();
    expect(getByTestId('qty-input')).toBeTruthy();
    expect(getByTestId('qty-increment')).toBeTruthy();
  });

  it('renders no testIDs when prop omitted', () => {
    const { queryByTestId } = render(
      <CounterButton value={1} onChange={() => {}} />
    );
    expect(queryByTestId('qty-decrement')).toBeNull();
    expect(queryByTestId('qty-input')).toBeNull();
    expect(queryByTestId('qty-increment')).toBeNull();
  });
});
