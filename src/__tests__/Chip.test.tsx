import { render } from '@testing-library/react-native';
import Chip from '../Chip/Chip';

const options = [
  { label: 'A', value: 'a' },
  { label: 'B', value: 'b' },
];

describe('Chip testID', () => {
  it('derives per-option testIDs', () => {
    const { getByTestId } = render(<Chip options={options} testID="tags" />);
    expect(getByTestId('tags-option-a')).toBeTruthy();
    expect(getByTestId('tags-option-b')).toBeTruthy();
  });

  it('renders no per-option testID when prop omitted', () => {
    const { queryByTestId } = render(<Chip options={options} />);
    expect(queryByTestId('tags-option-a')).toBeNull();
    expect(queryByTestId('tags-option-b')).toBeNull();
  });
});
