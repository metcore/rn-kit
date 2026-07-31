import { act, fireEvent, render } from '@testing-library/react-native';
import { Text } from 'react-native';
import BottomSheet from '../BottomSheet/BottomSheet';

describe('BottomSheet testID', () => {
  it('applies testID to sheet body and backdrop when open', () => {
    const { getByTestId } = render(
      <BottomSheet isOpen onClose={() => {}} testID="picker-sheet">
        <Text>hi</Text>
      </BottomSheet>
    );

    expect(getByTestId('picker-sheet')).toBeTruthy();
    expect(getByTestId('picker-sheet-backdrop')).toBeTruthy();
  });

  // pullbar rides on `closable`, which defaults true, so it is present in the
  // plain case above too -- close and footer each need their prop opted in.
  it('derives pullbar testID by default and drops it when not closable', () => {
    const { getByTestId, queryByTestId, rerender } = render(
      <BottomSheet isOpen onClose={() => {}} testID="picker-sheet">
        <Text>hi</Text>
      </BottomSheet>
    );

    expect(getByTestId('picker-sheet-pullbar')).toBeTruthy();

    rerender(
      <BottomSheet
        isOpen
        closable={false}
        onClose={() => {}}
        testID="picker-sheet"
      >
        <Text>hi</Text>
      </BottomSheet>
    );

    expect(queryByTestId('picker-sheet-pullbar')).toBeNull();
  });

  it('derives close testID when buttonClose is set', () => {
    const { getByTestId } = render(
      <BottomSheet isOpen buttonClose onClose={() => {}} testID="picker-sheet">
        <Text>hi</Text>
      </BottomSheet>
    );

    expect(getByTestId('picker-sheet-close')).toBeTruthy();
  });

  it('derives footer testID when a footer is passed', () => {
    const { getByTestId } = render(
      <BottomSheet
        isOpen
        onClose={() => {}}
        testID="picker-sheet"
        footer={<Text>done</Text>}
      >
        <Text>hi</Text>
      </BottomSheet>
    );

    expect(getByTestId('picker-sheet-footer')).toBeTruthy();
  });

  it('renders no testID when prop omitted', () => {
    // buttonClose and footer are opted in so those elements actually render --
    // otherwise their null assertions would pass for the wrong reason.
    const { getByText, queryByTestId } = render(
      <BottomSheet
        isOpen
        buttonClose
        onClose={() => {}}
        footer={<Text>done</Text>}
      >
        <Text>hi</Text>
      </BottomSheet>
    );

    expect(getByText('done')).toBeTruthy();
    expect(queryByTestId('undefined')).toBeNull();
    expect(queryByTestId('undefined-backdrop')).toBeNull();
    expect(queryByTestId('undefined-pullbar')).toBeNull();
    expect(queryByTestId('undefined-close')).toBeNull();
    expect(queryByTestId('undefined-footer')).toBeNull();
  });
});

describe('BottomSheet behaviour', () => {
  it('reports a close after the hide animation finishes', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <BottomSheet isOpen onClose={onClose} testID="picker-sheet">
        <Text>hi</Text>
      </BottomSheet>
    );

    fireEvent.press(getByTestId('picker-sheet-backdrop'));

    // hideModal runs a 300ms Animated.timing and only reports onClose from
    // its completion callback, so nothing is reported until time moves.
    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(onClose).toHaveBeenCalledWith(false);
  });

  it('stays open when not closable', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <BottomSheet
        isOpen
        closable={false}
        onClose={onClose}
        testID="picker-sheet"
      >
        <Text>hi</Text>
      </BottomSheet>
    );

    fireEvent.press(getByTestId('picker-sheet-backdrop'));
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(onClose).not.toHaveBeenCalled();
    expect(getByTestId('picker-sheet')).toBeTruthy();
  });

  it('calls onRequestClose as soon as the backdrop is pressed', () => {
    const onRequestClose = jest.fn();
    const { getByTestId } = render(
      <BottomSheet
        isOpen
        onClose={() => {}}
        onRequestClose={onRequestClose}
        testID="picker-sheet"
      >
        <Text>hi</Text>
      </BottomSheet>
    );

    fireEvent.press(getByTestId('picker-sheet-backdrop'));

    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });
});
