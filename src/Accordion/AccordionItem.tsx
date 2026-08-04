import type { AccordionItemProps } from './type';
import ListItem from '../List/ListItem';

export default function AccordionItem({
  children,
  index = 0,
  testID,
}: AccordionItemProps) {
  return (
    <ListItem key={index} isLast testID={testID}>
      {children}
    </ListItem>
  );
}
