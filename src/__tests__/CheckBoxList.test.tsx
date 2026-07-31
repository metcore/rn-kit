import { fireEvent, render } from '@testing-library/react-native';
import CheckBoxList from '../CheckBox/CheckBoxList';

const items = [
  { label: 'A', value: 'a' },
  { label: 'B', value: 'b' },
];

describe('CheckBoxList testID', () => {
  it('derives per-option testIDs', () => {
    const { getByTestId } = render(
      <CheckBoxList
        items={items}
        selectedValues={[]}
        onChange={() => {}}
        testID="roles"
      />
    );
    expect(getByTestId('roles-option-a')).toBeTruthy();
    expect(getByTestId('roles-option-b')).toBeTruthy();
  });

  it('renders no per-option testID when prop omitted', () => {
    const { queryByTestId } = render(
      <CheckBoxList items={items} selectedValues={[]} onChange={() => {}} />
    );
    expect(queryByTestId('roles-option-a')).toBeNull();
    expect(queryByTestId('roles-option-b')).toBeNull();
  });
});

describe('CheckBoxList behaviour', () => {
  it('adds a newly ticked value to the selection', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <CheckBoxList
        testID="roles"
        items={items}
        selectedValues={[]}
        onChange={onChange}
      />
    );

    fireEvent.press(getByTestId('roles-option-a'));

    expect(onChange).toHaveBeenCalledWith(['a']);
  });

  it('removes a value that was already selected', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <CheckBoxList
        testID="roles"
        items={items}
        selectedValues={['a', 'b']}
        onChange={onChange}
      />
    );

    fireEvent.press(getByTestId('roles-option-a'));

    expect(onChange).toHaveBeenCalledWith(['b']);
  });
});
