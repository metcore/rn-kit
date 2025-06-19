import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import List from '../List/List';
import ListItem from '../List/ListItem';
import type { AccordionItemProps } from './type';

export default function Accordion({
  children,
  header,
  isOpen,
  onCollapse,
}: AccordionItemProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const toggle = () => {
    onCollapse?.(isExpanded ? false : true);
    setIsExpanded(isExpanded ? false : true);
  };

  useState(() => {
    setIsExpanded(isOpen);
  }, [isOpen]);

  return (
    <View>
      <List>
        {header && (
          <TouchableOpacity onPress={toggle}>
            <ListItem>{header?.()}</ListItem>
          </TouchableOpacity>
        )}
        {isExpanded &&
          React.Children.map(children, (child, index) =>
            React.isValidElement(child)
              ? React.cloneElement(child, { index })
              : child
          )}
      </List>
    </View>
  );
}
