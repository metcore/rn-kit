import React, { useState, type ReactNode } from 'react';
import { TouchableOpacity, View } from 'react-native';
import List from '../List/List';
import ListItem from '../List/ListItem';
interface AccordionProps {
  children: ReactNode;
  header?: () => ReactNode;
  isOpen?: boolean;
  onCollapse?: (isOpen: boolean) => void;
}

export default function Accordion({
  children,
  header,
  isOpen,
  onCollapse,
}: AccordionProps) {
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
        <TouchableOpacity onPress={toggle}>
          <ListItem>{header?.()}</ListItem>
        </TouchableOpacity>
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
