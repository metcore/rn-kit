import { fireEvent, render } from '@testing-library/react-native';
import { Text } from 'react-native';
import Accordion from '../Accordion/Accordion';
import AccordionItem from '../Accordion/AccordionItem';

describe('Accordion testID', () => {
  it('derives the header trigger testID', () => {
    const { getByTestId } = render(
      <Accordion testID="faq" renderHeader={<Text>Question?</Text>} isOpen>
        <AccordionItem index={0}>
          <Text>Answer</Text>
        </AccordionItem>
      </Accordion>
    );
    expect(getByTestId('faq-trigger')).toBeTruthy();
  });

  it('renders no derived testID when testID prop is omitted', () => {
    const { queryByTestId } = render(
      <Accordion renderHeader={<Text>Question?</Text>} isOpen>
        <AccordionItem index={0}>
          <Text>Answer</Text>
        </AccordionItem>
      </Accordion>
    );
    expect(queryByTestId('undefined-trigger')).toBeNull();
  });
});

describe('Accordion behaviour', () => {
  it('reveals its children on the first tap and hides them on the next', () => {
    const { getByTestId, getByText, queryByText } = render(
      <Accordion testID="faq" renderHeader={<Text>Header</Text>}>
        <Text>Body</Text>
      </Accordion>
    );

    expect(queryByText('Body')).toBeNull();

    fireEvent.press(getByTestId('faq-trigger'));
    expect(getByText('Body')).toBeTruthy();

    fireEvent.press(getByTestId('faq-trigger'));
    expect(queryByText('Body')).toBeNull();
  });

  it('reports each toggle through onCollapse', () => {
    const onCollapse = jest.fn();
    const { getByTestId } = render(
      <Accordion
        testID="faq"
        onCollapse={onCollapse}
        renderHeader={<Text>Header</Text>}
      >
        <Text>Body</Text>
      </Accordion>
    );

    fireEvent.press(getByTestId('faq-trigger'));
    expect(onCollapse).toHaveBeenLastCalledWith(true);

    fireEvent.press(getByTestId('faq-trigger'));
    expect(onCollapse).toHaveBeenLastCalledWith(false);
  });

  it('starts expanded when isOpen is set', () => {
    const { getByText } = render(
      <Accordion testID="faq" isOpen renderHeader={<Text>Header</Text>}>
        <Text>Body</Text>
      </Accordion>
    );

    expect(getByText('Body')).toBeTruthy();
  });
});
