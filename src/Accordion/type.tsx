import type { ReactNode } from 'react';

export interface AccordionContextType {
  expandedIndex: number | null;
  setExpandedIndex: (index: number | null) => void;
}

export interface AccordionProps {
  children: ReactNode;
  renderHeader: ReactNode | null;
  isOpen?: boolean;
  onCollapse?: (isOpen: boolean) => void;
}
export interface AccordionItemProps {
  children: ReactNode;
  index?: number;
}
