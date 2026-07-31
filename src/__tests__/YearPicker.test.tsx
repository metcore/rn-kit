import { render } from '@testing-library/react-native';
import YearPicker from '../DatePicker/YearPicker';

describe('YearPicker testID', () => {
  it('derives cancel, confirm and per-year option testIDs when open', () => {
    const currentYear = new Date().getFullYear();
    const { getByTestId } = render(
      <YearPicker testID="year" isOpen onClose={() => {}} />
    );

    expect(getByTestId('year-sheet')).toBeTruthy();
    expect(getByTestId('year-cancel')).toBeTruthy();
    expect(getByTestId('year-confirm')).toBeTruthy();
    expect(getByTestId(`year-option-${currentYear}`)).toBeTruthy();
  });

  it('renders no testID when prop omitted', () => {
    const { queryByTestId } = render(<YearPicker isOpen onClose={() => {}} />);

    expect(queryByTestId('undefined-sheet')).toBeNull();
    expect(queryByTestId('undefined-cancel')).toBeNull();
    expect(queryByTestId('undefined-confirm')).toBeNull();
  });
});
