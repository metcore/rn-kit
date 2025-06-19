import type { ReactNode } from 'react';

export interface AccordionContextType {
  expandedIndex: number | null;
  setExpandedIndex: (index: number | null) => void;
}

export interface AccordionProps {
  children: ReactNode;
  header?: () => ReactNode;
  isOpen?: boolean;
  onCollapse?: (isOpen: boolean) => void;
}
export interface AccordionItemProps {
  children: ReactNode;
  renderHeader: ReactNode;
  isOpen: boolean;
  onCollapse: boolean;
}
