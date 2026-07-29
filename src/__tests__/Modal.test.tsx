import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import ModalPopUp from '../Modal/Modal';

describe('Modal testID', () => {
  it('applies testID to content, backdrop and close when open', () => {
    const { getByTestId } = render(
      <ModalPopUp isOpen testID="confirm-modal">
        <Text>hi</Text>
      </ModalPopUp>
    );

    expect(getByTestId('confirm-modal')).toBeTruthy();
    expect(getByTestId('confirm-modal-backdrop')).toBeTruthy();
    expect(getByTestId('confirm-modal-close')).toBeTruthy();
  });

  it('renders no testID when prop omitted', () => {
    const { queryByTestId } = render(
      <ModalPopUp isOpen>
        <Text>hi</Text>
      </ModalPopUp>
    );

    expect(queryByTestId('undefined')).toBeNull();
    expect(queryByTestId('undefined-backdrop')).toBeNull();
    expect(queryByTestId('undefined-close')).toBeNull();
  });
});
