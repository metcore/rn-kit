import { fireEvent, render } from '@testing-library/react-native';
import { Text } from 'react-native';
import ChipItem from '../Chip/ChipItem';

const item = { label: 'Apel', value: 'apple' };

describe('ChipItem testID', () => {
  // Note the prop is `itemTestID`, not `testID` -- <Chip> feeds it the id it
  // derives per option, so the name marks it as coming from the parent.
  it('applies itemTestID to the pressable', () => {
    const { getByTestId } = render(
      <ChipItem item={item} isSelected={() => false} itemTestID="tags-apple" />
    );

    expect(getByTestId('tags-apple')).toBeTruthy();
  });

  it('renders no testID when the prop is omitted', () => {
    const { getByText, queryByTestId } = render(
      <ChipItem item={item} isSelected={() => false} />
    );

    expect(getByText('Apel')).toBeTruthy();
    expect(queryByTestId('tags-apple')).toBeNull();
  });
});

describe('ChipItem behaviour', () => {
  it('reports its disabled flag and item on press', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <ChipItem
        item={item}
        isSelected={() => false}
        onPress={onPress}
        itemTestID="chip"
      />
    );

    fireEvent.press(getByTestId('chip'));

    expect(onPress).toHaveBeenCalledWith(false, item);
  });

  it('stays quiet when the item is disabled', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <ChipItem
        item={{ ...item, disabled: true }}
        isSelected={() => false}
        onPress={onPress}
        itemTestID="chip"
      />
    );

    fireEvent.press(getByTestId('chip'));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('shows the label, and hands off to renderItem when given', () => {
    const { getByText, queryByText, rerender } = render(
      <ChipItem item={item} isSelected={() => false} itemTestID="chip" />
    );

    expect(getByText('Apel')).toBeTruthy();

    rerender(
      <ChipItem
        item={item}
        isSelected={() => false}
        itemTestID="chip"
        renderItem={(opt) => <Text>kustom {opt.label}</Text>}
      />
    );

    expect(getByText('kustom Apel')).toBeTruthy();
    expect(queryByText('Apel')).toBeNull();
  });

  it('passes the resolved selected and disabled state into renderItem', () => {
    const renderItem = jest.fn(() => <Text>kustom</Text>);
    render(
      <ChipItem
        item={{ ...item, disabled: true }}
        isSelected={() => true}
        itemTestID="chip"
        renderItem={renderItem}
      />
    );

    expect(renderItem).toHaveBeenCalledWith(
      { ...item, disabled: true },
      true,
      true
    );
  });

  // Compares the pressable's own style, not the whole tree: selection also
  // recolours the label, so a tree-wide diff stays green even if the chip's
  // background and border stop reacting. Mutation-checked.
  it('restyles the chip container when selected', () => {
    const styleOf = (selectedState: boolean) =>
      JSON.stringify(
        render(
          <ChipItem
            item={item}
            isSelected={() => selectedState}
            itemTestID="chip"
          />
        ).getByTestId('chip').props.style
      );

    expect(styleOf(false)).not.toEqual(styleOf(true));
  });

  it('restyles the chip container when disabled', () => {
    const styleOf = (disabled: boolean) =>
      JSON.stringify(
        render(
          <ChipItem
            item={{ ...item, disabled }}
            isSelected={() => false}
            itemTestID="chip"
          />
        ).getByTestId('chip').props.style
      );

    expect(styleOf(false)).not.toEqual(styleOf(true));
  });
});
