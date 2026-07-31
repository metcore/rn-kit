import { render } from '@testing-library/react-native';
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
