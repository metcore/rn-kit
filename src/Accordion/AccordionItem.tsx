import type { AccordionItemProps } from './type';
import ListItem from '../List/ListItem';

export default function AccordionItem({ children }: AccordionItemProps) {
  return <ListItem>{children}</ListItem>;
}
