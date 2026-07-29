import { render } from '@testing-library/react-native';
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
