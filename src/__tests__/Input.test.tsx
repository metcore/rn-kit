import { fireEvent, render } from '@testing-library/react-native';
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

describe('Input behaviour', () => {
  it('reports typed text to onChangeText', () => {
    const onChangeText = jest.fn();
    const { getByTestId } = render(
      <Input testID="email" value="" onChangeText={onChangeText} />
    );

    fireEvent.changeText(getByTestId('email-input'), 'a@b.com');

    expect(onChangeText).toHaveBeenCalledWith('a@b.com');
  });

  it('empties the field and reports it when cleared', () => {
    const onChangeText = jest.fn();
    const { getByTestId } = render(
      <Input
        testID="email"
        clearButton
        value="typed"
        onChangeText={onChangeText}
      />
    );

    fireEvent.press(getByTestId('email-clear'));

    expect(onChangeText).toHaveBeenCalledWith('');
    expect(getByTestId('email-input').props.value).toBe('');
  });

  it('shows the clear button only while the field has text', () => {
    const { getByTestId, queryByTestId, rerender } = render(
      <Input testID="email" clearButton value="" onChangeText={() => {}} />
    );

    expect(queryByTestId('email-clear')).toBeNull();

    rerender(
      <Input testID="email" clearButton value="typed" onChangeText={() => {}} />
    );

    expect(getByTestId('email-clear')).toBeTruthy();
  });

  it('calls onPressIconRight when the right icon is pressed', () => {
    const onPressIconRight = jest.fn();
    const { getByTestId } = render(
      <Input
        testID="email"
        iconRight="Eye"
        value=""
        onChangeText={() => {}}
        onPressIconRight={onPressIconRight}
      />
    );

    fireEvent.press(getByTestId('email-toggle'));

    expect(onPressIconRight).toHaveBeenCalledTimes(1);
  });

  it('mirrors a changed value prop back into the field', () => {
    const { getByTestId, rerender } = render(
      <Input testID="email" value="first" onChangeText={() => {}} />
    );

    expect(getByTestId('email-input').props.value).toBe('first');

    rerender(<Input testID="email" value="second" onChangeText={() => {}} />);

    expect(getByTestId('email-input').props.value).toBe('second');
  });
});
