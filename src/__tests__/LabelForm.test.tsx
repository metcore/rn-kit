import { render } from '@testing-library/react-native';
import Color from '../Color/Color';
import LabelForm from '../LabelForm/LabelForm';

describe('LabelForm testID', () => {
  it('applies the testID it was given', () => {
    const { getByTestId } = render(
      <LabelForm testID="email-label" title="Email" />
    );

    expect(getByTestId('email-label')).toBeTruthy();
  });

  it('renders no testID when the prop is omitted', () => {
    const { getByText, queryByTestId } = render(<LabelForm title="Email" />);

    expect(getByText('Email')).toBeTruthy();
    expect(queryByTestId('email-label')).toBeNull();
  });
});

describe('LabelForm behaviour', () => {
  it('shows the title it was given', () => {
    const { getByText } = render(
      <LabelForm testID="label" title="Nama Lengkap" />
    );

    expect(getByText('Nama Lengkap')).toBeTruthy();
  });

  it('adds an asterisk only when required', () => {
    const { queryByText, rerender } = render(
      <LabelForm testID="label" title="Email" />
    );

    expect(queryByText('*')).toBeNull();

    rerender(<LabelForm testID="label" title="Email" required />);

    expect(queryByText('*')).toBeTruthy();
  });

  it('honours a custom colour', () => {
    const plain = render(<LabelForm testID="label" title="Email" />);
    const coloured = render(
      <LabelForm testID="label" title="Email" color={Color.danger[500]} />
    );

    expect(JSON.stringify(plain.toJSON())).not.toEqual(
      JSON.stringify(coloured.toJSON())
    );
  });
});
