import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import List from '../List/List';
import ListItem from '../List/ListItem';
import type { AccordionProps } from './type';

export default function Accordion({
  children,
  renderHeader,
  isOpen,
  onCollapse,
  variant = 'default',
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
      <List style={variant === 'borderless' ? styles.borderless : undefined}>
        {renderHeader && (
          <TouchableOpacity onPress={toggle}>
            <ListItem
              style={variant === 'borderless' ? styles.borderless : undefined}
            >
              {renderHeader}
            </ListItem>
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

const styles = StyleSheet.create({
  borderless: {
    borderWidth: 0,
    borderBottomWidth: 0,
  },
});
