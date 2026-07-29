import { render } from '@testing-library/react-native';
import MonthPicker from '../DatePicker/MonthPicker';

it('derives cancel, confirm and per-month option testIDs when open', () => {
  const { getByTestId } = render(
    <MonthPicker isOpen onClose={() => {}} testID="month" />
  );

  expect(getByTestId('month-cancel')).toBeTruthy();
  expect(getByTestId('month-confirm')).toBeTruthy();
  expect(getByTestId('month-option-0')).toBeTruthy();
});

it('renders no testID when prop omitted', () => {
  const { queryByTestId } = render(<MonthPicker isOpen onClose={() => {}} />);

  expect(queryByTestId('undefined-cancel')).toBeNull();
  expect(queryByTestId('undefined-confirm')).toBeNull();
});
