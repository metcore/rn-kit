import { fireEvent, render } from '@testing-library/react-native';
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

describe('CounterButton behaviour', () => {
  it('reports the raised value on increment', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <CounterButton testID="qty" value={2} onChange={onChange} />
    );

    fireEvent.press(getByTestId('qty-increment'));

    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('reports the lowered value on decrement', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <CounterButton testID="qty" value={2} onChange={onChange} />
    );

    fireEvent.press(getByTestId('qty-decrement'));

    expect(onChange).toHaveBeenCalledWith(1);
  });

  // Guarded twice, like Switch: an early return in handlePressButton and
  // `disabled` on the Pressable. Either alone keeps this green; strip both and
  // it goes red. Verified by mutation.
  it('refuses to go below min', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <CounterButton testID="qty" value={0} min={0} onChange={onChange} />
    );

    fireEvent.press(getByTestId('qty-decrement'));

    expect(onChange).not.toHaveBeenCalled();
  });

  it('refuses to go above max', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <CounterButton testID="qty" value={5} max={5} onChange={onChange} />
    );

    fireEvent.press(getByTestId('qty-increment'));

    expect(onChange).not.toHaveBeenCalled();
  });

  it('clamps a typed value into the min/max range', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <CounterButton
        testID="qty"
        value={2}
        min={1}
        max={4}
        onChange={onChange}
      />
    );

    fireEvent.changeText(getByTestId('qty-input'), '9');

    expect(onChange).toHaveBeenCalledWith(4);
  });
});
