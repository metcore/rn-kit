import { render } from '@testing-library/react-native';
import DatePicker from '../DatePicker/DatePicker';

describe('DatePicker testID', () => {
  it('derives cancel and confirm testIDs when open', () => {
    const { getByTestId } = render(
      <DatePicker
        testID="birthday"
        isOpen
        onClose={() => {}}
        onChange={() => {}}
      />
    );

    expect(getByTestId('birthday-cancel')).toBeTruthy();
    expect(getByTestId('birthday-confirm')).toBeTruthy();
  });

  it('derives error testID when hasError', () => {
    const { getByTestId } = render(
      <DatePicker
        testID="birthday"
        isOpen
        hasError
        onClose={() => {}}
        onChange={() => {}}
      />
    );

    expect(getByTestId('birthday-error')).toBeTruthy();
  });

  it('renders no testID when prop omitted', () => {
    const { queryByTestId } = render(
      <DatePicker isOpen onClose={() => {}} onChange={() => {}} />
    );

    expect(queryByTestId('undefined-cancel')).toBeNull();
    expect(queryByTestId('undefined-confirm')).toBeNull();
  });
});
