import { fireEvent, render } from '@testing-library/react-native';
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

describe('YearPicker behaviour', () => {
  it('reports the picked year and closes on confirm', () => {
    const currentYear = new Date().getFullYear();
    const onChange = jest.fn();
    const onClose = jest.fn();
    const { getByTestId } = render(
      <YearPicker isOpen testID="year" onChange={onChange} onClose={onClose} />
    );

    fireEvent.press(getByTestId(`year-option-${currentYear}`));
    fireEvent.press(getByTestId('year-confirm'));

    expect(onChange).toHaveBeenCalledWith([currentYear]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes without reporting anything on cancel', () => {
    const currentYear = new Date().getFullYear();
    const onChange = jest.fn();
    const onClose = jest.fn();
    const { getByTestId } = render(
      <YearPicker isOpen testID="year" onChange={onChange} onClose={onClose} />
    );

    fireEvent.press(getByTestId(`year-option-${currentYear}`));
    fireEvent.press(getByTestId('year-cancel'));

    expect(onChange).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
