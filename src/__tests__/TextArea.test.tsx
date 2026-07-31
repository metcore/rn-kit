import { fireEvent, render } from '@testing-library/react-native';
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

describe('TextArea behaviour', () => {
  it('reports typed text to onChangeText', () => {
    const onChangeText = jest.fn();
    const { getByTestId } = render(
      <TextArea testID="bio" value="" onChangeText={onChangeText} />
    );

    fireEvent.changeText(getByTestId('bio-input'), 'about me');

    expect(onChangeText).toHaveBeenCalledWith('about me');
  });

  it('renders the hint text only when a hint is given', () => {
    const { getByTestId, queryByTestId, rerender } = render(
      <TextArea testID="bio" value="" onChangeText={() => {}} />
    );

    expect(queryByTestId('bio-error')).toBeNull();

    rerender(
      <TextArea
        testID="bio"
        hint="Wajib diisi"
        value=""
        onChangeText={() => {}}
      />
    );

    expect(getByTestId('bio-error')).toHaveTextContent('Wajib diisi');
  });
});
