import { render } from '@testing-library/react-native';
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
