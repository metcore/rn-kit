import { fireEvent, render } from '@testing-library/react-native';
import InputDate from '../Input/InputDate';

describe('InputDate testID', () => {
  it('derives trigger, label and clear testIDs', () => {
    const { getByTestId } = render(
      <InputDate
        testID="birthday"
        label="Birthday"
        placeholder="Select here"
        value="2024-01-01"
        hasClear
      />
    );

    expect(getByTestId('birthday-trigger')).toBeTruthy();
    expect(getByTestId('birthday-label')).toBeTruthy();
    expect(getByTestId('birthday-clear')).toBeTruthy();
  });

  it('derives range end trigger testID in range mode', () => {
    const { getByTestId } = render(
      <InputDate
        testID="stay"
        label="Stay"
        placeholder="Start"
        placeholderDateEnd="End"
        mode="range"
      />
    );

    expect(getByTestId('stay-trigger')).toBeTruthy();
    expect(getByTestId('stay-trigger-end')).toBeTruthy();
  });

  it('renders no testID when prop omitted', () => {
    const { queryByTestId } = render(
      <InputDate label="Birthday" placeholder="Select here" />
    );

    expect(queryByTestId('undefined-trigger')).toBeNull();
  });
});

describe('InputDate behaviour', () => {
  it('opens the date picker sheet when the trigger is pressed', () => {
    const { getByTestId, queryByTestId } = render(
      <InputDate testID="birthday" label="Birthday" placeholder="Pilih" />
    );

    expect(queryByTestId('birthday-sheet')).toBeNull();

    fireEvent.press(getByTestId('birthday-trigger'));

    expect(getByTestId('birthday-sheet')).toBeTruthy();
  });

  it('reports a null range to onDateChange when cleared', () => {
    const onDateChange = jest.fn();
    const { getByTestId } = render(
      <InputDate
        testID="birthday"
        label="Birthday"
        placeholder="Pilih"
        value="2024-01-01"
        hasClear
        onDateChange={onDateChange}
      />
    );

    fireEvent.press(getByTestId('birthday-clear'));

    expect(onDateChange).toHaveBeenCalledWith({
      date: null,
      startDate: null,
      endDate: null,
    });
  });

  it('shows the placeholder until a value is given', () => {
    const { getByText, queryByText, rerender } = render(
      <InputDate testID="birthday" label="Birthday" placeholder="Pilih" />
    );

    expect(getByText('Pilih')).toBeTruthy();

    rerender(
      <InputDate
        testID="birthday"
        label="Birthday"
        placeholder="Pilih"
        value="2024-01-01"
      />
    );

    expect(queryByText('Pilih')).toBeNull();
  });
});
