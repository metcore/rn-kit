import { fireEvent, render } from '@testing-library/react-native';
import RadioButton from '../RadioButton/RadioButton';

const items = [
  { label: 'A', value: 'a' },
  { label: 'B', value: 'b' },
];

describe('RadioButton testID', () => {
  it('derives per-option testIDs', () => {
    const { getByTestId } = render(
      <RadioButton
        items={items}
        selectedValue="a"
        onChange={() => {}}
        testID="gender"
      />
    );
    expect(getByTestId('gender-option-a')).toBeTruthy();
    expect(getByTestId('gender-option-b')).toBeTruthy();
    expect(getByTestId('gender-option-a-label')).toBeTruthy();
    expect(getByTestId('gender-option-b-label')).toBeTruthy();
  });

  it('renders no per-option testID when prop omitted', () => {
    const { getByText, queryByTestId } = render(
      <RadioButton items={items} selectedValue="a" onChange={() => {}} />
    );

    expect(getByText('A')).toBeTruthy();
    expect(queryByTestId('gender-option-a')).toBeNull();
    expect(queryByTestId('gender-option-b')).toBeNull();
    expect(queryByTestId('undefined-option-a-label')).toBeNull();
  });
});

describe('RadioButton behaviour', () => {
  it('reports the tapped option value', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <RadioButton
        items={items}
        selectedValue="a"
        onChange={onChange}
        testID="gender"
      />
    );

    fireEvent.press(getByTestId('gender-option-b'));

    expect(onChange).toHaveBeenLastCalledWith('b');
  });

  it('ignores a disabled option', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <RadioButton
        items={[items[0]!, { label: 'C', value: 'c', disabled: true }]}
        selectedValue="a"
        onChange={onChange}
        testID="gender"
      />
    );

    onChange.mockClear();
    fireEvent.press(getByTestId('gender-option-c'));

    expect(onChange).not.toHaveBeenCalled();
  });
});
