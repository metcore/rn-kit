import { fireEvent, render } from '@testing-library/react-native';
import Switch from '../Input/Switch';

describe('Switch testID', () => {
  it('forwards testID to the pressable and derives -label', () => {
    const { getByTestId } = render(
      <Switch value={false} onChange={() => {}} testID="sw" label="Enable" />
    );
    expect(getByTestId('sw')).toBeTruthy();
    expect(getByTestId('sw-label')).toBeTruthy();
  });

  it('renders no testID when prop omitted', () => {
    const { queryByTestId } = render(
      <Switch value={false} onChange={() => {}} label="Enable" />
    );
    expect(queryByTestId('sw')).toBeNull();
    expect(queryByTestId('sw-label')).toBeNull();
  });
});

describe('Switch behaviour', () => {
  it('reports the flipped value to onChange', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Switch value={false} onChange={onChange} testID="sw" />
    );

    fireEvent.press(getByTestId('sw'));

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('keeps flipping its own value when uncontrolled', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<Switch onChange={onChange} testID="sw" />);

    fireEvent.press(getByTestId('sw'));
    expect(onChange).toHaveBeenLastCalledWith(true);

    fireEvent.press(getByTestId('sw'));
    expect(onChange).toHaveBeenLastCalledWith(false);
  });

  // Switch guards `disabled` twice -- an early return in handlePress and
  // `disabled` on the Pressable -- so removing either alone leaves this test
  // green. That is redundancy in the component, not a dead test: strip both
  // and it goes red. Verified by mutation.
  it('stays put when disabled', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Switch value={false} disabled onChange={onChange} testID="sw" />
    );

    fireEvent.press(getByTestId('sw'));

    expect(onChange).not.toHaveBeenCalled();
  });
});
