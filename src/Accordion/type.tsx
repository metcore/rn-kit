import type { ReactNode } from 'react';

export interface AccordionContextType {
  expandedIndex: number | null;
  setExpandedIndex: (index: number | null) => void;
}

export interface AccordionItemProps {
  children: ReactNode;
}
