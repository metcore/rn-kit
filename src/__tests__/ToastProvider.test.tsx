import { act, fireEvent, render } from '@testing-library/react-native';
import { LayoutAnimation, Pressable, Text } from 'react-native';
import { ToastProvider, useToast } from '../Toast/ToastContext';

const Trigger = ({ messages }: { messages: string[] }) => {
  const toast = useToast();

  return (
    <Pressable
      testID="trigger"
      onPress={() => messages.forEach((message) => toast.show(message))}
    >
      <Text>show</Text>
    </Pressable>
  );
};

const renderWith = (messages: string[]) =>
  render(
    <ToastProvider>
      <Trigger messages={messages} />
    </ToastProvider>
  );

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

describe('ToastProvider', () => {
  it('shows a toast until its duration runs out', () => {
    const { getByTestId, queryByText } = renderWith(['Tersimpan']);

    fireEvent.press(getByTestId('trigger'));
    act(() => jest.advanceTimersByTime(1000));

    expect(queryByText('Tersimpan')).toBeTruthy();

    act(() => jest.advanceTimersByTime(5000));

    expect(queryByText('Tersimpan')).toBeNull();
  });

  it('keeps every toast that was shown at the same time', () => {
    const { getByTestId, queryByText } = renderWith(['Pertama', 'Kedua']);

    fireEvent.press(getByTestId('trigger'));
    act(() => jest.advanceTimersByTime(1000));

    expect(queryByText('Pertama')).toBeTruthy();
    expect(queryByText('Kedua')).toBeTruthy();
  });

  it('keeps a toast shown while another one is still on screen', () => {
    const { getByTestId, queryByText, rerender } = renderWith(['Pertama']);

    fireEvent.press(getByTestId('trigger'));
    act(() => jest.advanceTimersByTime(1000));

    rerender(
      <ToastProvider>
        <Trigger messages={['Kedua']} />
      </ToastProvider>
    );
    fireEvent.press(getByTestId('trigger'));
    act(() => jest.advanceTimersByTime(500));

    expect(queryByText('Pertama')).toBeTruthy();
    expect(queryByText('Kedua')).toBeTruthy();
  });

  it('animates the stack when a toast arrives and when one leaves', () => {
    const configureNext = jest.spyOn(LayoutAnimation, 'configureNext');
    const { getByTestId } = renderWith(['Pertama']);

    fireEvent.press(getByTestId('trigger'));

    expect(configureNext).toHaveBeenCalledTimes(1);

    act(() => jest.advanceTimersByTime(5000));

    expect(configureNext).toHaveBeenCalledTimes(2);

    configureNext.mockRestore();
  });
});
