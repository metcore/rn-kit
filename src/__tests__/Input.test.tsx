import { render } from '@testing-library/react-native';
import Input from '../Input/Input';

describe('Input testID', () => {
  it('derives field, label, error testIDs', () => {
    const { getByTestId } = render(
      <Input
        testID="email"
        label="Email"
        hint="required"
        value=""
        onChangeText={() => {}}
      />
    );
    expect(getByTestId('email-input')).toBeTruthy();
    expect(getByTestId('email-label')).toBeTruthy();
    expect(getByTestId('email-error')).toBeTruthy();
  });

  it('derives clear and toggle testIDs', () => {
    const { getByTestId } = render(
      <Input
        testID="email"
        clearButton
        iconRight="Eye"
        value="a"
        onChangeText={() => {}}
      />
    );
    expect(getByTestId('email-clear')).toBeTruthy();
    expect(getByTestId('email-toggle')).toBeTruthy();
  });

  it('renders no testID when omitted', () => {
    const { queryByTestId } = render(
      <Input
        label="Email"
        hint="required"
        clearButton
        iconRight="Eye"
        value="a"
        onChangeText={() => {}}
      />
    );
    expect(queryByTestId('email-input')).toBeNull();
    expect(queryByTestId('email-label')).toBeNull();
    expect(queryByTestId('email-error')).toBeNull();
    expect(queryByTestId('email-clear')).toBeNull();
    expect(queryByTestId('email-toggle')).toBeNull();
  });
});
