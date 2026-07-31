import { fireEvent, render } from '@testing-library/react-native';
import InputPassword from '../Input/InputPassword';

describe('InputPassword testID', () => {
  it('derives input and toggle testIDs', () => {
    const { getByTestId } = render(
      <InputPassword testID="pwd" value="" onChangeText={() => {}} />
    );
    expect(getByTestId('pwd-input')).toBeTruthy();
    expect(getByTestId('pwd-toggle')).toBeTruthy();
  });

  it('renders no testID when omitted', () => {
    const { queryByTestId } = render(
      <InputPassword value="" onChangeText={() => {}} />
    );
    expect(queryByTestId('pwd-input')).toBeNull();
    expect(queryByTestId('pwd-toggle')).toBeNull();
  });
});

describe('InputPassword behaviour', () => {
  it('masks the field until the eye is pressed, then unmasks it', () => {
    const { getByTestId } = render(
      <InputPassword testID="pwd" value="hunter2" onChangeText={() => {}} />
    );

    expect(getByTestId('pwd-input').props.secureTextEntry).toBe(true);

    fireEvent.press(getByTestId('pwd-toggle'));
    expect(getByTestId('pwd-input').props.secureTextEntry).toBe(false);

    fireEvent.press(getByTestId('pwd-toggle'));
    expect(getByTestId('pwd-input').props.secureTextEntry).toBe(true);
  });

  it('reports typed text to onChangeText', () => {
    const onChangeText = jest.fn();
    const { getByTestId } = render(
      <InputPassword testID="pwd" value="" onChangeText={onChangeText} />
    );

    fireEvent.changeText(getByTestId('pwd-input'), 'hunter2');

    expect(onChangeText).toHaveBeenCalledWith('hunter2');
  });
});
