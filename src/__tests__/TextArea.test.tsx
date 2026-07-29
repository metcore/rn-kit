import { render } from '@testing-library/react-native';
import TextArea from '../Input/TextArea';

describe('TextArea testID', () => {
  it('derives field, label, error testIDs', () => {
    const { getByTestId } = render(
      <TextArea
        testID="bio"
        label="Bio"
        hint="required"
        value=""
        onChangeText={() => {}}
      />
    );
    expect(getByTestId('bio-input')).toBeTruthy();
    expect(getByTestId('bio-label')).toBeTruthy();
    expect(getByTestId('bio-error')).toBeTruthy();
  });

  it('renders no testID when omitted', () => {
    const { queryByTestId } = render(
      <TextArea label="Bio" hint="required" value="" onChangeText={() => {}} />
    );
    expect(queryByTestId('bio-input')).toBeNull();
    expect(queryByTestId('bio-label')).toBeNull();
    expect(queryByTestId('bio-error')).toBeNull();
  });
});
