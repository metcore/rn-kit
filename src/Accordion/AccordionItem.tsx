import type { AccordionItemProps } from './type';
import ListItem from '../List/ListItem';

export default function AccordionItem({
  children,
  index = 0,
}: AccordionItemProps) {
  return <ListItem key={index}>{children}</ListItem>;
}
