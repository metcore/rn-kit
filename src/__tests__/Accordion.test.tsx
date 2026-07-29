import { render } from '@testing-library/react-native';
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
