import { render } from '@testing-library/react-native';
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

  it('renders no testID when prop omitted', () => {
    const { queryByTestId } = render(
      <BottomSheet isOpen onClose={() => {}}>
        <Text>hi</Text>
      </BottomSheet>
    );

    expect(queryByTestId('undefined')).toBeNull();
    expect(queryByTestId('undefined-backdrop')).toBeNull();
  });
});
