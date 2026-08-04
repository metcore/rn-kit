import { fireEvent, render } from '@testing-library/react-native';
import CheckBox from '../CheckBox/CheckBox';

describe('CheckBox testID', () => {
  it('forwards testID to the pressable and derives -label', () => {
    const { getByTestId } = render(
      <CheckBox checked={false} onChange={() => {}} testID="cb" label="Agree" />
    );
    expect(getByTestId('cb')).toBeTruthy();
    expect(getByTestId('cb-label')).toBeTruthy();
  });

  it('renders no testID when prop omitted', () => {
    const { queryByTestId } = render(
      <CheckBox checked={false} onChange={() => {}} label="Agree" />
    );
    expect(queryByTestId('cb')).toBeNull();
    expect(queryByTestId('cb-label')).toBeNull();
  });
});

describe('CheckBox behaviour', () => {
  it('reports the flipped state when pressed', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <CheckBox testID="cb" label="Agree" onChange={onChange} />
    );

    fireEvent.press(getByTestId('cb'));
    expect(onChange).toHaveBeenLastCalledWith(true);

    fireEvent.press(getByTestId('cb'));
    expect(onChange).toHaveBeenLastCalledWith(false);
  });

  it('stays put when disabled', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <CheckBox testID="cb" label="Agree" disabled onChange={onChange} />
    );

    fireEvent.press(getByTestId('cb'));

    expect(onChange).not.toHaveBeenCalled();
  });

  it('adopts a changed checked prop', () => {
    const onChange = jest.fn();
    const { getByTestId, rerender } = render(
      <CheckBox testID="cb" label="Agree" checked={false} onChange={onChange} />
    );

    rerender(
      <CheckBox testID="cb" label="Agree" checked onChange={onChange} />
    );

    // Already true from the prop, so the next press must report false.
    fireEvent.press(getByTestId('cb'));
    expect(onChange).toHaveBeenLastCalledWith(false);
  });
});
