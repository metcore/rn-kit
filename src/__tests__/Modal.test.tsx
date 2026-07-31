import { fireEvent, render } from '@testing-library/react-native';
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

describe('Modal behaviour', () => {
  it('closes when the backdrop is pressed', () => {
    const onClose = jest.fn();
    const { getByTestId, queryByText } = render(
      <ModalPopUp isOpen testID="confirm-modal" onClose={onClose}>
        <Text>body</Text>
      </ModalPopUp>
    );

    fireEvent.press(getByTestId('confirm-modal-backdrop'));

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(queryByText('body')).toBeNull();
  });

  it('closes when the close button is pressed', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <ModalPopUp isOpen testID="confirm-modal" onClose={onClose}>
        <Text>body</Text>
      </ModalPopUp>
    );

    fireEvent.press(getByTestId('confirm-modal-close'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('ignores the backdrop when not closable', () => {
    const onClose = jest.fn();
    const { getByTestId, getByText } = render(
      <ModalPopUp
        isOpen
        closable={false}
        testID="confirm-modal"
        onClose={onClose}
      >
        <Text>body</Text>
      </ModalPopUp>
    );

    fireEvent.press(getByTestId('confirm-modal-backdrop'));

    expect(onClose).not.toHaveBeenCalled();
    expect(getByText('body')).toBeTruthy();
  });
});
