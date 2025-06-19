import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import List from '../List/List';
import ListItem from '../List/ListItem';
import type { AccordionProps } from './type';

export default function Accordion({
  children,
  renderHeader,
  isOpen,
  onCollapse,
}: AccordionProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const toggle = () => {
    onCollapse?.(isExpanded ? false : true);
    setIsExpanded(isExpanded ? false : true);
  };

  useEffect(() => {
    setIsExpanded(isOpen ?? false);
  }, [isOpen]);

  return (
    <View>
      <List>
        {renderHeader && (
          <TouchableOpacity onPress={toggle}>
            <ListItem>{renderHeader}</ListItem>
          </TouchableOpacity>
        )}
        {isExpanded &&
          React.Children.map(children, (child) =>
            React.isValidElement(child) ? React.cloneElement(child) : child
          )}
      </List>
    </View>
  );
}
