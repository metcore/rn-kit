import { fireEvent, render } from '@testing-library/react-native';
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

describe('Chip behaviour', () => {
  it('reports the tapped value as the new selection', () => {
    const onSelect = jest.fn();
    const { getByTestId } = render(
      <Chip options={options} testID="tags" onSelect={onSelect} />
    );

    fireEvent.press(getByTestId('tags-option-a'));

    expect(onSelect).toHaveBeenCalledWith(['a']);
  });

  it('honours a selection supplied through the selected prop', () => {
    const onSelect = jest.fn();
    const { getByTestId } = render(
      <Chip
        options={options}
        testID="tags"
        multiple
        selected={['a']}
        onSelect={onSelect}
      />
    );

    fireEvent.press(getByTestId('tags-option-b'));

    expect(onSelect).toHaveBeenCalledWith(['a', 'b']);
  });

  // BUG (documented, not fixed here): Chip's sync effect lists
  // `internalSelected` in its own dependency array and resets state back to
  // the `selected` prop whenever the two differ. Uncontrolled, `selected`
  // defaults to [], so every pick is wiped before the next one -- multiple
  // mode can never accumulate. Characterised below; the `.failing` test above
  // it will start failing (i.e. alerting) the moment the effect is fixed.
  it('drops the previous pick when uncontrolled', () => {
    const onSelect = jest.fn();
    const { getByTestId } = render(
      <Chip options={options} testID="tags" multiple onSelect={onSelect} />
    );

    fireEvent.press(getByTestId('tags-option-a'));
    fireEvent.press(getByTestId('tags-option-b'));

    // Should be ['a', 'b'] -- the reset effect throws 'a' away.
    expect(onSelect).toHaveBeenLastCalledWith(['b']);
  });

  it.failing('keeps both values when multiple and uncontrolled', () => {
    const onSelect = jest.fn();
    const { getByTestId } = render(
      <Chip options={options} testID="tags" multiple onSelect={onSelect} />
    );

    fireEvent.press(getByTestId('tags-option-a'));
    fireEvent.press(getByTestId('tags-option-b'));

    expect(onSelect).toHaveBeenLastCalledWith(['a', 'b']);
  });
});
