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

  it('keeps both values when multiple and uncontrolled', () => {
    const onSelect = jest.fn();
    const { getByTestId } = render(
      <Chip options={options} testID="tags" multiple onSelect={onSelect} />
    );

    fireEvent.press(getByTestId('tags-option-a'));
    fireEvent.press(getByTestId('tags-option-b'));

    expect(onSelect).toHaveBeenLastCalledWith(['a', 'b']);
  });

  it('untoggles an uncontrolled pick that is tapped twice', () => {
    const onSelect = jest.fn();
    const { getByTestId } = render(
      <Chip options={options} testID="tags" multiple onSelect={onSelect} />
    );

    fireEvent.press(getByTestId('tags-option-a'));
    fireEvent.press(getByTestId('tags-option-a'));

    expect(onSelect).toHaveBeenLastCalledWith([]);
  });

  // The regression this guards is invisible to onSelect: the reset effect used
  // to report the right value while leaving the chip unlit, so compare the
  // rendered tree instead. Uncontrolled-after-tap must match controlled, not
  // untouched.
  it('lights the tapped chip when uncontrolled', () => {
    const uncontrolled = render(
      <Chip options={options} testID="tags" onSelect={() => {}} />
    );
    fireEvent.press(uncontrolled.getByTestId('tags-option-a'));

    const controlled = render(
      <Chip
        options={options}
        testID="tags"
        selected={['a']}
        onSelect={() => {}}
      />
    );
    const untouched = render(
      <Chip options={options} testID="tags" onSelect={() => {}} />
    );

    // Serialised, not toEqual: the trees carry distinct handler identities, so
    // a structural compare reports a difference that is not a visual one.
    expect(JSON.stringify(uncontrolled.toJSON())).toEqual(
      JSON.stringify(controlled.toJSON())
    );
    expect(JSON.stringify(uncontrolled.toJSON())).not.toEqual(
      JSON.stringify(untouched.toJSON())
    );
  });

  it('still follows the selected prop when it changes', () => {
    const { toJSON, rerender } = render(
      <Chip
        options={options}
        testID="tags"
        selected={['a']}
        onSelect={() => {}}
      />
    );
    const withA = JSON.stringify(toJSON());

    rerender(
      <Chip
        options={options}
        testID="tags"
        selected={['b']}
        onSelect={() => {}}
      />
    );

    expect(JSON.stringify(toJSON())).not.toEqual(withA);
  });
});
